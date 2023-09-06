import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [todos, settodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [popupActive, setPopupActive] = useState(false);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE}/todos`);
    const { data } = res;
    console.log(data);
    settodos(data.todo);
  };

  const completeTodo = async (id) => {
    const data = await axios.get(`${import.meta.env.VITE_API_BASE}/todos/complete/${id}`);
    settodos((todos) =>
      todos.map((todo) => {
        if (todo.id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };
 const text = {
  newTodo
 }
  const addTodo = async () => {
    const val =  await axios .post(`${import.meta.env.VITE_API_BASE}/todos/new`, text)
    const {data} = val; 
    settodos([...todos,data])

    console.log(data);
    setPopupActive(false);
    setNewTodo("");
  };
  const deleteTodo = async (id) => {
    const data = await axios.delete(
      `${import.meta.env.VITE_API_BASE}/todos/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    settodos((todos) => todos.filter((todo) => todo._id !== data._id));
  };

  return (
    <div className="App">
      <h1>Welcome, Prince</h1>
      <h4>Your tasks</h4>

      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              className={"todo" + (todo.complete ? " is-complete" : "")}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div className="checkbox"></div>

              <div className="text">{todo.text}</div>

              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
                x
              </div>
            </div>
          ))
        ) : (
          <p>You currently have no tasks</p>
        )}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              name="text"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
