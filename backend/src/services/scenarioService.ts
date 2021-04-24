import * as mongoose from 'mongoose';
import { Scenario } from "../models/scenario.model";
import Repository from "../repositories/repository";

export default class ScenarioService {
  private scenarioRepository: Repository;

  constructor(scenarioRepository: Repository){
    this.scenarioRepository = scenarioRepository;
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