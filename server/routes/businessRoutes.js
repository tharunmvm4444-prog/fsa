const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const { auth, checkRole } = require('../middleware/auth');

router.post('/', auth, checkRole(['business_owner', 'admin']), businessController.createBusiness);
router.get('/', businessController.getBusinesses);
router.get('/:id', businessController.getBusinessById);

module.exports = router;
