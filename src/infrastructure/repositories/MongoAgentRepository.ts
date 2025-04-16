import mongoose, { Document, Schema } from 'mongoose';
import { Service } from 'typedi';
import { AGENT_REPOSITORY } from '../../constants';
import { Agent } from '../../domain/entities/Agent';
import { IAgentRepository } from '../../domain/repositories/AgentRepository';

interface AgentDocument extends Document, Omit<Agent, 'id'> {
  // MongoDB document has _id
}

const AgentSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    version: { type: String, required: true },
    definition: {
      steps: [
        {
          id: { type: String, required: true },
          type: { type: String, required: true },
          name: { type: String, required: true },
          config: { type: Object, required: true },
          provider: { type: String },
          next: [{ type: String }],
        },
      ],
      inputs: [
        {
          name: { type: String, required: true },
          type: { type: String, required: true },
          required: { type: Boolean, required: true },
          default: { type: Schema.Types.Mixed },
        },
      ],
      outputs: [
        {
          name: { type: String, required: true },
          type: { type: String, required: true },
        },
      ],
    },
    userId: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);


@Service(AGENT_REPOSITORY)
export class MongoAgentRepository implements IAgentRepository {
  private agentModel: mongoose.Model<AgentDocument>;
  constructor() {
    this.agentModel = mongoose.model<AgentDocument>('Agent', AgentSchema);
  }

  async findById(id: string): Promise<Agent | null> {
    const agent = await this.agentModel.findById(id);
    if (!agent) return null;
    return this.mapToEntity(agent);
  }

  async findAll(): Promise<Agent[]> {
    const agents = await this.agentModel.find();
    return agents.map(this.mapToEntity);
  }

  async findByUserId(userId: string): Promise<Agent[]> {
    const agents = await this.agentModel.find({ userId });
    return agents.map(this.mapToEntity);
  }

  async create(agentData: Omit<Agent, 'id'>): Promise<Agent> {
    const agent = new this.agentModel(agentData);
    await agent.save();
    return this.mapToEntity(agent);
  }

  async update(id: string, agentData: Partial<Agent>): Promise<Agent | null> {
    const agent = await this.agentModel.findByIdAndUpdate(id, agentData, { new: true });
    if (!agent) return null;
    return this.mapToEntity(agent);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.agentModel.findByIdAndDelete(id);
    return !!result;
  }

  private mapToEntity(document: AgentDocument): Agent {
    const { _id, ...rest } = document.toObject();
    return {
      id: _id.toString(),
      ...rest,
    } as Agent;
  }
} 