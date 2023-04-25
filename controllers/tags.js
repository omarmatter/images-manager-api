const router = require("express").Router();
const bcrypt = require("bcrypt");
const Tag = require("../models/tag");
const {response,errorResponse} = require("../helper/");

// Create a new Tag
router.post("/", async (req, res) => {
    try {
        const tag = await Tag.create({
        name: req.body.name,
        userId: req.user.userId,
        });
        response(res, 'success create tag', tag);
    } catch (err) {
        console.log(err)
        errorResponse(res, 'error create tag', err)
    }
    }
);

// Get all tags of user
router.get("/", async (req, res) => {
    try {
        const tags = await Tag.findAll({ 
            where: { userId: req.user.userId },
            attributes: ['id', 'name'],
        });
        response(res, 'success get all tags', tags);
    } catch (err) {
        console.log(err)
        errorResponse(res, 'error get all tags', err)
    }
    }
);

// Get a tag
router.get("/:id", async (req, res) => {
    try {
        const tag = await Tag.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'name'],
        });
        response(res, 'success get tag', tag);
    } catch (err) {
        errorResponse(res, 'error get tag', err)
    }
    }
);

// Update a tag
router.put("/:id", async (req, res) => {
    try {
        const tag = await Tag.update({
            name: req.body.name,
        }, {
            where: { id: req.params.id },
        });
        response(res, 'success update tag', tag);
    } catch (err) {
        errorResponse(res, 'error update tag', err)
    }
    }
);

// Delete a tag
router.delete("/:id", async (req, res) => {
    try {
        const tag = await Tag.destroy({
            where: { id: req.params.id },
        });
        response(res, 'success delete tag', tag);
    } catch (err) {
        errorResponse(res, 'error delete tag', err)
    }
    }
);

module.exports = router;