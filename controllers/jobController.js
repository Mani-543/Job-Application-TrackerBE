const Job = require("../models/Job");

// Get All Jobs
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({
            user: req.user.id,
        });

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get a single job
const getJobById = async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.params.id, user: req.user.id });

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add Job
const addJob = async (req, res) => {
    try {
        const {
            company,
            role,
            status,
            applicationDate,
            interviewDate,
            notes,
        } = req.body;

        const job = await Job.create({
            company,
            role,
            status,
            applicationDate,
            interviewDate,
            notes,
            user: req.user.id,
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Job
const updateJob = async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.params.id, user: req.user.id });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Job
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.params.id, user: req.user.id });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        await Job.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Job deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getJobs,
    getJobById,
    addJob,
    updateJob,
    deleteJob,
};