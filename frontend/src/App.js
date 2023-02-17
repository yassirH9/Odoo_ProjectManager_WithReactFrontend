import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Addtask from "./components/Addtask";
import TaskList from "./components/taskList";

import TaskService from "./services/TaskService";
import Task from "./components/Task";

function App() {

  useEffect(() => {
    let session_id = localStorage.getItem("session_id");
    if (!session_id) {
      TaskService.initSession().then(response => {
        localStorage.setItem("session_id", response.data.result.session_id.toString())
      })
      return
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/app/task" className="navbar-brand">
          <div className="l-logo" >
            <img src="/app/icon.png" alt="icon" />
          </div>
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/app/task"} className="nav-link">
              Task List
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/app/add"} className="nav-link">
              Add Task
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/app" element={<TaskList />} />
          <Route path="/app/task" element={<TaskList />} />
          <Route path="/app/add" element={<Addtask />} />
          <Route path="/app/task/:id" element={<Task />} />
          <Route path="/" element={<Navigate to="/app" />} />
          <Route path="*" element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
