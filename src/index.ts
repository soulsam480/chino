import type { FastifyRequest } from 'fastify';
import Axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

const ROUTE_METHOD_DELIMITER = '#';
const HTTP_METHODS = [
  'get',
  'delete',
  'head',
  'options',
  'post',
  'put',
  'patch',
];
const ROUTE_DESCRIPTOR_LENGTH = 2;

type OverWrite<T, U> = U & Omit<T, keyof U>;

type NormalizeArgs<T> = {
  [K in keyof T as 'Headers' extends K
    ? never
    : 'Querystring' extends K
    ? 'Query'
    : K]: T[K];
};

type InferParams<H> = H extends (...args: infer A) => Promise<unknown>
  ? A extends Array<unknown>
    ? A[0] extends FastifyRequest<infer R>
      ? {
          [K in keyof NormalizeArgs<R> as Lowercase<
            string & K
          >]: NormalizeArgs<R>[K];
        }
      : Record<string, never>
    : never
  : never;

type InferReturnType<H> = H extends Promise<infer R>
  ? R
  : H extends (...args: any[]) => infer R1
  ? R1
  : never;

interface CreateFetcherOptions extends AxiosRequestConfig {}

/**
 * Registry is an object of routes with their handlers
 *
 * @example
 * ```ts
 *  const Routes = {
 *   'get#user': handler,
 *   'get#user/some/some': handler2,
 *   'post#user': handler3,
 * };
 * ```
 *
 * Note:
 *
 * the route method and path should be separated by # as it's required for type inference
 */
export class ChinoClient<
  Registry extends { [x: string]: (...args: any) => Promise<any> },
> {
  axios: AxiosInstance;
  #options: CreateFetcherOptions | undefined;

  constructor(opts?: CreateFetcherOptions) {
    this.#options = opts;

    this.axios = Axios.create(this.#options);
  }

  #getLogMessage(msg: string) {
    return `[Chino]: ${msg}`;
  }

  #getPathAndMethod(path: string) {
    if (!path.includes(ROUTE_METHOD_DELIMITER))
      throw new Error(
        this.#getLogMessage('route method delimiter # is missing'),
      );

    const pathAndMethod = path.split(ROUTE_METHOD_DELIMITER);

    if (pathAndMethod.length !== ROUTE_DESCRIPTOR_LENGTH)
      throw new Error(
        this.#getLogMessage('route should have both method and path'),
      );

    if (!HTTP_METHODS.includes(pathAndMethod[0].toLowerCase()))
      throw new Error(this.#getLogMessage('invalid route method'));

    return pathAndMethod;
  }

  /**
   *
   * @param route request route
   * @param args route args object - subset of Fastify RouteGenericInterface
   * @param requestConfig per request axios config to extend
   */
  async fetch<
    K extends keyof Registry,
    H extends Registry[K],
    R extends InferReturnType<ReturnType<H>>,
    Args extends InferParams<H>,
  >(
    route: K,
    args: Args,
    requestConfig: AxiosRequestConfig<
      'body' extends keyof Args ? Args['body'] : any
    > = {},
  ) {
    const [method, url] = this.#getPathAndMethod(route as string);

    return await this.axios.request<R>({
      method,
      url: url.startsWith('/') ? url : `/${url}`,
      ...requestConfig,
      ...args,
    });
  }
}
