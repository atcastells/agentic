import { Router } from 'express';
import { Container } from 'typedi';
import { FlowController } from '../controllers/FlowController';

const router = Router();
const flowController = Container.get(FlowController);

// Route for getting all flows
router.get('/', flowController.getAll);

// Route for getting a flow by ID
router.get('/:id', flowController.getById);

// Route for creating a new flow
router.post('/', flowController.create);

// Route for updating a flow
router.put('/:id', flowController.update);

// Route for deleting a flow
router.delete('/:id', flowController.delete);

// Route for executing a flow
router.post('/:id/execute', flowController.execute);

export default router; 