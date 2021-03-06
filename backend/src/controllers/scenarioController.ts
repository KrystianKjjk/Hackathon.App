import * as express from "express";
import mongoose from 'mongoose';
import ScenarioSchema from "../models/scenario.model";
import ScenarioService from '../services/scenarioService';

const second = 1000; // ms
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

export default class SampleController {
    service: ScenarioService;
    constructor(service: ScenarioService) {
        this.service = service;
    }

    getAll = async (
        req: express.Request,
        res: express.Response
    ) => {
        const allScenarios = await this.service.getAll();
        return res.status(200).json(allScenarios);
    };

    getById = async (
        req: express.Request,
        res: express.Response
    ) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const scenario = await this.service.getById(id);
        return res.status(200).json(scenario);
    };

    create = async (
        req: express.Request,
        res: express.Response
    ) => {
        try {
            if ( !(req.body.startDate) )
                req.body.startDate = (new Date()).getTime();
            if ( !(req.body.endDate) )
                req.body.endDate = (new Date()).getTime() + 7 * day;
            const scenarioData = new ScenarioSchema(req.body);
            await scenarioData.validate();
            await this.service.create(scenarioData);
            return res.status(201).json(scenarioData);
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
            const scenarioData = new ScenarioSchema(req.body);
            scenarioData._id = id;
            await scenarioData.validate();

            const updatedData = await this.service.update(id, scenarioData);

            if (!updatedData) {
                return res.status(404).json({ message: "Scenario not found" });
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

    takeDecision = async (
        req: express.Request & { user: { _id: mongoose.Types.ObjectId } },
        res: express.Response
    ) => {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id);
            const questIdx = req.params.questIdx;
            const decisionIdx = req.params.decisionIdx;
            const userId = new mongoose.Types.ObjectId(req?.user._id);
            const updatedData = await this.service.takeDecision(id, questIdx, decisionIdx, userId);

            if (!updatedData) {
                return res.status(404).json({ message: "Scenario or quest or decision not found" });
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

    untakeDecision = async (
        req: express.Request & { user: { _id: mongoose.Types.ObjectId } },
        res: express.Response
    ) => {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id);
            const questIdx = req.params.questIdx;
            const decisionIdx = req.params.decisionIdx;
            const userId = new mongoose.Types.ObjectId(req?.user._id);
            const updatedData = await this.service.untakeDecision(id, questIdx, decisionIdx, userId);

            if (!updatedData) {
                return res.status(404).json({ message: "Scenario or quest or decision not found" });
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
            const scenario = this.service.delete(id);
            if (!scenario) {
                return res.status(404).json({ message: "Scenario not found" });
            }
            return res.status(200).end();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
}
