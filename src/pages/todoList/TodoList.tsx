import { useEffect, useState } from "react";
import type { Todo } from "../../models/Todo";
import "./TodoList.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api/";

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const onLoad = async () => {
    const response = await axios.get<Todo[]>("/todos");
    const todos = response.data;
    setTodos(todos);
  };
  useEffect(() => {
    (async () => {
      onLoad();
    })();
  }, [setTodos]);

  const addButtonClick = async () => {
    const todo: Todo = {
      title: title,
      description: description,
    };
    await axios.post<number>("/todos", todo);
    await onLoad;
  };

  const deleteButtonClick = async (id: number) => {
    await axios.delete(`/todos/${id}`);
    await onLoad;
  };

  return (
    <>
      <h1>TODO App</h1>
      <div>
        <input
          type="test"
          className="title-textbox"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        Description:
        <input
          type="test"
          className="description-textbox"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <button className="add-btn" onClick={addButtonClick}>
          追加
        </button>
      </div>

      <div className="todo-area">
        <h2 className="todo-title">TODO List</h2>
        <ul className="todo-list">
          {todos.map((todo: Todo) => (
            <li key={todo.id}>
              {todo.title},{todo.description}{" "}
              <button
                onClick={() => {
                  deleteButtonClick(todo.id!);
                }}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TodoList;
