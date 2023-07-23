import { FromSchema } from "json-schema-to-ts";
import { errorResponseSchema } from "../error";

const replySchema = {
  type: "array",
  description: "An array outages",
  items: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The device ID the outage pertains to",
        example: "44c02564-a229-4f51-8ded-cc7bcb202566",
      },
      begin: {
        type: "string",
        format: "date-time",
        description: "Outage begin date time",
        example: "2022-01-01T00:00:00.000Z",
      },
      end: {
        type: "string",
        format: "date-time",
        description: "Outage end date time",
        example: "2022-01-02T12:01:59.123Z",
      },
    },
    required: ["id", "begin", "end"],
  },
} as const;

export type Reply = FromSchema<typeof replySchema>;

export const getOutagesSchema = {
  tags: ["Outages"],
  summary: "Returns all outages in our system",
  description:
    "An outage is when a device can no longer provide service and is declared as offline. Each outage consists of a device ID, begin time, and end time.",
  response: {
    200: {
      ...replySchema,
    },
    ...errorResponseSchema,
  },
  security: [
    {
      apiKey: [],
    },
  ],
};
