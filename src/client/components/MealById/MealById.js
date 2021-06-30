import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Meal from "../Meal/Meal"
import ReservationForm from "./ReservationForm";



export default function MealById() {
  const [currentMeal, setCurrentMeal] = useState({})
  const [availableReservations, setAvailableReservations] = useState(0) //available reservaitons remaining

  const { id } = useParams()
  useEffect(() => {
    fetch(`/api/meals/${id}`)
      .then(response => response.json())
      .then(data => setCurrentMeal(...data))
  }, [])

  useEffect(() => {
    fetch("api/meals/?availableReservations=true")
      .then(response => response.json())
      .then(data => {
        data = data[0]
        let findReservation = data.find(x => x.id = id)
        console.log(findReservation)
        if (findReservation !== undefined) {
          let availableSpace = findReservation.max_reservations - Number(findReservation.reserved)
          setAvailableReservations(availableSpace)
          console.log(availableSpace)
        }


      })
  }, [])

  //The form should only appear if there is available spots for the meal

  return (
    <>
      <Meal id={currentMeal.id} description={currentMeal.description} price={currentMeal.price} title={currentMeal.title} />

      {availableReservations > 0  && <ReservationForm mealId={id} availableReservations={availableReservations} />}



    </>
  )
}