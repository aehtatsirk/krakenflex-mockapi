import { type FastifyInstance } from 'fastify';
import { getOutagesSchema, Reply } from './schema';

export default async (fastify: FastifyInstance) => {
    fastify.get<{Reply: Reply}>('/', { schema: getOutagesSchema }, async(req, reply) => {
        try {
            const response = await fastify.axios.get("/outages");
            reply.send(response.data);
        } catch(error: any) {
            const {status, data} = error.response;
            reply.code(status).send({message: data.message});
        }
    });

}