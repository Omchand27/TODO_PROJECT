import { useEffect, useState } from "react";
import axios from "axios";

function Todo({ setToken }) {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    const res = await axios.get(
      "https://todo-project-3xhb.onrender.com/api/todos",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title) return;

    await axios.post(
      "https://todo-project-3xhb.onrender.com/api/todos",
      { title },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(
      `https://todo-project-3xhb.onrender.com/api/todos/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    fetchTodos();
  };

  const editTodo = async (id) => {
    const updatedTitle = prompt(
      "Enter new title"
    );

    if (!updatedTitle) return;

    await axios.put(
      `https://todo-project-3xhb.onrender.com/api/todos/${id}`,
      { title: updatedTitle },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    fetchTodos();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow:
            "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1>Todo Dashboard</h1>

          <button
            onClick={logout}
            style={{
              padding: "10px 15px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Enter todo"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            style={{
              flex: 1,
              padding: "12px",
              border:
                "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />

          <button
            onClick={addTodo}
            style={{
              padding: "12px 20px",
              backgroundColor:
                "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Todo
          </button>
        </div>

        {todos.length === 0 ? (
          <p>No Todos Found</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              style={{
                backgroundColor:
                  "#f9f9f9",
                padding: "15px",
                borderRadius: "5px",
                marginBottom: "10px",
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <h3>{todo.title}</h3>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() =>
                    editTodo(todo._id)
                  }
                  style={{
                    padding:
                      "8px 12px",
                    backgroundColor:
                      "orange",
                    color: "white",
                    border: "none",
                    borderRadius:
                      "5px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteTodo(todo._id)
                  }
                  style={{
                    padding:
                      "8px 12px",
                    backgroundColor:
                      "red",
                    color: "white",
                    border: "none",
                    borderRadius:
                      "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Todo;