import { ChinoClient } from '../../src';
import { RoutesRegistry } from '../fastify-server/src/app';

const chinoClient = new ChinoClient<typeof RoutesRegistry>({
  baseURL: 'http://localhost:4000',
});

async function makeAPiCalls() {
  const allUsers = await chinoClient.fetch('get#/users', {});

  const userData = await chinoClient.fetch('get#/users/:id', {
    params: { id: 1 },
  });

  console.log(allUsers);
  console.log(userData);
}
