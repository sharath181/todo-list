import React, { Fragment, useEffect, useState } from 'react';

const ListTodo = () => {

    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState("");

    const getTodos = async () => {
        try {

            const response = await fetch("http://localhost:7210/all");
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const markAsDone = async (todo, flag) => {
        todo.is_done = flag;

        update(todo);
    }

    const update = async (todo) => {
        try {
            const body = {
                "description": todo.description,
                "is_done": todo.is_done,
                "is_deleted": false
            };
            // console.log(body);
            const response = await fetch("http://localhost:7210/update?id=" + todo.id, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, [todos]);


    const displayDescription = (todo) => {
        if (todo.is_done) {
            return (<td><strike>{todo.description}</strike></td>);
        } else {
            return (<td>{todo.description}</td>);
        }
    }

    const displayDone = (todo) => {
        if (todo.is_done) {
            return (<td><button className='btn btn-danger' onClick={() => markAsDone(todo, !todo.is_done)}>Mark as Not Done</button></td>);
        } else {
            return (<td><button className='btn btn-primary' onClick={() => markAsDone(todo, !todo.is_done)}>Mark as Done</button></td>);
        }
    }

    const onAdd = async e => {
        try {
            const body = { description };
            const response = await fetch("http://localhost:7210/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            setDescription("");
        } catch (err) {
            console.error(err.message);
        }
    }

    const displayAdd = () => {
        if (description.length > 0) {
            return (<button className='btn btn-success' onClick={onAdd}>Add</button>);
        } else {
            return (<button className='btn btn-success' onClick={onAdd} disabled={true}>Add</button>);
        }
    }

    return (
        <Fragment>
            <Fragment>
                <h1 className='text-center mt-5'>Type here to add</h1>
                <div className='d-flex mt-5'>
                <input type="text" className='form-control' value={description} onChange={e => setDescription(e.target.value)} />
                {displayAdd()}
                </div>
            </Fragment>
            <Fragment>
                <h1 className='mt-5'>List</h1>
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>Description</th>
                            {/* <th>Edit</th> */}
                            <th>Mark as Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(todo => (
                            <tr key={todo.id}>
                                {displayDescription(todo)}
                                {/* <EditTodo /> */}
                                {displayDone(todo)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        </Fragment>
    );
}

export default ListTodo;