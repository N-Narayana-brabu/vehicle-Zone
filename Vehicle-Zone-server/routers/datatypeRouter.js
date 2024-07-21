const express = require('express');
const {
  getDataTypeData,
  createDataTypeData,
  getDataTypeDataById,
  updateDataTypeDataById,
  deleteDataTypeDataById,
} = require('../controllers/datatypeController');

const router = express.Router();

router.get('/', getDataTypeData);
router.post('/', createDataTypeData);
router.get('/:pageName', getDataTypeDataById);
router.put('/:id', updateDataTypeDataById);
router.delete('/:id', deleteDataTypeDataById);

module.exports = router;
