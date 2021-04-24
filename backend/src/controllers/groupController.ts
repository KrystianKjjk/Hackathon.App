import * as express from "express";
import mongoose from 'mongoose';
import GroupSchema from '../models/group.model';
import GroupService from '../services/groupService';
import ScenarioService from '../services/scenarioService';

export default class GroupController {
    service: GroupService;
    scenarioService: ScenarioService

    constructor(service: GroupService, scenarioService: ScenarioService) {
        this.service = service;
        this.scenarioService = scenarioService;
    }
    getAll = async (
        req: express.Request,
        res: express.Response
    ) => {
        const allData = await this.service.getAll();
        return res.status(200).json(allData);
    };

    getAllActive = async (
        req: express.Request,
        res: express.Response
    ) => {
        const allData = await this.service.getAllActive();
        return res.status(200).json(allData);
    };

    deactivateAll = async (
        req: express.Request,
        res: express.Response
    ) => {
        const allData = await this.service.deactivateAll();
        return res.status(200).json(allData);
    };

    getById = async (
        req: express.Request,
        res: express.Response
    ) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const sampleData = await this.service.getById(id);
        return res.status(200).json(sampleData);
    };

    create = async (
        req: express.Request,
        res: express.Response
    ) => {
        try {           

            const group = req.body;           

            if(!group.scenario) {
                const scenario = await this.scenarioService.getAll();
                const scenarioWithQuest = scenario.find(element => element.quests !== undefined)
                //@ts-ignore
                console.log(scenarioWithQuest.quests);
                //@ts-ignore
                group.scenario = scenarioWithQuest?._id;
                
                //@ts-ignore
                group.currentQuest = 0; 
            }

            const sampleData = new GroupSchema(group);
            await sampleData.validate();


            await this.service.create(sampleData);
            return res.status(201).json(sampleData);
        } catch (error) {
            const errorMessage = { message: error.message };
            if (error.name === "ValidationError") {
                return res.status(400).json(errorMessage);
            }
            return res.status(500).json(errorMessage);
        }
    };

    update = async (
        req: express.Request,
        res: express.Response
    ) => {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id);
            const sampleData = new GroupSchema(req.body);
            sampleData._id = id;
            await sampleData.validate();

            const updatedData = await this.service.update(id, sampleData);

            if (!updatedData) {
                return res.status(404).json({ message: "Group not found" });
            }
            const fetchedData = await this.service.getById(id);
            return res.status(201).json(fetchedData);
        } catch (error) {
            const errorMessage = { message: error.message };
            if (error.name === "ValidationError") {
                return res.status(400).json(errorMessage);
            }
            return res.status(500).json(errorMessage);
        }
    };

    delete = async (
        req: express.Request,
        res: express.Response
    ) => {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id);
            const sample = this.service.delete(id);
            if (!sample) {
                return res.status(404).json({ message: "Group not found" });
            }
            return res.status(200).end();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    getByUserId = async (
        req: express.Request,
        res: express.Response
    ) => {
        const id = new mongoose.Types.ObjectId(String('60843aa93348b40042418f66'));
        const groupData = await this.service.getById(id);
        console.log(groupData);
        return res.status(200).json(groupData);
    };

    //gets a table of groups - creates multiple groups at once
    createMany = async (
        req: express.Request,
        res: express.Response
    ) => {
        const active = await this.service.getAllActive();
        if (active.length > 0) 
            return res.status(200).json({ message: "Creating teams is not allowed, because there are some active teams." });
        
        const groups = req.body.userGroups;
        
        try{
            for (let i = 0; i < groups.length; i++ ){
            
                const group = req.body;
                group.users = groups[i];
               

                if(!group.scenario) {
                    const scenario = await this.scenarioService.getAll();
                    const scenarioWithQuest = scenario.find(element => element.quests !== undefined)
                    //@ts-ignore
                    console.log(scenarioWithQuest.quests);
                    //@ts-ignore
                    group.scenario = scenarioWithQuest?._id;
                    
                    //@ts-ignore
                    group.currentQuest = 0; 
                }


                const sampleData = new GroupSchema(group);
                await sampleData.validate();
                await this.service.create(sampleData); 
            }
            return res.status(200).json(groups);
        }catch (error) {
                const errorMessage = { message: error.message };
                if (error.name === "ValidationError") {
                    return res.status(400).json(errorMessage);
                }
                return res.status(500).json(errorMessage);
            }
        }   
}
