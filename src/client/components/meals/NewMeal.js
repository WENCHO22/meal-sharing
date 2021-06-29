import React, { useEffect, useState } from "react"


export default function NewMeal({ meals, setMeals }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [when, setWhen] = useState("")
    const [maxReservations, setMaxReservations] = useState(0)
    const [price, setPrice] = useState(0)
    const newMealData = {
        title: title,
        description: description,
        location: location,
        when: when.replace("T", " "),
        max_reservations: Number(maxReservations),
        price: Number(price)
    }
    console.log(newMealData)

    async function onSubmit(e) {
        try {
            alert("meal added succesfully!")
            await fetch("/api/meals", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMealData)
            });



        } catch (error) {
            throw (error)
        }
    }



    return (
        <form onSubmit={onSubmit}>
            <label>
                Title:
                <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required></input>
            </label>
            <label>
                Location:
                <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} required></input>
            </label>
            <label>
                When:
                <input type="datetime-local" placeholder="When" onChange={(e) => setWhen(e.target.value)} required></input>
            </label>
            <label>
                Description:
                <input className="description" type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} required></input>
            </label>
            <label>
                Max reservations:
                <input type="number" placeholder="Max reservations" onChange={(e) => setMaxReservations(e.target.value)} required></input>
            </label>
            <label>
                Price:
                <input type="number" placeholder="Price on DKK" onChange={(e) => setPrice(e.target.value)} required></input>
            </label>
            <button type="submit">Add new meal!</button>


        </form>
    )



}