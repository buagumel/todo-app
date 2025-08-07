
import { Pool } from "pg"; 

const pool = new Pool({
  
    user: "postgres",
    host: "localhost",
    database: "perntodo",
    password: "2020",
    port: 5432,
});


export { pool };
      
