const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FCA Refugee Support Program API',
      version: '1.0.0',
      description:
        'REST API for registering and managing beneficiaries of the FCA Refugee Support Program.',
      contact: {
        name: 'FCA Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local Development Server',
      },
    ],
    components: {
      schemas: {
        Beneficiary: {
          type: 'object',
          required: [
            'firstName',
            'lastName',
            'dateOfBirth',
            'placeOfBirth',
            'nationality',
            'maritalStatus',
            'settlementCamp',
            'dateOfJoiningSettlementCamp',
          ],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated MongoDB ObjectId',
              example: '64abc123def456789012abcd',
            },
            firstName: {
              type: 'string',
              minLength: 2,
              description: 'First name of the beneficiary',
              example: 'John',
            },
            lastName: {
              type: 'string',
              minLength: 2,
              description: 'Last name of the beneficiary',
              example: 'Doe',
            },
            dateOfBirth: {
              type: 'string',
              format: 'date',
              description: 'Date of birth — must be before today',
              example: '1990-12-25',
            },
            placeOfBirth: {
              type: 'string',
              minLength: 2,
              description: 'Place of birth or residence',
              example: 'Gulu, Northern Uganda',
            },
            gender: {
              type: 'string',
              enum: ['Male', 'Female'],
              default: 'Female',
              description: 'Gender of the beneficiary',
              example: 'Male',
            },
            nationality: {
              type: 'string',
              enum: [
                'Ugandan',
                'Kenyan',
                'Tanzanian',
                'Burundian',
                'Rwandese',
                'Somali',
                'South Sudanese',
              ],
              example: 'Ugandan',
            },
            maritalStatus: {
              type: 'string',
              enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'],
              example: 'Married',
            },
            settlementCamp: {
              type: 'string',
              enum: [
                'Gulu settlement camp',
                'Arua settlement camp',
                'Mbarara settlement camp',
                'Kasese settlement camp',
                'Busia settlement camp',
                'Mbale settlement camp',
                'Kigezi settlement camp',
              ],
              example: 'Arua settlement camp',
            },
            dateOfJoiningSettlementCamp: {
              type: 'string',
              format: 'date',
              description: 'Date of joining the settlement camp — must be after today',
              example: '2026-04-01',
            },
            registrationDate: {
              type: 'string',
              format: 'date-time',
              description: 'Auto-set to the date/time of registration',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },

        BeneficiaryInput: {
          type: 'object',
          required: [
            'firstName',
            'lastName',
            'dateOfBirth',
            'placeOfBirth',
            'nationality',
            'maritalStatus',
            'settlementCamp',
            'dateOfJoiningSettlementCamp',
          ],
          properties: {
            firstName: { type: 'string', minLength: 2, example: 'John' },
            lastName: { type: 'string', minLength: 2, example: 'Doe' },
            dateOfBirth: { type: 'string', format: 'date', example: '1990-12-25' },
            placeOfBirth: { type: 'string', minLength: 2, example: 'Gulu, Northern Uganda' },
            gender: { type: 'string', enum: ['Male', 'Female'], default: 'Female', example: 'Male' },
            nationality: {
              type: 'string',
              enum: ['Ugandan', 'Kenyan', 'Tanzanian', 'Burundian', 'Rwandese', 'Somali', 'South Sudanese'],
              example: 'Ugandan',
            },
            maritalStatus: {
              type: 'string',
              enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'],
              example: 'Married',
            },
            settlementCamp: {
              type: 'string',
              enum: [
                'Gulu settlement camp', 'Arua settlement camp', 'Mbarara settlement camp',
                'Kasese settlement camp', 'Busia settlement camp', 'Mbale settlement camp',
                'Kigezi settlement camp',
              ],
              example: 'Arua settlement camp',
            },
            dateOfJoiningSettlementCamp: {
              type: 'string',
              format: 'date',
              example: '2026-04-01',
            },
          },
        },

        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Beneficiary registered successfully' },
            data: { $ref: '#/components/schemas/Beneficiary' },
          },
        },

        ListResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            count: { type: 'integer', example: 10 },
            data: {
              type: 'array',
              items: { $ref: '#/components/schemas/Beneficiary' },
            },
          },
        },

        ValidationErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            errors: {
              type: 'object',
              additionalProperties: { type: 'string' },
              example: {
                firstName: 'First name is required and must be at least 2 characters',
                dateOfBirth: 'Date of birth must be before the date of registration',
              },
            },
          },
        },

        NotFoundResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Beneficiary not found' },
          },
        },

        ServerErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Internal server error' },
            error: { type: 'string', example: 'Detailed error message' },
          },
        },
      },
    },
  },
  // Tell swagger-jsdoc where to scan for JSDoc comments
  apis: ['./routes/*.js', './server.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;