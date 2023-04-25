const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Folder = require("../models/folder");

const {response,errorResponse} = require("../helper/");
const jwt = require('jsonwebtoken');


// Create a new Folder
router.post("/", async (req, res) => {
    try {
        console.log(req.user)
        const folder = await Folder.create({
        name: req.body.name,
        userId: req.user.userId,
        });
        response(res, 'success create folder', folder);
    } catch (err) {
        console.log(err)
        errorResponse(res, 'error create folder', err)
    }
    }
);

// Get all folders of user
router.get("/", async (req, res) => {
    try {
        const folders = await Folder.findAll({ 
            where: { userId: req.user.userId },
            attributes: ['id', 'name'],
        });
        response(res, 'success get all folders', folders);
    } catch (err) {
        console.log(err)
        errorResponse(res, 'error get all folders', err)
    }
    }
);

// Get a folder
router.get("/:id", async (req, res) => {
    try {
        const folder = await Folder.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'name'],
        });
        response(res, 'success get folder', folder);
    } catch (err) {
        errorResponse(res, 'error get folder', err)
    }
    }
);

// Update a folder
router.put("/:id", async (req, res) => {
    try {
        const folder = await Folder.update({
            name: req.body.name,
        }, {
            where: { id: req.params.id },
        });
        response(res, 'success update folder', folder);
    } catch (err) {
        errorResponse(res, 'error update folder', err)
    }
    }
);

// Delete a folder
router.delete("/:id", async (req, res) => {
    try {
        const folder = await Folder.destroy({
            where: { id: req.params.id },
        });
        response(res, 'success delete folder', folder);
    } catch (err) {
        errorResponse(res, 'error delete folder', err)
    }
    }
);



module.exports = router;
