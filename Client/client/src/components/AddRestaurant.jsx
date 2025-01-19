import React, { useContext, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
  const {restaurants, setRestaurants} = useContext(RestaurantsContext); //added
//   const {addRestaurant} = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price_range, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault(); //by default page loads so to prevent the page from reloading so that we do not lose the state (name, location and so on)
    try{
        const response = await RestaurantFinder.post("/", {
            name: name,
            location: location,
            price_range: price_range
        });
        setRestaurants([...restaurants, response.data.data.restaurants]); //added
        // addRestaurant(response.data.data.restaurants);
        // console.log(response);
    }
    catch(err){
        console.log(err);
    }
  };

  return (
    <div className='mb-4'>
        <form action=''>
            <div className='form-row'>
                <div className='col'>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" className='form-control' placeholder='name'/>
                </div>
                <div className="col">
                    <input value={location} onChange={e => setLocation(e.target.value)} type="text" className='form-control' placeholder='location'/>
                </div>
                <div className="col">
                    <select value={price_range} onChange={e => setPriceRange(e.target.value)} className='custom-select my-1 mr-sm-2'>
                        <option disabled> Price Range</option>
                        <option value='1'> $ </option>
                        <option value='2'> $$ </option>
                        <option value='3'> $$$ </option>
                        <option value='4'> $$$$ </option>
                        <option value='5'> $$$$$ </option>
                    </select>
                </div>
                <button onClick={handleSubmit} type='submit' className='btn btn-primary'> Add </button>
            </div>
        </form>
    </div>
  )
};

export default AddRestaurant;