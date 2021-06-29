
import "./Home.css"
import React, { useContext } from "react"
import { MealsContext } from "../../App"
import Meal from "../Meal/Meal"



export default function HomePage({ meals }) {

    return (
            <div className="flex-container">
                {meals.map(item => (
                    <Meal key={item.id} id={item.id} title={item.title} price={item.price} description={item.description} />
                ))}
            </div>
    )
}