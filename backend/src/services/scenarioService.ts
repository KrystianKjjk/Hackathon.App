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
    questName: string, 
    decisionName: string, 
    userId: mongoose.Types.ObjectId
  ) => {
    const scenario = await this.getById(id);
    const questIdx = scenario.quests.findIndex(quest => quest.name === questName);
    if (questIdx < 0) return null;

    const decisionIdx = scenario.quests[questIdx].decisions.findIndex(decision => decision.title === decisionName);
    if (decisionIdx < 0) return null;

    scenario.quests[questIdx].decisions[decisionIdx].users.push(userId);
    scenario.markModified('quests');
    this.scenarioRepository.save(scenario);
    return scenario;
  }

}