import { Service, Inject } from 'typedi';
import { Flow } from '../../domain/entities/Flow';
import { IFlowRepository } from '../../domain/repositories/FlowRepository';
import { FLOW_REPOSITORY, FLOW_SERVICE } from '../../constants';

@Service(FLOW_SERVICE)
export class FlowService {
  constructor(@Inject(FLOW_REPOSITORY) private flowRepository: IFlowRepository) {}

  async getFlowById(id: string): Promise<Flow | null> {
    return this.flowRepository.findById(id);
  }

  async getAllFlows(): Promise<Flow[]> {
    return this.flowRepository.findAll();
  }

  async getUserFlows(userId: string): Promise<Flow[]> {
    return this.flowRepository.findByUserId(userId);
  }

  async createFlow(flowData: Omit<Flow, 'id'>): Promise<Flow> {
    return this.flowRepository.create(flowData);
  }

  async updateFlow(id: string, flowData: Partial<Flow>): Promise<Flow | null> {
    return this.flowRepository.update(id, flowData);
  }

  async deleteFlow(id: string): Promise<boolean> {
    return this.flowRepository.delete(id);
  }

  async executeFlow(id: string, inputs: Record<string, unknown>): Promise<Record<string, unknown>> {
    // Get the flow
    const flow = await this.flowRepository.findById(id);
    if (!flow) {
      throw new Error(`Flow with id ${id} not found`);
    }

    // Here we would implement the flow execution logic
    // This is just a placeholder for now
    return {
      success: true,
      flowId: id,
      executionId: `exec-${Date.now()}`,
      outputs: {
        result: `Executed flow: ${flow.name} with inputs: ${JSON.stringify(inputs)}`,
      },
    };
  }
} 