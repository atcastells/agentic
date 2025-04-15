import { Request, Response } from 'express';
import { Service } from 'typedi';
import { FlowService } from '../../../application/services/FlowService';
import { CreateFlowUseCase } from '../../../application/usecases/flow/CreateFlowUseCase';
import { CreateFlowDto } from '../../../application/dtos/CreateFlowDto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Service()
export class FlowController {
  constructor(
    private flowService: FlowService,
    private createFlowUseCase: CreateFlowUseCase
  ) {}

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
      const createFlowDto = plainToInstance(CreateFlowDto, req.body);

      const errors = await validate(createFlowDto);
      if (errors.length > 0) {
        const errorMessages = errors.map(error => Object.values(error.constraints || {})).flat();
        res.status(400).json({ error: 'Validation failed', details: errorMessages });
        return;
      }

      const userId = req.headers['user-id'] as string;
      if (!userId) {
        res.status(400).json({ error: 'User ID not provided' });
        return;
      }

      const flow = await this.createFlowUseCase.execute(createFlowDto, userId);
      
      res.status(201).json(flow);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          res.status(404).json({ error: error.message });
        } else {
          console.error('Error creating flow:', error);
          res.status(500).json({ error: 'Failed to create flow' });
        }
      } else {
        console.error('Unknown error creating flow:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
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