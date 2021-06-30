import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./components/Home/HomePage"
import MealById from "./components/MealById/MealById"
import Meals from "./components/meals/Meals"
import "./App.css"

const MealsContext = React.createContext()

function App() {
  const [meals, setMeals] = useState([])


  useEffect(() => {
    fetch(`/api/meals/`)
      .then(request => request.json())
      .then(data => setMeals(data))
  }, [])


  return (

    <>
      <header>
        <div className="title-logo">
          <img src="https://res.cloudinary.com/dsv3ara7w/image/upload/v1624378769/chef-logo_umd6s2.svg" id="logo" alt="App logo" height="80" width="80"></img>
          <h1>Meal Sharing App</h1>
        </div>



        <h3>Share with other foodies an unforgettable culinary experience</h3>
      </header>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/meals">Meals</Link>
          </li>
        </ul>
      </nav>




      <Router>
        <Route exact path="/">
          <Home meals={meals} />

        </Route>
        <Route exact path="/meals/:id">
          <MealById />
        </Route>
        <Route exact path="/meals">
          <Meals meals={meals} setMeals={setMeals} />
        </Route>
      </Router>
    </>
  );
}

export default App;
export { MealsContext };
