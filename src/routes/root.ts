import { FastifyPluginAsync } from 'fastify'
// import { forbiddenSchema, tooManyRequestsSchema, notFoundSchema, internalServerErrorSchema } from './error';

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })
}

export default root;
