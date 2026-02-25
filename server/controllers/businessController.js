const Business = require('../models/Business');

exports.createBusiness = async (req, res) => {
    try {
        const business = new Business({
            ...req.body,
            ownerId: req.user._id
        });
        await business.save();
        res.status(201).send(business);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find();
        res.send(businesses);
    } catch (e) {
        res.status(500).send();
    }
};

exports.getBusinessById = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) return res.status(404).send();
        res.send(business);
    } catch (e) {
        res.status(500).send();
    }
};
