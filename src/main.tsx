import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TodoList from "./pages/todoList/TodoList.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="content">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </div>
  </StrictMode>,
);
