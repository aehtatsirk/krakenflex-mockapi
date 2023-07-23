import fp from 'fastify-plugin';

/**
 * This plugins manages CORS headers in your Fastify applications
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp(async function (fastify) {
    fastify.register(require('@fastify/cors'), {
      origin: [
        'http://localhost:3000', 
        process.env.BASE_URL || 'https://api.krakenflex.systems/interview-tests-mock-api/v1'
    ],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
    })
  })