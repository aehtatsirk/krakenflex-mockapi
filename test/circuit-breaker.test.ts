import { test } from 'tap';
import Fastify, { FastifyInstance } from 'fastify';
import circuitBreaker from '@fastify/circuit-breaker';

test('Should respond with a 503 once the threshold has been reached', async (t) => {
  const fastify: FastifyInstance = Fastify();
  fastify.register(circuitBreaker, {
    threshold: 2, // Set threshold to 2 for testing purposes
    timeout: 1000,
    resetTimeout: 1000
  });

  fastify.register(function (instance, opts, next) {
    instance.route({
      method: 'GET',
      url: '/',
      schema: {
        querystring: {
          error: { type: 'boolean' },
          delay: { type: 'number' }
        }
      },
      preHandler: instance.circuitBreaker(),
      handler: async function (req: any, reply) {
        // Wrap the handler logic in an async function
        try {
          throw new Error('kaboom');
        } catch (error) {
          reply.send(error);
        }
      }
    });
    next();
  });

  // Inject requests to trigger the circuit breaker
  const injectOptions: any = { method: 'GET', url: '/' };

  // The first request should respond with a 500 (Error)
  const response1 = await fastify.inject(injectOptions);
  t.equal(response1.statusCode, 500);

  // The second request should respond with a 503 (Service Unavailable)
  const response2 = await fastify.inject(injectOptions);
  t.equal(response2.statusCode, 503);
  t.match(JSON.parse(response2.payload), { error: 'Service Unavailable', message: 'Circuit open', statusCode: 503 });

  // Wait for the resetTimeout period
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // The circuit breaker should be half-open now, so the next request should be allowed through
  const response3 = await fastify.inject(injectOptions);
  t.equal(response3.statusCode, 500);

  // The circuit breaker should be closed now, so the next request should be allowed through
  const response4 = await fastify.inject(injectOptions);
  t.equal(response4.statusCode, 503);

  // The threshold has been reached again, and the circuit should be open
  const response5 = await fastify.inject(injectOptions);
  t.equal(response5.statusCode, 503);
  t.match(JSON.parse(response5.payload), { error: 'Service Unavailable', message: 'Circuit open', statusCode: 503 });
});
