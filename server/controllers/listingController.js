const Listing = require('../models/Listing');

exports.createListing = async (req, res) => {
    try {
        const listing = new Listing(req.body);
        await listing.save();
        res.status(201).send(listing);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getListingsByBusiness = async (req, res) => {
    try {
        const listings = await Listing.find({ businessId: req.params.businessId });
        res.send(listings);
    } catch (e) {
        res.status(500).send();
    }
};

exports.getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).send();
        res.send(listing);
    } catch (e) {
        res.status(500).send();
    }
};
