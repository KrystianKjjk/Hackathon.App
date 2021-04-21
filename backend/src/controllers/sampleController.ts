import * as express from "express";
import mongoose from 'mongoose';
import SampleSchema from "../models/sample.model";
import SampleService from '../services/sampleService';

export default class SampleController {
    service: SampleService;
    constructor(service: SampleService) {
        this.service = service;
    }

    getAll = async (
        req: express.Request,
        res: express.Response
    ) => {
        const allSampleData = await this.service.getAll();
        return res.status(200).json(allSampleData);
    };

    getById = async (
        req: express.Request,
        res: express.Response
    ) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        console.log(id)
        const sampleData = await this.service.getById(id);
        return res.status(200).json(sampleData);
    };

    create = async (
        req: express.Request,
        res: express.Response
    ) => {
        try {
            const sampleData = new SampleSchema(req.body);
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
            const sampleData = new SampleSchema(req.body);
            sampleData._id = id;
            await sampleData.validate();

            const updatedData = await this.service.update(id, sampleData);

            if (!updatedData) {
                return res.status(404).json({ message: "Sample data not found" });
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
                return res.status(404).json({ message: "Sample data not found" });
            }
            return res.status(200).end();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
}
