import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import api from "./axioxConfig/index";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editedTodo, setEditedTodo] = useState("");
  const [editingIdTodo, setEditingIdTodo] = useState("");
  console.log(todos, "todos", newTodo, "newTodo");
  async function getTodos() {
    try {
      const response = await api.get("/todo/get-todos");
      if (response.data.success) {
        setTodos(response.data.todos);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    }
  }
  async function CreateTodo() {
    try {
      const response = await api.post("/todo/create-todo", {
        text: newTodo,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setTodos(response.data.allTodos);
        setNewTodo("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    }
  }
  async function DeleteTodo(id) {
    try {
      const response = await api.post("/todo/delete-todo", { todoId: id });
      if (response.data.success) {
        toast.success(response.data.message);
        setTodos(response.data.allTodos);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
  async function EditTodo() {
    try {
      const response = await api.post("/todo/edit-todo", {
        todoId: editingIdTodo,
        newTodoText: editedTodo,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setTodos(response.data.allTodos);
        setEditingIdTodo("");
        setEditedTodo("");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
  function handleEdit(id) {
    setEditingIdTodo(id);
  }
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className="App">
      <h1>Todo</h1>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />{" "}
      <br />
      <button onClick={CreateTodo}>Add todo.</button>
      <br />
      {/* map todos here */}
      {todos.length > 0 &&
        todos.map((todo, i) => (
          <>
            {editingIdTodo === todo._id ? (
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  border: "2px solid black",
                  margin: "auto",
                  justifyContent: "space-around",
                }}
              >
                {i + 1}.
                <input
                  value={editedTodo}
                  placeholder={todo.text}
                  type="text"
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
                <button onClick={EditTodo}>Submit edited todo.</button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  border: "2px solid black",
                  margin: "auto",
                  justifyContent: "space-around",
                }}
                key={todo._id}
              >
                <p style={{ width: "50%" }}>
                  {i + 1}. {todo.text}
                </p>
                <button
                  style={{ width: "20%" }}
                  onClick={() => handleEdit(todo._id)}
                >
                  Edit
                </button>
                <button
                  onClick={() => DeleteTodo(todo._id)}
                  style={{ width: "20%" }}
                >
                  Delete
                </button>
              </div>
            )}
          </>
        ))}
    </div>
  );
}

export default App;
