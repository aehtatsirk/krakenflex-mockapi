import { FromSchema } from "json-schema-to-ts";
import { errorResponseSchema } from '../error';

const paramsSchema = {
    type: 'object',
    description: "Identifier for a site",
    properties: {
        siteId: { type: 'string' }
    },
    additionalProperties: false
  } as const
  
export type Params = FromSchema<typeof paramsSchema>;

export const replySchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "The ID of the site",
      example: "pear-tree",
    },
    name: {
      type: "string",
      description: "The display name of the site",
      example: "Pear Tree",
    },
    devices: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "The device ID",
            example: "44c02564-a229-4f51-8ded-cc7bcb202566",
          },
          name: {
            type: "string",
            description: "The display name of the device",
            example: "Partridge",
          },
        },
      },
      required: ["id", "name"],
    },
  },
  required: ["id", "name", "devices"],
} as const;

export type Reply = FromSchema<typeof replySchema>;

export const getSiteInfoSchema = {
    tags: ['SiteInfo'],
    params: paramsSchema,
    summary: 'Returns information about a specific site.',
    description: 'The site information contains the ID and name of the site. It also contains a list of devices that make up the site.',
    response: {
        200: {
            ...replySchema
        },
        ...errorResponseSchema
    },
    security: [
        {
          "apiKey": []
        }
    ]
}

