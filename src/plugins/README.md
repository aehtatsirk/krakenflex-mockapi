# Plugins Folder

Plugins define behavior that is common to all the routes in your
application. Authentication, caching, templates, and all the other cross
cutting concerns should be handled by plugins placed in this folder.

Files in this folder are typically defined through the
[`fastify-plugin`](https://github.com/fastify/fastify-plugin) module,
making them non-encapsulated. They can define decorators and set hooks
that will then be used in the rest of your application.

Check out:

- [The hitchhiker's guide to plugins](https://www.fastify.io/docs/latest/Guides/Plugins-Guide/)
- [Fastify decorators](https://www.fastify.io/docs/latest/Reference/Decorators/).
- [Fastify lifecycle](https://www.fastify.io/docs/latest/Reference/Lifecycle/).

# Customized Plugins

- [Axios](https://github.com/axios/axios) - A plugin for Fastify that adds support for sending requests via axios.
- [Circuit Breaker](https://github.com/fastify/fastify-circuit-breaker) - A plugin for the Fastify web framework that provides circuit breaker functionality. A circuit breaker is a design pattern used to improve the resilience and fault-tolerance of a system by preventing cascading failures in distributed systems.
- [Cors](https://github.com/fastify/fastify-cors) - This plugins manages CORS headers in your Fastify applications
- [Swagger](https://github.com/fastify/fastify-swagger) - A Fastify plugin for serving Swagger (OpenAPI v2) or OpenAPI v3 schemas
