const express = require("express");
const cors = require("cors");

const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 7210;

app.listen(PORT, () => {
    console.log("Server is running on " + PORT);
});

app.post("/create", async (req, res) => {
    try {

        console.log(req.body);

        const { description } = req.body;
        const newTodo = await pool.query(" INSERT INTO todo (description, created_at, modified_at) VALUES ($1, current_timestamp, current_timestamp) RETURNING * ", [description]);
        console.log(description);

        res.json(newTodo);

    } catch (err) {
        console.error(err.message);
    }
});

app.get("/all", async (req, res) => {
    try {

        const allTodos = await pool.query(" SELECT id, description, is_done, created_at FROM todo WHERE is_deleted = false ORDER BY is_done, created_at ");

        res.json(allTodos.rows);

    } catch (err) {
        console.error(err.message);
    }
});

app.post("/update", async (req, res) => {
    try {

        id = req.query['id'];
        
        const { description, is_done, is_deleted } = req.body;

        console.log(description, is_done, is_deleted);

        const update_todo = await pool.query("UPDATE todo SET description = ($1), is_done = ($2), is_deleted = ($3), modified_at = current_timestamp WHERE id = ($4) RETURNING * ", [description, is_done, is_deleted, id]);
        
        res.json(update_todo.rows);

    } catch (err) {
        console.error(err.message);
    }
});

