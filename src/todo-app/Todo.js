import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import useLocalStorage from "./useLocalStorage";

const Todo = () => {
  // custom hook
  const { getLocalData, setLocalData } = useLocalStorage();

  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);

  const handleChange = (event) => {
    // console.log(event.target.value);
    setTodo(event.target.value);
  };

  const handleSubmit = () => {
    // setTodos((prevTodo) => [...prevTodo, todo]);
    const newTodos = [
      ...todos,
      {
        id: Date.now(),
        todo,
      },
    ];
    setTodos(newTodos);
    setLocalData("todos", JSON.stringify(newTodos));
  };

  const handleDelete = (todoValue) => {
    const filterTodos = todos.filter((todo) => todo.id !== todoValue);
    setLocalData("todos", JSON.stringify(filterTodos));
    setTodos(filterTodos);
  };

  useEffect(() => {
    const localTodos = getLocalData("todos");
    setTodos(JSON.parse(localTodos));
  }, []);

  return (
    <>
      <Container>
        <div className="col-lg-6 offset-md-3">
          <h1 className="m-4">Todo App</h1>

          <InputGroup className="m-3">
            <Form.Control
              value={todo.todo}
              placeholder="Enter a Todo list ..."
              onChange={handleChange}
            />
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </InputGroup>

          <ListGroup className="my-5" as="ol" numbered>
            {todos.map((todo) => {
              return (
                <ListGroup.Item
                  key={todo.id}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{todo.todo}</div>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </Button>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </Container>
    </>
  );
};

export default Todo;
