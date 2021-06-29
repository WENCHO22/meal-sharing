const { query, request, response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");


router.get("/", async (req, res) => {
    try {
        const reservations = await knex("reservation")
        res.send(reservations)
    } catch (error) {
        throw error
    }

})

router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        await knex("reservation").insert(req.body)
        res.send(req.body)
    } catch (error) {
        throw error
    }

})

router.get("/:id", async (req, res) => {
    try {
        const reservation = await knex("reservation").where("id", req.params.id)
        res.json(reservation)
    } catch (error) {
        throw error
    }

})

router.put("/:id", async (req, res) => {
    try {
        await knex("reservation").where("id", req.params.id).update(req.body)
        res.send("Reservation updated succesfully!")

    } catch (error) {
        throw error
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await knex("reservation").where("id", req.params.id).del()
        res.send("Reservation deleted")

    } catch {
        throw error
    }

})



module.exports = router;