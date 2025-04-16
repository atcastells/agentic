/**
 * @swagger
 * components:
 *   schemas:
 *     Agent:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the agent
 *         name:
 *           type: string
 *           description: Name of the agent
 *         description:
 *           type: string
 *           description: Optional description of the agent
 *         version:
 *           type: string
 *           description: Version of the agent
 *         definition:
 *           $ref: '#/components/schemas/AgentDefinition'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the agent was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the agent was last updated
 *         userId:
 *           type: string
 *           description: ID of the user who owns the agent
 *         isActive:
 *           type: boolean
 *           description: Whether the agent is active
 *       required:
 *         - id
 *         - name
 *         - version
 *         - definition
 *         - createdAt
 *         - updatedAt
 *         - userId
 *         - isActive
 *
 *     CreateAgentDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the agent
 *         description:
 *           type: string
 *           description: Optional description of the agent
 *         definition:
 *           $ref: '#/components/schemas/AgentDefinition'
 *       required:
 *         - name
 *         - definition
 *
 *     UpdateAgentDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the agent
 *         description:
 *           type: string
 *           description: Description of the agent
 *         definition:
 *           $ref: '#/components/schemas/AgentDefinition'
 *
 *     ExecuteAgentDto:
 *       type: object
 *       properties:
 *         inputs:
 *           type: object
 *           description: Input data for the agent execution
 *
 *     AgentDefinition:
 *       type: object
 *       properties:
 *         steps:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AgentStep'
 *         inputs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AgentInput'
 *         outputs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AgentOutput'
 *       required:
 *         - steps
 *
 *     AgentStep:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the step
 *         type:
 *           type: string
 *           description: Type of the step
 *         name:
 *           type: string
 *           description: Name of the step
 *         config:
 *           type: object
 *           description: Configuration for the step
 *         next:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs of the next steps
 *       required:
 *         - id
 *         - type
 *         - name
 *
 *     AgentInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the input
 *         type:
 *           type: string
 *           description: Type of the input
 *         required:
 *           type: boolean
 *           description: Whether the input is required
 *         default:
 *           type: object
 *           description: Default value for the input
 *       required:
 *         - name
 *         - type
 *
 *     AgentOutput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the output
 *         type:
 *           type: string
 *           description: Type of the output
 *       required:
 *         - name
 *         - type
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the user
 *           example: "user_12345"
 *         name:
 *           type: string
 *           description: Name of the user
 *           example: "Jane Doe"
 *         email:
 *           type: string
 *           ormat: email
 *           description: Email address of the user
 *           example: "jane.doe@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the user was last updated
 *       required:
 *         - id
 *         - name
 *         - email
 *         - createdAt
 *         - updatedAt
 */ 