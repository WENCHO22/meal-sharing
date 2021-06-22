import React from "react"
import Meal from "../Meal/Meal"
import { Link} from "react-router-dom"
import NewMeal from "./NewMeal"
import "./Meals.css"

export default function Meals({meals, setMeals}) {


    return (
        <>
            <div className="flex-container">
                {meals.map(item => (
                    <Link to={`/meals/${item.id}`} key={item.id}>
                        <Meal id={item.id} title={item.title} price={item.price} description={item.description} />
                    </Link>
                ))}
            </div>
            <div className="new-meal-container">
                <NewMeal meals={meals} setMeals={setMeals} />
                
            </div>

        </>
    )




}