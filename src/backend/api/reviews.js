const { query, request, response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (req, res) => {
    try {
        const reviews = await knex("review")
        res.send(reviews)
    } catch (error) {
        throw error
    }
})

router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const newReview = await knex("review").insert(req.body)
        res.send("Review added succesfully")
    } catch (error) {
        throw error
    }
})

router.get("/:id", async (req, res) => {
    try {
        const review = await knex("review").where("id", req.params.id)
        res.send(review)
    } catch (error) {
        throw error

    }
})


router.put("/:id", async (req, res) => {
    try {
        await knex("review").where("id", req.params.id).update(req.body)
        res.send("Review deleted")
    } catch (error) {
        throw error
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await knex("review").where("id", req.params.id).del()
        res.send("Review deleted")
    } catch (error) {
        throw error
    }
})

module.exports = router;