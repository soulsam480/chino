## Chino
> intelligence in japaneese

End-to-End type safety for REST APIs written in Fastify. Only problem is you have to explicity export and register route handlers. LOL

### Why ?
I love tRPC, like really. But even If I migrated Mirai's codebase to v10, the type inference speed didn't improve that much. I know that the maintainers are working really hard, still out of my frustration, I tried to write something which can make REST APIs end to end type-safe. Definitely there are trade-offs. I borrowed the idea of centralized route registration convention from ruby on rails. I really like the idea of explicitly registering routes. So yes, this thing works. I was able to make it work with Fastify's types for now. Will add some tests and release it later this week. If everything goes well, Mirai will be moving to full REST APIs.


### Convention
- When registering routes to the registry, the route path and method should be separated by '#'
```ts
const Routes = {
  // the route path is prefixed by #
  // this is needed for proper request execution
  // this is a convention we expect to follow
  'get#/users': handler,
  'get#/users/user2': handler2,
};
```

### API
Chino has a super small API surface.

#### ChinoClient
creates the chino client instance, uses Axios under the hood. Just create a new class by passing your registry type as a generic.
```ts
// --- Server code (FAstify server only)

import { FastifyRequest } from 'fastify';
import { ChinoClient } from '../src';

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
};


// --- client code (Frontend app i guess) 

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
}
```

#### Tradeoffs
- Developer burden of explicitly exporting and registering route handlers
- Again the above point as js BE developers are used to writing inlined arrow functions for route handlers

#### Credits
- [tRPC](https://trpc.io)
- [Ruby on rails](https://rubyonrails.org/)
- [AdonisJS](https://adonisjs.com/)