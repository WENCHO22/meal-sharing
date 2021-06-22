import React from "react"

export default function Meal({id, title, description, price}) {
    return (
        <div key={id} className="meal">
            <h4>{title}</h4>
            <p>"{description}"</p>
            <p>Price: ${price}</p>
        </div>
    )
}