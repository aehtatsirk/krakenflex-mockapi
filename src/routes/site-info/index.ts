import { type FastifyInstance } from 'fastify';
import { getSiteInfoSchema, Reply, Params } from './schema';

export default async (fastify: FastifyInstance) => {
    fastify.get<{Params: Params, Reply: Reply}>('/:siteId', { schema: getSiteInfoSchema }, async(req, reply) => {
        try {
            const { siteId } = req.params
           const response = await fastify.axios.get(`/site-info/${siteId}`);
            reply.send(response.data);
        } catch(error: any) {
            const {status, data} = error.response;
            reply.code(status).send({message: data.message});
        }
    });
}