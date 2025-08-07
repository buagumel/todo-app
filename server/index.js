import express from 'express';
import cors from 'cors';
import pg from 'pg';

const db = new pg.Client({
    user: "todoapp_38in_user",
    host: "dpg-d2acqe15pdvs73al1jh0-a",
    database: "todoapp_38in",
    password: "QZ6ghJjTjPbAp0LgypiZeRpeH55y30P2",
    port: 5432,
});

db.connect();


const app = express();
const PORT = process.env.PORT || 100000;  


//middleware
app.use(express.json());
app.use(cors());
app.use(express.json());




// Routes

//Create

app.post('/todo', async (req, res)=>{
  try {

    const {description}= req.body;  

    
    const newTodo= await db.query(
      "INSERT INTO todos (description) VALUES ($1) RETURNING *", [description]
    );

    res.json(newTodo);

  }catch (err){
    console.error(err.message);
    
  }
});


//get all todos

app.get('/todos', async(req, res)=>{
  try {
    const allTodos = await db.query("SELECT * FROM todos");

  res.json(allTodos.rows)
  } catch (error) {
    console.log(error.message)
  }
});

//get specific todo
app.get('/todos/:id', async(req, res)=>{

  try {
    const {id} = req.params;

  const todo = await db.query("SELECT * FROM todos WHERE todo_id=$1", [id]);

  res.json(todo.rows[0]);
    
  } catch (error) {

    console.log(error.message)
    
  }
  
})


//update todo

app.put('/todos/:id', async(req, res)=>{
  try {

    const {id} = req.params;
    const {description} = req.body;

    const updateTodo = await db.query("UPDATE todos SET description=$1 WHERE todo_id=$2", [description, id]);

    res.json("Updated successfully")

      } catch (error) {
    
  }
});



    //delete todo

    app.delete('/todos/:id', async(req, res)=>{
      try {

        const {id} = req.params;

        const deleteTodo= await db.query("DELETE FROM todos WHERE todo_id = $1", [id]);

          res.json('Deleted successfully')
  
    
        
      } catch (error) {
        console.log(error.message);
        
        
      }
  })


    





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


