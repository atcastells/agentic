import { Request, Response } from 'express';
import { Service } from 'typedi';
import { FlowService } from '../../../application/services/FlowService';

@Service()
export class FlowController {
  constructor(private flowService: FlowService) {}

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const flows = await this.flowService.getAllFlows();
      res.status(200).json(flows);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to retrieve flows' });
      }
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const flow = await this.flowService.getFlowById(id);
      
      if (!flow) {
        res.status(404).json({ error: 'Flow not found' });
        return;
      }
      
      res.status(200).json(flow);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to retrieve flow' });
      }
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const flowData = req.body;
      // Assuming we have a user ID from authentication middleware
      const userId = req.headers['user-id'] as string;
      
      const flow = await this.flowService.createFlow({
        ...flowData,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      res.status(201).json(flow);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to create flow' });
      }
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const flowData = req.body;
      
      const updatedFlow = await this.flowService.updateFlow(id, {
        ...flowData,
        updatedAt: new Date(),
      });
      
      if (!updatedFlow) {
        res.status(404).json({ error: 'Flow not found' });
        return;
      }
      
      res.status(200).json(updatedFlow);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to update flow' });
      }
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.flowService.deleteFlow(id);
      
      if (!result) {
        res.status(404).json({ error: 'Flow not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to delete flow' });
      }
    }
  };

  execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const inputs = req.body;
      
      const result = await this.flowService.executeFlow(id, inputs);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to execute flow' });
      }
    }
  };
}