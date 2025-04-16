import { Service } from 'typedi';
import mongoose, { Schema, Document } from 'mongoose';
import { Flow } from '../../domain/entities/Flow';
import { IFlowRepository } from '../../domain/repositories/FlowRepository';
import { FLOW_REPOSITORY } from '../../constants';

interface FlowDocument extends Document, Omit<Flow, 'id'> {
  // MongoDB document has _id
}

const FlowSchema = new Schema(
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


@Service(FLOW_REPOSITORY)
export class MongoFlowRepository implements IFlowRepository {
  private flowModel: mongoose.Model<FlowDocument>;
  constructor() {
    this.flowModel = mongoose.model<FlowDocument>('Flow', FlowSchema);
  }

  async findById(id: string): Promise<Flow | null> {
    const flow = await this.flowModel.findById(id);
    if (!flow) return null;
    return this.mapToEntity(flow);
  }

  async findAll(): Promise<Flow[]> {
    const flows = await this.flowModel.find();
    return flows.map(this.mapToEntity);
  }

  async findByUserId(userId: string): Promise<Flow[]> {
    const flows = await this.flowModel.find({ userId });
    return flows.map(this.mapToEntity);
  }

  async create(flowData: Omit<Flow, 'id'>): Promise<Flow> {
    const flow = new this.flowModel(flowData);
    await flow.save();
    return this.mapToEntity(flow);
  }

  async update(id: string, flowData: Partial<Flow>): Promise<Flow | null> {
    const flow = await this.flowModel.findByIdAndUpdate(id, flowData, { new: true });
    if (!flow) return null;
    return this.mapToEntity(flow);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.flowModel.findByIdAndDelete(id);
    return !!result;
  }

  private mapToEntity(document: FlowDocument): Flow {
    const { _id, ...rest } = document.toObject();
    return {
      id: _id.toString(),
      ...rest,
    } as Flow;
  }
} 