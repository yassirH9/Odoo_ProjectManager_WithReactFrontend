import React, { useState, useEffect } from "react";
import TaskDataService from "../services/TaskService";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [task, settask] = useState([]);
  const [currentTask, setcurrentTask] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrievetask();
  }, []);

  const retrievetask = () => {
    TaskDataService.getAll()
      .then(response => {
        settask(response.data.result.response);
        console.log(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievetask();
    setcurrentTask(null);
    setCurrentIndex(-1);
  };

  const setActiveBicycle = (task, index) => {
    setcurrentTask(task);
    setCurrentIndex(index);
  };

  const removetask = (id) => {
    TaskDataService.remove(id)
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Task List</h4>

        <ul className="list-group">
          {task &&
            task.map((task, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBicycle(task, index)}
                key={index}
              >
                <div className="extra-data">
                <h4>{task.name}</h4>
                <span>
                  <p>Stage: {task.stage}</p>
                  <p>Status: {task.status}</p>
                </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentTask ? (
          <div>
            <h4>Task</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentTask.name}
            </div>
            <div>
              <label>
                <strong>Stage:</strong>
              </label>{" "}
              {currentTask.stage}
            </div>
            <div>
              <label>
                <strong>Project name:</strong>
              </label>{" "}
              {currentTask.project}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTask.status}
            </div>
            <div>
              <label>
                <strong>User:</strong>
              </label>{" "}
              {currentTask.user}
            </div>
            <Link to={"/app/task/" + currentTask.id} className="badge badge-warning">Edit</Link>
            <br/>
            <button className="badge badge-danger" onClick={() => removetask(currentTask.id)}>Remove</button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Bicycle...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
