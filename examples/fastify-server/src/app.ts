import fastify from 'fastify';
import { PostRouteRegistry, postsRuter } from './routes/posts';
import { getAllusers, getUser, usersRouter } from './routes/user';

async function start() {
  const server = fastify({
    logger: true,
  });

  server.get('/', () => {
    return {
      root: true,
    };
  });

  await server.register(usersRouter, { prefix: '/users' });
  await server.register(postsRuter, { prefix: '/posts' });

  await server.ready();

  try {
    await server.listen({
      port: 4000,
    });
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
}

export const RoutesRegistry = {
  'get#/users/:id': getUser,
  'get#/users': getAllusers,
  ...PostRouteRegistry,
};

start();
