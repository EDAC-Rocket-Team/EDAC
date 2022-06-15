const express = require('express')
const DonorModel = require("./models/donors");
const BenModel = require("./models/ben");
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header("edak-blood-token");
        if (!token)
            return res.status(401).json({ msg: "No authentication token, access denied" });
        const verified = jwt.verify(token, process.env.JWTSECRET);
        if (!verified)
            return res.status(401).json({ msg: "Token verification failed, authorization denied" });
        req.user = verified.id;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const authDonor = async (req, res, next) => {
    try {
        let donor = await DonorModel.findById(req.user);
        if (donor) {
            next()
        } else {
            return res.status(401).json("You don't have permission")
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const authBeneficiary = async (req, res, next) => {
    try {
        let beneficiary = await BenModel.findById(req.user);
        if (beneficiary) {
            next()
        } else {
            return res.status(401).json("You don't have permission")
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { auth, authDonor, authBeneficiary };