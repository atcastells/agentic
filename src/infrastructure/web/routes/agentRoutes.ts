import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';
import { CreateAgentDto } from '../../../application/dtos/CreateAgentDto';
import { ExecuteAgentDto } from '../../../application/dtos/ExecuteAgentDto';
import { UpdateAgentDto } from '../../../application/dtos/UpdateAgentDto';
import { AGENT_CONTROLLER } from '../../../constants';
import { AgentController } from '../controllers/AgentController';

const router = Router();
// Controller instance will be retrieved inside each handler

// Helper for cleaner async route handling
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

/**
 * @swagger
 * /agents:
 *   get:
 *     summary: Get all agents
 *     description: Retrieve a list of all agents
 *     tags: [Agents]
 *     responses:
 *       200:
 *         description: A list of agents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agent'
 */
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const agentController = Container.get<AgentController>(AGENT_CONTROLLER);
  const agents = await agentController.getAll();
  res.json(agents);
}));

/**
 * @swagger
 * /agents/{id}:
 *   get:
 *     summary: Get a agent by ID
 *     description: Retrieve a agent by its ID
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Agent ID
 *     responses:
 *       200:
 *         description: A agent object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agent'
 *       404:
 *         description: Agent not found
 */
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const agentController = Container.get<AgentController>(AGENT_CONTROLLER);
  const agent = await agentController.getById(req.params.id);
  res.json(agent);
}));

/**
 * @swagger
 * /agents:
 *   post:
 *     summary: Create a new agent
 *     description: Create a new agent with the provided data
 *     tags: [Agents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAgentDto'
 *     parameters:
 *       - in: header
 *         name: user-id
 *         schema:
 *           type: string
 *         description: ID of the user creating the agent
 *     responses:
 *       201:
 *         description: The created agent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agent'
 *       400:
 *         description: Invalid input data
 */
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const agentController = Container.get<AgentController>(AGENT_CONTROLLER);
  const createAgentDto: CreateAgentDto = req.body;
  const userId = req.headers['user-id'] as string | undefined;
  const newAgent = await agentController.create(createAgentDto, userId);
  res.status(201).json(newAgent);
}));

/**
 * @swagger
 * /agents/{id}:
 *   put:
 *     summary: Update a agent
 *     description: Update a agent with the provided data
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Agent ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAgentDto'
 *     responses:
 *       200:
 *         description: The updated agent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agent'
 *       404:
 *         description: Agent not found
 *       400:
 *         description: Invalid input data
 */
router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
  const agentController = Container.get<AgentController>(AGENT_CONTROLLER);
  const updateAgentDto: UpdateAgentDto = req.body;
  const updatedAgent = await agentController.update(req.params.id, updateAgentDto);
  res.json(updatedAgent);
}));

/**
 * @swagger
 * /agents/{id}:
 *   delete:
 *     summary: Delete a agent
 *     description: Delete a agent by its ID
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Agent ID
 *     responses:
 *       204:
 *         description: Agent successfully deleted
 *       404:
 *         description: Agent not found
 */
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const agentController = Container.get<AgentController>(AGENT_CONTROLLER);
  await agentController.delete(req.params.id);
  res.status(204).send();
}));

/**
 * @swagger
 * /agents/{id}/execute:
 *   post:
 *     summary: Execute a agent
 *     description: Execute a agent with the provided input data
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Agent ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExecuteAgentDto'
 *     responses:
 *       200:
 *         description: The execution result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Agent not found
 *       400:
 *         description: Invalid input data
 */
router.post('/:id/execute', asyncHandler(async (req: Request, res: Response) => {
  const agentController = Container.get<AgentController>(AGENT_CONTROLLER);
  const executeAgentDto: ExecuteAgentDto = req.body;
  const result = await agentController.execute(req.params.id, executeAgentDto);
  res.json(result);
}));

export default router; 