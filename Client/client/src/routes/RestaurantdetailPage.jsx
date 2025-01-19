import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';

const RestaurantdetailPage = () => {
  const {id} = useParams();
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

  useEffect(()=> {
    const FetchData = async () => { //fetch restaurant so that if user open the link directly he can open page without errors.
        try{
            const response = await RestaurantFinder.get(`/${id}`); //This will return a promise so we need to put it in await and async
            setSelectedRestaurant(response.data.data);
        }
        catch(err){
            console.log(err);
        }  
    };
    FetchData();//Instead of making the function directly passed to useEffect asynchronous, define an inner async function (fetchData).
  }, []);

  return (
    <div>
        {selectedRestaurant && (
          <>
            <h1 className='text-center display-1'>{selectedRestaurant.restaurants.name}</h1>
            <div className="text-center">
              <StarRating rating={selectedRestaurant.restaurants.average_rating} />
              <span className="text-warning ml-1">
                {selectedRestaurant.restaurants.count ? `(${selectedRestaurant.restaurants.count})`: "(0)"}
              </span>
            </div>
            <div className="mt-3">
              <Reviews reviews={selectedRestaurant.reviews}/>
            </div>
            <AddReview />
          </>
        )}
    </div>
  )
};

export default RestaurantdetailPage;