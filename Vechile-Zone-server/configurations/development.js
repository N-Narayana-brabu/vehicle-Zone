// config/development.js

const config = {
    dbUrl:
      "mongodb://localhost:27017/vechile-zone",
    pagesCollectionName: "pages", // Add your collection name here
    datatypeCollectionName: "datatypes", // Add your collection name here
    usersCollectionName: "users",
    appdataCollectionName: "appdata",
    channelPartnerCollectionName: "channelPartner", // Add your collection name here
    dashboardsCollectionName: "dashboards", // Add your collection name here
    controlsCollectionName: "controls",
    mappingsCollectionName: "mappings",
    batchFlagsCollectionName: "batchFlags",
  };
  
  module.exports = config;
  