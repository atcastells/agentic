import 'reflect-metadata';
import { FlowService } from '../FlowService';
import { Flow } from '../../../domain/entities/Flow';

// Mock repository
const mockFlowRepository = {
  findById: jest.fn(),
  findAll: jest.fn(),
  findByUserId: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('FlowService', () => {
  let flowService: FlowService;
  
  beforeEach(() => {
    jest.clearAllMocks();
    flowService = new FlowService(mockFlowRepository as any);
  });
  
  describe('getFlowById', () => {
    it('should return a flow when it exists', async () => {
      const mockFlow: Flow = {
        id: '1',
        name: 'Test Flow',
        version: '1.0.0',
        definition: {
          steps: [],
          inputs: [],
          outputs: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'user1',
        isActive: true,
      };
      
      mockFlowRepository.findById.mockResolvedValue(mockFlow);
      
      const result = await flowService.getFlowById('1');
      
      expect(result).toEqual(mockFlow);
      expect(mockFlowRepository.findById).toHaveBeenCalledWith('1');
    });
    
    it('should return null when flow does not exist', async () => {
      mockFlowRepository.findById.mockResolvedValue(null);
      
      const result = await flowService.getFlowById('nonexistent');
      
      expect(result).toBeNull();
      expect(mockFlowRepository.findById).toHaveBeenCalledWith('nonexistent');
    });
  });
  
  describe('executeFlow', () => {
    it('should throw error when flow does not exist', async () => {
      mockFlowRepository.findById.mockResolvedValue(null);
      
      await expect(flowService.executeFlow('nonexistent', {}))
        .rejects
        .toThrow('Flow with id nonexistent not found');
    });
    
    it('should execute flow and return result', async () => {
      const mockFlow: Flow = {
        id: '1',
        name: 'Test Flow',
        version: '1.0.0',
        definition: {
          steps: [],
          inputs: [],
          outputs: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'user1',
        isActive: true,
      };
      
      mockFlowRepository.findById.mockResolvedValue(mockFlow);
      
      const inputs = { key: 'value' };
      const result = await flowService.executeFlow('1', inputs);
      
      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('flowId', '1');
      expect(result).toHaveProperty('executionId');
      expect(result).toHaveProperty('outputs.result');
    });
  });
}); 