import { FastifyRequest } from 'fastify';
import { ChinoClient } from '../../src';

interface Params1 {
  id: string;
}

interface Query1 {
  name: string;
}

async function handler(req: FastifyRequest<{ Params: Params1 }>) {
  return req.params;
}

async function handler2(req: FastifyRequest<{ Querystring: Query1 }>) {
  return req.query;
}

async function handler3(
  req: FastifyRequest<{ Body: { user: { name: string } } }>,
) {
  return req.body;
}

// start by creating a route registry

const Routes = {
  // the route path is prefixed by #
  // this is needed for proper request execution
  // this is a convention we expect to follow
  'get#/users': handler,
  'get#/users/user2': handler2,
  'post#/users': handler3,
};

// create chino client
const chino = new ChinoClient<typeof Routes>();
// here you can pass axios instance config

async function getData() {
  const data = await chino.fetch('get#/users', {
    // these are params
    // same happens for query and body
    params: {
      id: '10',
    },
  });

  // full type safety
  data.data.id;

  const data2 = await chino.fetch('get#/users/user2', {
    query: {
      name: 'sambit',
    },
  });

  const data3 = await chino.fetch('post#/users', {
    body: {
      user: {
        name: 'sambit',
      },
    },
  });
}
