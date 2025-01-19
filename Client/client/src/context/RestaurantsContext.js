import React, {useState, createContext} from "react";

export const RestaurantsContext = createContext();//A Context provides a way to share values (data or functions) globally across components without prop-drilling.

export const RestaurantsContextProvider = props => { //A functional component that serves as the Provider for the RestaurantsContext
    const[restaurants, setRestaurants] = useState([]); //Initializes a state variable restaurants as an empty array ([]).
    //restaurants: The current value of the state, which represents the list of restaurants.
    //setRestaurants: A function to update the value of restaurants.
    const[selectedRestaurant, setSelectedRestaurant] = useState(null); // for the restaurant detail page

    const addRestaurant = (restaurant) => { //this function is not used for now
        setRestaurants([...restaurants, restaurant]);
    };

    return(
        <RestaurantsContext.Provider value={{restaurants: restaurants, setRestaurants, addRestaurant, selectedRestaurant, setSelectedRestaurant}}>
            {props.children}
        </RestaurantsContext.Provider>
    );
};

//{props.children}: This ensures that any child components wrapped inside RestaurantsContextProvider (in the parent component's JSX)
//are rendered here and can access the provided context values