import React, {useContext, useEffect} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

const RestaurantList = () => {
  let navigate = useNavigate();
  const {restaurants, setRestaurants} = useContext(RestaurantsContext);
  useEffect(()=> {
    const FetchData = async () => {
        try{
            const response = await RestaurantFinder.get("/"); //This will return a promise so we need to put it in await and async
            setRestaurants(response.data.data.restaurants);
            // console.log(response);
        }
        catch(err){
            console.log(err);
        }  
    };
    FetchData();//Instead of making the function directly passed to useEffect asynchronous, define an inner async function (fetchData).
  }, []);
//This useEffect is used to fetch data from the backend (API) when the component is first rendered
//The function passed to useEffect executes once the component mounts (if the dependency array is empty, i.e., []).

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try{
        const response = await RestaurantFinder.delete(`/${id}`);
        setRestaurants(restaurants.filter(restaurant => {
            return restaurant.id !== id; //if this is true then add that to array restaurants otherwise remove this
        }));
        // console.log(response);
    }
    catch(err){
        console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if(restaurant.count==0 || (!restaurant.count)){
      return(<span className="text-warning">0 reviews</span>);
    }

    else{
      return(
        <>
          <StarRating rating={restaurant.average_rating} />
          <span className="text-warning ml-1">({restaurant.count})</span>
        </>
      );
    }
  };

  return (
    <div className='list-group'>
        <table className="table table-hover table-dark">
            <thead>
                <tr className="tg-binary">
                    <th scope='col'>Restaurant</th>
                    <th scope='col'>Location</th>
                    <th scope='col'>Price Range</th>
                    <th scope='col'>Ratings</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map(restaurant => {
                    return(
                        <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>{renderRating(restaurant)}</td>
                            <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button></td>
                            <td><button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  )
};

export default RestaurantList;