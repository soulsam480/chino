import type { FastifyRequest } from 'fastify';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
declare type NormalizeArgs<T> = {
    [K in keyof T as 'Headers' extends K ? never : 'Querystring' extends K ? 'Query' : K]: T[K];
};
declare type InferParams<H> = H extends (...args: infer A) => Promise<unknown> ? A extends Array<unknown> ? A[0] extends FastifyRequest<infer R> ? {
    [K in keyof NormalizeArgs<R> as Lowercase<string & K>]: NormalizeArgs<R>[K];
} : Record<string, never> : never : never;
declare type InferReturnType<H> = H extends Promise<infer R> ? R : H extends (...args: any[]) => infer R1 ? R1 : never;
interface CreateFetcherOptions extends AxiosRequestConfig {
}
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
export declare class ChinoClient<Registry extends {
    [x: string]: (...args: any) => Promise<any>;
}> {
    #private;
    axios: AxiosInstance;
    constructor(opts?: CreateFetcherOptions);
    /**
     *
     * @param route request route
     * @param args route args object - subset of Fastify RouteGenericInterface
     * @param requestConfig per request axios config to extend
     */
    fetch<K extends keyof Registry, H extends Registry[K], R extends InferReturnType<ReturnType<H>>, Args extends InferParams<H>>(route: K, args: Args, requestConfig?: AxiosRequestConfig<'body' extends keyof Args ? Args['body'] : any>): Promise<import("axios").AxiosResponse<R, any>>;
}
export {};
