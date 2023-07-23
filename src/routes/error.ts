export const errorResponseSchema = {
    404: {
        type: 'object',
        description: 'You have requested a resource that does not exist.',
        required: ['message'],
        properties: {
            message: { type: 'string' }
        },
        additionalProperties: false
    },
    403: {
        type: 'object',
        description: 'You do not have the required permissions to make this request.',
        required: ['message'],
        properties: {
            message: { type: 'string' }
        },
        additionalProperties: false
    },
    429: {
        type: 'object',
        required: ['message'],
        description: 'You have exceeded your limit for your API key.',
        properties: {
            message: { type: 'string' }
        },
        additionalProperties: false,
    },
    500: {
        type: 'object',
        required: ['message'],
        properties: {
            message: { type: 'string' }
        },
        additionalProperties: false,
        description: 'Problem connecting with Third party API'
    },
};
