import { FromSchema } from "json-schema-to-ts";
import { errorResponseSchema } from "../error";

const paramsSchema = {
  type: "object",
  description: "Identifier for a site",
  properties: {
    siteId: { type: "string" },
  },
  additionalProperties: false,
} as const;

export type Params = FromSchema<typeof paramsSchema>;


const replySchema = {
  type: "array",
  description: "An array of outages enhanced with extra information",
  items: { 
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The device ID the outage pertains to",
      },
      begin: {
        type: "string",
        format: "date-time",
        description: "Outage begin date time",
      },
      end: {
        type: "string",
        format: "date-time",
        description: "Outage end date time",
      },
      name: {
        type: "string",
        description: "The display name of the device the outage pertains to",
      },
    }
   }
} as const;

export type Reply = FromSchema<typeof replySchema>;

export const postSiteOutagesSchema = {
  tags: ["SiteOutages"],
  summary: "Posts outages for a specific site with enhanced information",
  description:
    "The outages posted should contain a device ID, device name, begin time, and end time.",
  params: paramsSchema,
  response: {
    201: {
        type: 'object',
        required: ['message'],
        properties: {
            message: { type: 'string' }
        },
        additionalProperties: false,
        description: 'Outages successfully posted.'
    },
    ...errorResponseSchema,
  },
  security: [
    {
      apiKey: [],
    },
  ],
};
