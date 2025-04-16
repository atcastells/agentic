import 'reflect-metadata';
import { Agent } from '../../../domain/entities/Agent';
import { AgentService } from '../AgentService';

// Mock repository
const mockAgentRepository = {
  findById: jest.fn(),
  findAll: jest.fn(),
  findByUserId: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('AgentService', () => {
  let agentService: AgentService;
  
  beforeEach(() => {
    jest.clearAllMocks();
    agentService = new AgentService(mockAgentRepository as any);
  });
  
  describe('getAgentById', () => {
    it('should return a agent when it exists', async () => {
      const mockAgent: Agent = {
        id: '1',
        name: 'Test Agent',
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
      
      mockAgentRepository.findById.mockResolvedValue(mockAgent);
      
      const result = await agentService.getAgentById('1');
      
      expect(result).toEqual(mockAgent);
      expect(mockAgentRepository.findById).toHaveBeenCalledWith('1');
    });
    
    it('should return null when agent does not exist', async () => {
      mockAgentRepository.findById.mockResolvedValue(null);
      
      const result = await agentService.getAgentById('nonexistent');
      
      expect(result).toBeNull();
      expect(mockAgentRepository.findById).toHaveBeenCalledWith('nonexistent');
    });
  });
  
  describe('executeAgent', () => {
    it('should throw error when agent does not exist', async () => {
      mockAgentRepository.findById.mockResolvedValue(null);
      
      await expect(agentService.executeAgent('nonexistent', {}))
        .rejects
        .toThrow('Agent with id nonexistent not found');
    });
    
    it('should execute agent and return result', async () => {
      const mockAgent: Agent = {
        id: '1',
        name: 'Test Agent',
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
      
      mockAgentRepository.findById.mockResolvedValue(mockAgent);
      
      const inputs = { key: 'value' };
      const result = await agentService.executeAgent('1', inputs);
      
      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('agentId', '1');
      expect(result).toHaveProperty('executionId');
      expect(result).toHaveProperty('outputs.result');
    });
  });
}); 