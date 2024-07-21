const mongoose = require('mongoose');

// Define the collection name directly
const dataTypeCollectionName = 'datatype'; // Hardcoded collection name

// Get the data type collection from the request's database connection
const getDataTypeCollection = (req) => {
  return req.db.collection(dataTypeCollectionName);
};

// Read all data type data
const getDataTypeData = async (req, res) => {
  console.log("Fetching all data type data");
  try {
    const collection = getDataTypeCollection(req);
    const data = await collection.find({}).toArray(); // Fetch all documents
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

// Create new data type data
const createDataTypeData = async (req, res) => {
  console.log("Creating new data type data");
  try {
    const collection = getDataTypeCollection(req);
    const result = await collection.insertOne(req.body);
    res.status(201).json({
      status: "success",
      data: result.ops[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
};

// Get data type data by pageName
const getDataTypeDataById = async (req, res) => {
  console.log(`Fetching data type data with pageName: ${req.params.pageName}`);
  try {
    const collection = getDataTypeCollection(req);
    const data = await collection.findOne({ pageName: req.params.pageName });
    if (!data) {
      return res.status(404).json({
        status: "failure",
        message: "Data not found",
      });
    }
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

// Update data type data by ID
const updateDataTypeDataById = async (req, res) => {
  console.log(`Updating data type data with ID: ${req.params.id}`);
  try {
    const collection = getDataTypeCollection(req);
    const result = await collection.updateOne(
      { _id: new mongoose.Types.ObjectId(req.params.id) }, // Convert string to ObjectId
      { $set: req.body }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: "failure",
        message: "Data not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Data updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
};

// Delete data type data by ID
const deleteDataTypeDataById = async (req, res) => {
  console.log(`Deleting data type data with ID: ${req.params.id}`);
  try {
    const collection = getDataTypeCollection(req);
    const result = await collection.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) }); // Convert string to ObjectId
    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: "failure",
        message: "Data not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
};

module.exports = {
  getDataTypeData,
  createDataTypeData,
  getDataTypeDataById,
  updateDataTypeDataById,
  deleteDataTypeDataById,
};
