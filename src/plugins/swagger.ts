import fp from "fastify-plugin";
import swagger, { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import { FastifyRequest, FastifyReply } from "fastify";

/**
 * A Fastify plugin for serving Swagger (OpenAPI v2) or OpenAPI v3 schemas
 *
 * @see https://github.com/fastify/fastify-swagger
 */
export default fp<FastifyDynamicSwaggerOptions>(async (fastify) => {
  fastify.register(swagger, {
    swagger: {
      info: {
        title: "KrakenFlex Interview Tests Mock API",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://github.com/aehtatsirk/krakenflex-mockapi/blob/main/README.md",
        description: "Find more info here",
      },
      host: "127.0.0.1:3000",
      basePath: "",
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        {
          name: "Outages",
        },
        {
          name: "SiteInfo",
        },
        {
          name: "SiteOutages",
        },
      ],
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          description: "Insert here your API Key",
          name: "x-api-key",
          in: "header",
        },
      },
    },
  });
  fastify.register(require("@fastify/swagger-ui"), {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "none", // expand/not all the documentations none|list|full
      deepLinking: true,
    },
    uiHooks: {
      onRequest: function (
        request: FastifyRequest,
        reply: FastifyReply,
        next: any
      ) {
        next();
      },
      preHandler: function (
        request: FastifyRequest,
        reply: FastifyReply,
        next: any
      ) {
        next();
      },
    },
    staticCSP: false,
    transformStaticCSP: (header: any) => header,
    exposeRoute: true,
  });
});
