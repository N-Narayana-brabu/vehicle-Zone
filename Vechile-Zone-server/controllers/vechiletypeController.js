const { ObjectId } = require("mongodb"); // Import ObjectId
const config = require("../configurations/centralized-configuration");

const getVechileTypeCollection = (req) => {
  return req.db.collection(config.vechileTypeCollectionName);
};

// Read all vechile type data
const getAllVechileTypeData = async (req, res) => {
  console.log("Fetching all vechile type data");
  try {
    const collection = await getVechileTypeCollection(req);
    const data = await collection.find().toArray(); // Fetch all documents
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
};

// Function to get vechile type data based on filter criteria
const getVechileTypeDataBasedOnFilter = async (req, res) => {
  console.log("Fetching vechile type data based on filter");
  // Check if req.body exists
  if (!req.body) {
    res.status(400).json({
      status: "fail",
      message: "No data provided in the request body.",
    });
    return;
  }

  try {
    let filterCriteria = req.body;

    console.log("filterCriteria");
    console.log(filterCriteria);

    const collection = await getVechileTypeCollection(req);
    const filteredData = await collection.aggregate(filterCriteria).toArray();
    res.status(200).json({
      status: "success",
      data: filteredData,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
};

// Create new vechile type data
const createVechileTypeData = async (req, res) => {
  console.log("Creating new vechile type data");
  try {
    const collection = await getVechileTypeCollection(req);
    const newData = req.body.vechiletype;
    const key = newData.key; // Assuming each piece of vechile type data has a unique key

    const updateResult = await collection.updateOne(
      {},
      { $set: { [`vechiletype.${key}`]: newData } }
    );

    if (updateResult.modifiedCount > 0) {
      res.status(201).json({
        status: "success",
        data: newData,
      });
    } else {
      res.status(500).json({
        status: "failure",
        message: "Failed to create new vechile type data",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
};

// Get vechile type data by key
const getVechileTypeDataByKey = async (req, res) => {
  console.log(`Fetching vechile type data with key: ${req.params.key}`);
  try {
    const collection = await getVechileTypeCollection(req);
    const keyValue = String(req.params.key);
    const data = await collection.findOne({
      [`vechiletype.${keyValue}`]: { $exists: true },
    });

    if (data) {
      res.status(200).json({
        status: "success",
        data: data.vechiletype[keyValue],
      });
    } else {
      res.status(404).json({
        status: "not found",
        message: "Vechile type data not found with the given key",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
};

// Update vechile type data by key
const updateVechileTypeDataByKey = async (req, res) => {
  console.log(`Updating vechile type data with key: ${req.params.key}`);
  try {
    const collection = await getVechileTypeCollection(req);
    const keyValue = req.params.key;
    const updateData = req.body;

    // Convert string key to ObjectId
    const objectId = new ObjectId(keyValue);
    const result = await collection.updateOne(
      { _id: objectId },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "No document found with the specified key" });
    } else {
      res.status(200).json({
        status: "success",
        data: updateData,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
};

// Delete vechile type data by key
const deleteVechileTypeDataByKey = async (req, res) => {
  console.log(`Deleting vechile type data with key: ${req.params.key}`);
  try {
    const collection = await getVechileTypeCollection(req);
    const keyValue = req.params.key;

    const updateResult = await collection.updateOne(
      { [`vechiletype.${keyValue}`]: { $exists: true } },
      { $unset: { [`vechiletype.${keyValue}`]: "" } }
    );

    if (updateResult.modifiedCount === 0) {
      res.status(404).json({
        status: "not found",
        message: "Vechile type data not found with the given key",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Vechile type data deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
};

module.exports = {
  getAllVechileTypeData,
  createVechileTypeData,
  getVechileTypeDataByKey,
  updateVechileTypeDataByKey,
  deleteVechileTypeDataByKey,
  getVechileTypeDataBasedOnFilter,
};
