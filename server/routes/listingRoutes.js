const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const { auth, checkRole } = require('../middleware/auth');

router.post('/', auth, checkRole(['business_owner', 'admin']), listingController.createListing);
router.get('/business/:businessId', listingController.getListingsByBusiness);
router.get('/:id', listingController.getListingById);

module.exports = router;
