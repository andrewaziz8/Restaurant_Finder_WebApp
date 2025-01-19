const { Pool } = require("pg");
 
// const pool = new Pool({
//     user: 'postgres',
//     password: 'P@$$w0rd@#$7',
//     host: 'localhost',
//     port: 5432,
//     database: 'yelp',
// });

const pool = new Pool(); // we can just call this without specifying user and so on because we are using environment variables
 
// export const query = (text, params) => pool.query(text, params);
module.exports = {
    query: (text, params) => pool.query(text, params),
};
