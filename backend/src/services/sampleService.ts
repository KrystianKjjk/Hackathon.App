import * as mongoose from 'mongoose';
import { Sample } from "../models/Sample.model";
import Repository from "../repositories/Repository";

export default class SampleService {
  private sampleRepository: Repository;

  constructor(sampleRepository: Repository){
    this.sampleRepository = sampleRepository;
  }

  getAll = async (): Promise<(Sample & mongoose.Document<Sample>)[]> => {
    return this.sampleRepository.getAll();
  };

  getById = async (id: mongoose.Types.ObjectId): Promise<(Sample & mongoose.Document<Sample>)[]> => {
    return this.sampleRepository.getById(id);
  };

  create = async (sample: Sample & mongoose.Document<Sample>) => {
    return this.sampleRepository.create(sample);
  };
  
  update = async (id: mongoose.Types.ObjectId, sample: Sample & mongoose.Document<Sample>) => {
    return this.sampleRepository.updateById(id, sample);
  };

  delete = async (id: mongoose.Types.ObjectId) => {
    return this.sampleRepository.deleteById(id);
  }
}