const { query, request, response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    if ("maxPrice" in request.query) {
      const maxPrice = request.query.maxPrice
      const meals = await knex("meal").where("price", "<=", maxPrice)
      response.send(meals)
      return
    }
    if ("availableReservations" in request.query && request.query.availableReservations == "true") {
      const meals = await knex.raw(
        `SELECT meal.id, meal.title, meal.max_reservations, SUM(reservation.number_of_guests) AS reserved
          FROM meal
          LEFT JOIN reservation
          ON meal.id = meal_id
          GROUP BY meal_id
          HAVING max_reservations > reserved OR reserved IS NULL;
          `)
      console.log(meals)
      response.send(meals)
      return
    }
    if ("title" in request.query) {
      const title = request.query.title
      const meals = await knex("meal").where("title", "like", "%" + title + "%")
      response.send(meals)
      return
    }
    if ("createdAfter" in request.query) {
      const createdAfter = Data.parse(request.query.createdAfter)
      const meals = await knex("meal").where("created_date", ">=", createdAfter)
      response.send(meals)
      return
    }
    if ("limit" in request.query) {
      const limit = Number(request.query.limit)
      const meals = await knex("meal").limit(limit)
      response.send(meals)
      return
    }
    const meals = await knex("meal")
    response.send(meals)
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response)=>{
  try{
    const meal = await knex("meal").where("id", Number(request.params.id))
    response.send(meal)
  }catch(error){
    res.status(500).send('Error')
  }
})

router.post("/", async (request, response) => {
  try {
    console.log(request.body)
    await knex("meal").insert(request.body)
    response.send(req.body)
  } catch (error) {
    throw error
  }
})

router.put("/:id", async (request, response) =>{
  await knex("meal").where("id", request.params.id).update(request.body)
  response.send("Meal updated succesfully")
})

router.delete("/:id", async(request, response) =>{
  await knex("meal").where("id", request.params.id).del()
  response.send("Meal deleted")
})

module.exports = router;