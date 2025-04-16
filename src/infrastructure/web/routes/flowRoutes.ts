import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { FlowController } from '../controllers/FlowController';
import { CreateFlowDto } from '../../../application/dtos/CreateFlowDto';
import { UpdateFlowDto } from '../../../application/dtos/UpdateFlowDto';
import { ExecuteFlowDto } from '../../../application/dtos/ExecuteFlowDto';
import { FLOW_CONTROLLER } from '../../../constants';

const router = Router();
// Controller instance will be retrieved inside each handler

// Helper for cleaner async route handling
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

/**
 * @swagger
 * /flows:
 *   get:
 *     summary: Get all flows
 *     description: Retrieve a list of all flows
 *     tags: [Flows]
 *     responses:
 *       200:
 *         description: A list of flows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flow'
 */
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const flowController = Container.get<FlowController>(FLOW_CONTROLLER);
  const flows = await flowController.getAll();
  res.json(flows);
}));

/**
 * @swagger
 * /flows/{id}:
 *   get:
 *     summary: Get a flow by ID
 *     description: Retrieve a flow by its ID
 *     tags: [Flows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flow ID
 *     responses:
 *       200:
 *         description: A flow object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flow'
 *       404:
 *         description: Flow not found
 */
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const flowController = Container.get<FlowController>(FLOW_CONTROLLER);
  const flow = await flowController.getById(req.params.id);
  res.json(flow);
}));

/**
 * @swagger
 * /flows:
 *   post:
 *     summary: Create a new flow
 *     description: Create a new flow with the provided data
 *     tags: [Flows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFlowDto'
 *     parameters:
 *       - in: header
 *         name: user-id
 *         schema:
 *           type: string
 *         description: ID of the user creating the flow
 *     responses:
 *       201:
 *         description: The created flow
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flow'
 *       400:
 *         description: Invalid input data
 */
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const flowController = Container.get<FlowController>(FLOW_CONTROLLER);
  const createFlowDto: CreateFlowDto = req.body;
  const userId = req.headers['user-id'] as string | undefined;
  const newFlow = await flowController.create(createFlowDto, userId);
  res.status(201).json(newFlow);
}));

/**
 * @swagger
 * /flows/{id}:
 *   put:
 *     summary: Update a flow
 *     description: Update a flow with the provided data
 *     tags: [Flows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flow ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateFlowDto'
 *     responses:
 *       200:
 *         description: The updated flow
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flow'
 *       404:
 *         description: Flow not found
 *       400:
 *         description: Invalid input data
 */
router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
  const flowController = Container.get<FlowController>(FLOW_CONTROLLER);
  const updateFlowDto: UpdateFlowDto = req.body;
  const updatedFlow = await flowController.update(req.params.id, updateFlowDto);
  res.json(updatedFlow);
}));

/**
 * @swagger
 * /flows/{id}:
 *   delete:
 *     summary: Delete a flow
 *     description: Delete a flow by its ID
 *     tags: [Flows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flow ID
 *     responses:
 *       204:
 *         description: Flow successfully deleted
 *       404:
 *         description: Flow not found
 */
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const flowController = Container.get<FlowController>(FLOW_CONTROLLER);
  await flowController.delete(req.params.id);
  res.status(204).send();
}));

/**
 * @swagger
 * /flows/{id}/execute:
 *   post:
 *     summary: Execute a flow
 *     description: Execute a flow with the provided input data
 *     tags: [Flows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flow ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExecuteFlowDto'
 *     responses:
 *       200:
 *         description: The execution result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Flow not found
 *       400:
 *         description: Invalid input data
 */
router.post('/:id/execute', asyncHandler(async (req: Request, res: Response) => {
  const flowController = Container.get<FlowController>(FLOW_CONTROLLER);
  const executeFlowDto: ExecuteFlowDto = req.body;
  const result = await flowController.execute(req.params.id, executeFlowDto);
  res.json(result);
}));

export default router; 