/**
 * @swagger
 * components:
 *   schemas:
 *     Flow:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the flow
 *         name:
 *           type: string
 *           description: Name of the flow
 *         description:
 *           type: string
 *           description: Optional description of the flow
 *         version:
 *           type: string
 *           description: Version of the flow
 *         definition:
 *           $ref: '#/components/schemas/FlowDefinition'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the flow was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the flow was last updated
 *         userId:
 *           type: string
 *           description: ID of the user who owns the flow
 *         isActive:
 *           type: boolean
 *           description: Whether the flow is active
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
 *     CreateFlowDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the flow
 *         description:
 *           type: string
 *           description: Optional description of the flow
 *         definition:
 *           $ref: '#/components/schemas/FlowDefinition'
 *       required:
 *         - name
 *         - definition
 *
 *     UpdateFlowDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the flow
 *         description:
 *           type: string
 *           description: Description of the flow
 *         definition:
 *           $ref: '#/components/schemas/FlowDefinition'
 *
 *     ExecuteFlowDto:
 *       type: object
 *       properties:
 *         inputs:
 *           type: object
 *           description: Input data for the flow execution
 *
 *     FlowDefinition:
 *       type: object
 *       properties:
 *         steps:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FlowStep'
 *         inputs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FlowInput'
 *         outputs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FlowOutput'
 *       required:
 *         - steps
 *
 *     FlowStep:
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
 *     FlowInput:
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
 *     FlowOutput:
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
 */ 