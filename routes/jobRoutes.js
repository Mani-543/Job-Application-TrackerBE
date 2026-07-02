const express = require("express");

const {
    getJobs,
    getJobById,
    addJob,
    updateJob,
    deleteJob,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getJobs);
router.get("/:id", protect, getJobById);
router.post("/", protect, addJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

module.exports = router;