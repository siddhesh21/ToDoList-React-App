import React, { useState, useEffect } from "react";
import "./App.css";
import TypeWriter from "react-typewriter";
import FlipMove from "react-flip-move";
// Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  // State stuff
  const [quote, setQuote] = useState("");
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Hook for  Quotes
  useEffect(() => {
    const fetchQuote = async () =>
      await fetch(`https://api.quotable.io/random`)
        .then((response) => response.json())
        .then((data) => {
          setQuote(data.content);
          console.log(data.content);
          // setQuote(`${data.content} - ${data.author}`);
          // console.log(`${data.content} - ${data.author}`);
        });
    // .catch((error) => console.log(error));

    fetchQuote();
  }, []);

  //Run Only Once when App starts
  useEffect(() => {
    getLocalTodos();
  }, []);
  // Use Effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
    // eslint-disable-next-line
  }, [todos, status]);

  // It's throwing error due to it's separated or you can insert above in useEffec()
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
    <div className="app">
      <h1 className="responsive__header">
        <TypeWriter className="responsive__header" typing={0.5}>
          Siddhesh's ToDo List
        </TypeWriter>
      </h1>
      <center>
        <h2>The Quote of the Day</h2>
        <h2>{quote}</h2>
      </center>
      <br /> <br />
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
        status={status}
      />
      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
}

export default App;
