const express = require("express");
const {
  createVechileTypeData,
  getAllVechileTypeData,
  getVechileTypeDataByKey,
  updateVechileTypeDataByKey,
  deleteVechileTypeDataByKey,
  getVechileTypeDataBasedOnFilter,
} = require("../controllers/vechiletypeController");

const router = express.Router();

// Route to create new vechile type data
router.post("/", createVechileTypeData);

// Route to read all vechile type data
router.get("/", getAllVechileTypeData);

// Route to get a single vechile type data by key
router.get("/:key", getVechileTypeDataByKey);

// Route to update vechile type data by key
router.put("/:key", updateVechileTypeDataByKey);

// Route to delete vechile type data by key
router.delete("/:key", deleteVechileTypeDataByKey);

// Route to get vechile type data based on filter
router.post("/filter", getVechileTypeDataBasedOnFilter);

module.exports = router;
