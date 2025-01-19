import axios from "axios";//This imports the Axios library, which is used to handle HTTP requests like GET, POST, PUT, and DELETE.

export default axios.create({ //This allows other parts of your application to import and use this Axios instance for making HTTP requests without needing to specify the base URL every time.
    baseURL: "http://localhost:4000/api/v1/restaurants"
});

//axios.create(): This method creates a new Axios instance with default configuration options.