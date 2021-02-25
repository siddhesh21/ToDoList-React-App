import React, { useState, useEffect } from "react";
import "./App.css";
import TypeWriter from "react-typewriter";
import FlipMove from "react-flip-move";

// Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  // State stuff
  const [inputText, setInputText] = useState("");

  const [todos, setTodos] = useState([]);

  const [status, setStatus] = useState("all");

  const [filteredTodos, setFilteredTodos] = useState([]);

  //Run Only Once when App starts
  useEffect(() => {
    getLocalTodos();
  }, []);
  // Use Effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  // It's throwing error due to it's seperated or you can insert above in useEffec()
  // Functions
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //Save to Local storage
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <h1 className="responsive__header">
        <TypeWriter className="responsive__header" typing={0.5}>
          Siddhesh's ToDo List
        </TypeWriter>
      </h1>

      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
        status={status}
      />
      {/* <FlipMove> */}
      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />

      {/* </FlipMove> */}
    </div>
  );
}

export default App;
