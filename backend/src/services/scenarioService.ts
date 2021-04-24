import * as mongoose from 'mongoose';
import { Decision, Scenario } from "../models/scenario.model";
import Repository from "../repositories/repository";
import GroupRepository from "../repositories/groupRepository";
import { User } from '../models/user.model';

export default class ScenarioService {
  private scenarioRepository: Repository;
  private groupRepository: GroupRepository;
  private userModel: mongoose.Model<IUser & mongoose.Document>;;

  constructor(scenarioRepository: Repository, groupRepository: GroupRepository, userModel){
    this.scenarioRepository = scenarioRepository;
    this.groupRepository = groupRepository;
    this.userModel = userModel;
  }

  getAll = async (): Promise<(Scenario & mongoose.Document<Scenario>)[]> => {
    return this.scenarioRepository.getAll();
  };

  getById = async (id: mongoose.Types.ObjectId): Promise<(Scenario & mongoose.Document<Scenario>)> => {
    return this.scenarioRepository.getById(id);
  };

  create = async (scenario: Scenario & mongoose.Document<Scenario>) => {
    return this.scenarioRepository.create(scenario);
  };
  
  update = async (id: mongoose.Types.ObjectId, scenario: Scenario & mongoose.Document<Scenario>) => {
    return this.scenarioRepository.updateById(id, scenario);
  };

  delete = async (id: mongoose.Types.ObjectId) => {
    return this.scenarioRepository.deleteById(id);
  }

  _countPoints = async (users: mongoose.Types.ObjectId[], decision: Decision) => {
    const points = Math.random() < decision.risk ? -decision.punishment : decision.prize;
    this.userModel.updateMany({_id: {$in: users}},  { "$inc": { totalPoints: points } })
  }

  takeDecision = async (
    id: mongoose.Types.ObjectId, 
    questId: string, 
    decisionId: string, 
    userId: mongoose.Types.ObjectId
  ) => {
    const scenario = await this.getById(id);
    const quest = scenario.quests[questId];
    if (!quest) return null;

    const decision = quest.decisions[decisionId];
    if (!decision) return null;

    for (let i in quest.decisions) {
      const userIdx = quest.decisions[i].users.findIndex(user => `${user._id}` === `${userId}`);
      if (userIdx >= 0)
        quest.decisions[i].users.splice(userIdx, 1);
    }

    scenario.quests[questId].decisions[decisionId].users.push(userId);
    scenario.markModified('quests');
    await this.scenarioRepository.save(scenario);

    const team = await this.groupRepository.getByUserId(userId);
    if (team.users.length === decision.users.length){
      const users = team.users.map(user => user._id);
      this._countPoints(users, decision);
    }
    
    return scenario;
  }

  untakeDecision = async (
    id: mongoose.Types.ObjectId, 
    questId: string, 
    decisionId: string, 
    userId: mongoose.Types.ObjectId
  ) => {
    const scenario = await this.getById(id);
    const quest = scenario.quests[questId];
    if (!quest) return null;

    const decision = quest.decisions[decisionId];
    if (!decision) return null;
    
    const userIdx = decision.users.findIndex(user => `${user._id}` === `${userId}`);
    if (userIdx < 0)
      return null;
    
    scenario.quests[questId].decisions[decisionId].users.splice(userIdx, 1);
    scenario.markModified('quests');
    await this.scenarioRepository.save(scenario);
    return scenario;
  }

}