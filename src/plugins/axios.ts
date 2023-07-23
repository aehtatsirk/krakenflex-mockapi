import fp from 'fastify-plugin';
import axios from 'axios';

/**
 * A plugin for Fastify that adds support for sending requests via axios.
 *
 * @see https://github.com/axios/axios
 */
export default fp(async function (fastify) {
  const instance = axios.create({
    baseURL: process.env.BASE_URL || 'https://api.krakenflex.systems/interview-tests-mock-api/v1', 
    timeout: 5000
  });

  fastify.addHook('preHandler', (request, reply, done) => {
    const commonHeaders = {
      'x-api-key': request.headers['x-api-key']
    };
    Object.assign(instance.defaults.headers, commonHeaders);
    done();
  });

    fastify.decorate('axios', instance);
});