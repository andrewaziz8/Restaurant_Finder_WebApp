import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = () => {
  const {id} = useParams(); // This will pass all the parameters in the URL
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price_range, setPriceRange] = useState("");

  useEffect(()=> {
      const FetchData = async () => { //fetch restaurant so that if user open the link directly he can open page without errors.
          try{
              const response = await RestaurantFinder.get(`/${id}`); //This will return a promise so we need to put it in await and async
              setName(response.data.data.restaurants.name);
              setLocation(response.data.data.restaurants.location);
              setPriceRange(response.data.data.restaurants.price_range);
          }
          catch(err){
              console.log(err);
          }  
      };
      FetchData();//Instead of making the function directly passed to useEffect asynchronous, define an inner async function (fetchData).
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await RestaurantFinder.put(`/${id}`, {
            name:name,
            location:location,
            price_range:price_range
        });
        navigate("/");
    }
    catch(err){
        console.log(err);
    }
  };

  return (
    <div>
        <form action="">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} id="name" className='form-control' type="text" />
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input value={location} onChange={e => setLocation(e.target.value)} id="location" className='form-control' type="text" />
            </div>

            <div className="form-group">
                <label htmlFor="price_range">Price Range</label>
                <input value={price_range} onChange={e => setPriceRange(e.target.value)} id="price_range" className='form-control' type="number" />
            </div>

            <button onClick={handleSubmit} type='submit' className='btn btn-primary'>Submit</button>
        </form>
    </div>
  )
};

export default UpdateRestaurant;