const config = require("../configurations/centralized-configuration");
const getDashboardsCollection = (req) => {
  return req.db.collection(config.dashboardsCollectionName);
};

// Read all app data
const getAllDashboards = async (req, res) => {
  console.log("Fetching all app data");
  try {
    const collection = await getDashboardsCollection(req);
    const data = await collection.find().toArray(); // Assuming there's only one document for app data
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

// Function to get app data based on filter criteria
const getDashboardsBasedOnFilter = async (req, res) => {
  console.log("Fetching app data based on filter");
  // Check if req.body exists
  if (!req.body) {
    // Handle the absence of req.body
    // For example, send a 400 Bad Request response
    res.status(400).json({
      status: "fail",
      message: "No data provided in the request body.",
    });
    return; // Stop execution of the function
  }

  try {
    let filterCriteria = req.body;

    console.log("filterCriteria");
    console.log(filterCriteria);

    const collection = await getDashboardsCollection(req);
    // Query the database with the filter criteria
    const filteredData = await collection.aggregate(filterCriteria).toArray();
    // Send the filtered data as response
    res.status(200).json({
      status: "success",
      data: filteredData,
    });
  } catch (error) {
    // Send error response
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
};

// Create new app data
const createDashboards = async (req, res) => {
  console.log("Creating new app data");
  try {
    const collection = await getDashboardsCollection(req);
    const newData = req.body.appdata;
    const key = newData.key; // Assuming each piece of app data has a unique key

    const updateResult = await collection.updateOne(
      {},
      { $set: { [`appdata.${key}`]: newData } }
    );

    if (updateResult.modifiedCount > 0) {
      res.status(201).json({
        status: "success",
        data: newData,
      });
    } else {
      res.status(500).json({
        status: "failure",
        message: "Failed to create new app data",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
};

// Get app data by key
const getDashboardsByKey = async (req, res) => {
  console.log(`Fetching app data with key: ${req.params.key}`);
  try {
    const collection = await getDashboardsCollection(req);
    const keyValue = String(req.params.key);
    const data = await collection.findOne({
      [`appdata.${keyValue}`]: { $exists: true },
    });

    if (data) {
      res.status(200).json({
        status: "success",
        data: data.appdata[keyValue],
      });
    } else {
      res.status(404).json({
        status: "not found",
        message: "App data not found with the given key",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
};

// Update app data by key
const updateDashboardsByKey = async (req, res) => {
  console.log(`Updating app data with key: ${req.params.key}`);
  try {
    const collection = await getDashboardsCollection(req);
    const keyValue = req.params.key;
    const updateData = req.body.appdata;

    const updateResult = await collection.updateOne(
      { [`appdata.${keyValue}`]: { $exists: true } },
      { $set: { [`appdata.${keyValue}`]: updateData } }
    );

    if (updateResult.matchedCount === 0) {
      res.status(404).json({
        status: "not found",
        message: "App data not found with the given key",
      });
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

// Delete app data by key
const deleteDashboardsByKey = async (req, res) => {
  console.log(`Deleting app data with key: ${req.params.key}`);
  try {
    const collection = await getDashboardsCollection(req);
    const keyValue = req.params.key;

    const updateResult = await collection.updateOne(
      { [`appdata.${keyValue}`]: { $exists: true } },
      { $unset: { [`appdata.${keyValue}`]: "" } }
    );

    if (updateResult.modifiedCount === 0) {
      res.status(404).json({
        status: "not found",
        message: "App data not found with the given key",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "App data deleted successfully",
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
  getAllDashboards,
  createDashboards,
  getDashboardsByKey,
  updateDashboardsByKey,
  deleteDashboardsByKey,
  getDashboardsBasedOnFilter,
};
