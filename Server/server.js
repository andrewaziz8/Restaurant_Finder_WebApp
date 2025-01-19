require("dotenv").config(); //required for ports (enviroment variables)
const cors = require("cors"); //to make application accessable to other domains. A middleware.
const express = require("express");
const morgan = require("morgan"); // for a built-in middle ware functions
const dp = require("./db"); // for database
const app = express();

// // Creating middle ware function. This will be the first middle ware and then the second will be the route handlers
// app.use((req, res, next) => { // we use next to point to the next middle ware which is the route handlers here
//     console.log("yeah our middle ware in");
//     next();

//     // //OR
//     // res.status(404).json({
//     //     status: "Failed Try Again"
//     // });
// });

// //use morgan middle ware function
// app.use(morgan("tiny")); // tiny or dev

//MiddleWare
app.use(cors());
// A built in middle ware to handle the body in post and put method. To make req.body defined
app.use(express.json());


// GET, POST, PUT are all route handlers (routes). Route Handlers also considered middle ware but it is the last middle ware in the chain of middle wares

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    // console.log("get all restaurants");
    // res.send("These are the restaurants");
    try{
        const results = await dp.query("SELECT res.id, res.name, res.location, res.price_range, COUNT(rev.rating), TRUNC(AVG(rev.rating), 1) as average_rating FROM restaurants as res LEFT JOIN reviews as rev ON res.id=rev.restaurant_id GROUP BY res.id ORDER BY res.id");
        // console.log(results);

        res.json({
            status: "Success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        });
    }
    catch(err){
        console.log(err);
    }
});

// get a individual restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    // console.log(req.params);
    try{
        // const results = await dp.query(`SELECT * FROM restaurants WHERE id = ${req.params.id}`); //this one is not secure. SQL injection
        const restaurant = await dp.query("SELECT res.id, res.name, res.location, res.price_range, COUNT(rev.rating), TRUNC(AVG(rev.rating), 1) as average_rating FROM restaurants as res LEFT JOIN reviews as rev ON res.id=rev.restaurant_id WHERE res.id=$1 GROUP BY res.id ORDER BY res.id", [req.params.id]); // more secure. paramaterized query
        const reviews = await dp.query("SELECT * FROM reviews WHERE restaurant_id = $1", [req.params.id]);
        // console.log(results.rows[0]);

        res.status(200).json({
            status: "Success",
            data: {
                restaurants: restaurant.rows[0],
                reviews: reviews.rows
            }
        });

    }
    catch(err){
        console.log(err);
    }
});

//Create a restaurant. We need a middle ware here to handle the body in this post method
app.post("/api/v1/restaurants", async (req, res) => {
    // console.log(req.body);
    try{
        const results = await dp.query("INSERT INTO restaurants (name, location, price_range) values ($1,$2,$3) RETURNING *", [req.body.name,req.body.location,req.body.price_range]); //we add returning * to return an output to the results
        // console.log(results.rows[0]);

        res.status(201).json({
            status: "Success",
            data: {
                restaurants: results.rows[0]
            }
        });

    }
    catch(err){
        console.log(err);
    }
});

// Update restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body);
    try{
        const results = await dp.query("UPDATE restaurants SET name=$1,location=$2,price_range=$3 WHERE id=$4 RETURNING *", [req.body.name,req.body.location,req.body.price_range,req.params.id]);
        // console.log(results.rows[0]);

        res.status(200).json({
            status: "Success",
            data: {
                restaurants: results.rows[0]
            }
        });
    }
    catch(err){
        console.log(err);
    }
});

//Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try{
        const results = await dp.query("DELETE FROM restaurants WHERE id=$1", [req.params.id]);
        res.status(204).json({
            status: "Success"
        });
    }
    catch(err){
        console.log(err);
    }
});

//Create a review in the reviews table. We need a middle ware here to handle the body in this post method
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try{
        const results = await dp.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1,$2,$3,$4) RETURNING *", [req.params.id,req.body.name,req.body.review,req.body.rating]); //we add returning * to return an output to the results

        res.status(201).json({
            status: "Success",
            data: {
                reviews: results.rows[0]
            }
        });

    }
    catch(err){
        console.log(err);
    }
});


const port = process.env.PORT || 3000; //so that if PORT undefiend then use port 3000
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});