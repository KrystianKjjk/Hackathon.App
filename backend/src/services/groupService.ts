import * as mongoose from 'mongoose';
import { Group } from '../models/group.model'
import GroupRepository from "../repositories/groupRepository";

export default class GroupService {
  private groupRepository: GroupRepository;

  constructor(groupRepository: GroupRepository){
    this.groupRepository = groupRepository;
  }

  getAll = async (): Promise<(Group & mongoose.Document<Group>)[]> => {
    return this.groupRepository.getAll();
  };

  getAllActive = async (): Promise<(Group & mongoose.Document<Group>)[]> => {
    return this.groupRepository.getAllActive();
  };

  deactivateAll = async () => {
    return this.groupRepository.deactivateAll();
  };

  getById = async (id: mongoose.Types.ObjectId): Promise<(Group & mongoose.Document<Group>)[]> => {
    return this.groupRepository.getById(id);
  };

  create = async (sample: Group & mongoose.Document<Group>) => {
    return this.groupRepository.create(sample);
  };
  
  update = async (id: mongoose.Types.ObjectId, sample: Group & mongoose.Document<Group>) => {
    return this.groupRepository.updateById(id, sample);
  };

  delete = async (id: mongoose.Types.ObjectId) => {
    return this.groupRepository.deleteById(id);
  };

  getByUserId = async (userId: mongoose.Types.ObjectId): Promise<(Group & mongoose.Document<Group>)[]> => {
    return this.groupRepository.getByUserId(userId);
  };
}