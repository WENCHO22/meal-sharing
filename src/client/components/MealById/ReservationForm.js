import React, { useState } from "react"
import "./ReservationForm.css"

export default function ReservationForm({ mealId, availableReservations }) {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState(0)
    const [email, setEmail] = useState("")
    const [numberOfGuests, setNumberOfGuests] = useState(0)
    let reservationData = {
        contact_email: email,
        contact_name: name,
        contact_phonenumber: phone,
        meal_id: Number(mealId),
        number_of_guests: Number(numberOfGuests)

    }
    async function onSubmit() {
        try {
            alert("Reservation succesful!")
            await fetch("/api/reservations", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservationData)
            });

        } catch (error) {
            throw error

        }




    }



    return (
        <form onSubmit={onSubmit}>
            <label>
                Name:
                <input type="text" placeholder="Yor name here" onChange={e => setName(e.target.value)} required />
            </label>
            <label>
                Number of guests:
                <input type="number" max={availableReservations} onChange={e => setNumberOfGuests(e.target.value)} required />
            </label>


            <label>
                Phone Number:
                <input type="tel" placeholder="Your phone number here" id="" onChange={e => setPhone(e.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" placeholder="Email Address" onChange={e => setEmail(e.target.value)} required />
            </label>

            <button type="submit" >Reserve!</button>



        </form>

    )


}
