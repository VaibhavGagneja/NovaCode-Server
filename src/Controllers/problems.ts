
import { Request, Response } from "express";
import Problem from "../DB/Models/ProblemModel";

export const getAllProblems = async (req: Request, res: Response) => {
    try {
        const problems = await Problem.find();
        res.json(problems);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const getByCategory = async (req: Request, res: Response) => {
    const category: string = req.params.category;
    try {
        const problems = await Problem.find({ topics: category });
        if (!problems) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.json(problems);
    } catch (err: any) {
        res.status(500).json({ error: 'Server Error' });
    }
}

export const insertProblem = async (req: Request, res: Response) => {
    try {
        const problems = new Problem(req.body);
        if (!problems) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        await problems.save();
        res.status(201).json(problems);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export const updateProblemById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const problem = await Problem.findByIdAndUpdate(id, req.body, { new: true });
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.json(problem);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
export const deleteProblemById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const problem = await Problem.findByIdAndRemove(id);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.json({ message: 'Problem deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
export const getByIdOrTitle = async (req: Request, res: Response) => {
    const param = req.params.param;
    try {
        let problem = null;
        if (!isNaN(Number(param))) {
            problem = await Problem.findOne({ pid: param });
        } else {
            problem = await Problem.findOne({ title: param });
        }
        res.json(problem);

    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}




