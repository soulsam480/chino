import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { setTimeout } from 'node:timers/promises';

interface IUserId {
  id: number;
}

export async function getUser(req: FastifyRequest<{ Params: IUserId }>) {
  await setTimeout(3000);

  return {
    user: {
      name: 'John Doe',
      id: req.params.id,
    },
  };
}

export async function getAllusers() {
  await setTimeout(3000);

  return {
    users: [
      {
        name: 'John',
        id: 1,
      },
      {
        name: 'Doe',
        id: 2,
      },
    ],
  };
}

export const usersRouter: FastifyPluginCallback = async (fastify, _opts) => {
  fastify.get('/', getAllusers);
  fastify.get('/:id', getUser);
};
