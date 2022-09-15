import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { setTimeout } from 'node:timers/promises';

interface IPostId {
  id: string;
}

export async function getPost(req: FastifyRequest<{ Params: IPostId }>) {
  await setTimeout(3000);

  return {
    user: {
      name: `Post ${req.params.id}`,
      id: req.params.id,
    },
  };
}

export async function getAllPosts() {
  await setTimeout(3000);

  return {
    users: [
      {
        name: 'Post 1',
        id: 1,
      },
      {
        name: 'Post 2',
        id: 2,
      },
    ],
  };
}

export const postsRuter: FastifyPluginCallback = async (fastify, _opts) => {
  fastify.get('/', getAllPosts);
  fastify.get('/:id', getPost);
};

export const PostRouteRegistry = {
  'get#/posts': getAllPosts,
  'get#/posts/:id': getPost,
};
