import React, { Fragment, useState, useEffect } from 'react';
import { Button, Container, Segment, Header, Icon, Input, List, Divider } from 'semantic-ui-react';

const TodoListComponent = () => {

    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState("");


    useEffect(() => {
        getTodos();
    }, [todos]);

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

        updateTodo(todo, false);
    }

    const updateTodo = async (todo, is_deleted) => {
        try {
            const body = {
                "description": todo.description,
                "is_done": todo.is_done,
                "is_deleted": is_deleted
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


    const displayItem = (todo) => {
        if (todo.is_done) {
            return (
                <List.Item>
                    <List.Content floated='right'>
                        <Button color='red' icon labelPosition='right' size='mini' onClick={() => markAsDone(todo, !todo.is_done)}>
                            Undo
                            <Icon name='minus square' />
                        </Button>
                        <Button color='black' basic icon size='mini' onClick={() => updateTodo(todo, true)}>
                            <Icon name='times circle outline' />
                        </Button>
                    </List.Content>
                    <List.Content>
                        <Header as='h4' color='grey'>
                            <strike>{todo.description}</strike>
                        </Header>
                    </List.Content>
                </List.Item>
            )
        } else {
            return (
                <List.Item>
                    <List.Content floated='right'>
                        <Button color='green' icon labelPosition='right' size='mini' onClick={() => markAsDone(todo, !todo.is_done)}>
                            Done
                            <Icon name='check square' />
                        </Button>
                        <Button color='black' icon basic size='mini' onClick={() => updateTodo(todo, true)}>
                            <Icon name='times circle outline' />
                        </Button>
                    </List.Content>
                    <List.Content>
                        <Header as='h4'>
                            {todo.description}
                        </Header>
                    </List.Content>
                </List.Item>
            )
        }
    }

    const onAdd = async e => {
        try {
            const body = { description };
            console.log(body);
            console.log("ddbncd");
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
            return (
                <Button animated='fade' primary onClick={onAdd} size='huge'>
                    <Button.Content visible>Add</Button.Content>
                    <Button.Content hidden>
                        <Icon name='check' />
                    </Button.Content>
                </Button>
            )
        } else {
            return (
                <Button disabled size='huge'>Add</Button>
            )
        }
    }

    return (
        <Container textAlign='center'>
            <Header as='h1' textAlign='center' style={{ 'marginTop': '1em' }}>
                <Icon color='yellow' name='sticky note outline' />
                <Header.Content>Todo App</Header.Content>
            </Header>
            <Segment style={{ 'marginTop': '2em' }} textAlign='center'>

                <div>
                    <Input transparent style={{ 'marginTop': '2em' }}
                        placeholder='Type Something to Add..'
                        size='massive'
                        value={description} onChange={e => setDescription(e.target.value)} />
                    {displayAdd()}
                </div>


                <div>
                    <Header as='h3' textAlign='center' style={{ 'marginTop': '4em' }}>
                        <Icon name='tasks' />
                        <Header.Content>Here are the Todos to complete</Header.Content>
                    </Header>
                    <Divider />
                </div>

                <div>
                    <List divided relaxed style={{ 'marginTop': '2em' }}>
                        {todos.map(todo => (
                            displayItem(todo)
                        ))}

                    </List>
                </div>

            </Segment>
        </Container>
    );
}

export default TodoListComponent;