import React, { useState, useEffect } from "react";
import TaskDataService from "../services/TaskService";
import { Navigate, Router, useNavigate } from "react-router-dom";

const Addtask = () => {
  const initialtaskState = {
    id: null,
    name: "",
    stage_id: 0,
    pname: "",
    status: "",
    status_id: "",
    user: "",

  };
  const initialTaskData = {
    project: "",
    user: "",
  }
  const [task, settask] = useState(initialtaskState);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOptionStage, setselectedOptionStage] = useState('');
  const [selectedOptionStatus, setselectedOptionStatus] = useState('');
  const [nonSelectedData, setNonSelectedData] = useState(initialTaskData);

  useEffect(()=>{
    getTask();
  },[]);

  const getTask = () => {
    TaskDataService.getAll()
    .then(response => {
      setNonSelectedData(prevState => ({
        ...prevState,
        project: response.data.result.response[1].project,
        user: response.data.result.response[1].user,
      }));
      console.log(response.data.result.response);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const navigate = useNavigate();
  const savetask = () => {
    console.log("data to send");
    console.log(task);
    TaskDataService.create(task)
      .then(response => {
        setSubmitted(true);

        navigate('/app/task');
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    switch (task.stage) {
      case "Sin iniciar":
        setselectedOptionStage(1)
        settask({ ...task, stage_id: parseInt(1) });
        break;
      case "En progreso":
        setselectedOptionStage(2)
        settask({ ...task, stage_id: parseInt(2) });
        break;
      case "Bloqueado":
        setselectedOptionStage(3)
        settask({ ...task, stage_id: parseInt(3) });
        break;
      case "Terminado":
        setselectedOptionStage(4)
        settask({ ...task, stage_id: parseInt(4) });
        break;
      case "Revisado":
        setselectedOptionStage(5)
        settask({ ...task, stage_id: parseInt(5) });
        break;
      default:
        break;
    }
  }, [task.stage]);
  useEffect(() => {
    switch (task.status) {
      case "En progreso":
        setselectedOptionStatus(1)
        break;
      case "Sin asignar":
        setselectedOptionStatus(2)
        break;
      case "Preparado":
        setselectedOptionStatus(3)
        break;
      case "Bloqueada":
        setselectedOptionStatus(4)
        break;
      case "Atrasada":
        setselectedOptionStatus(5)
        break;
      default:
        break;
    }
  }, [task.status]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    settask({ ...task, [name]: value });
  };
  const handleSelectChangeStage = (event) => {
    settask({ ...task, stage_id: parseInt(event.target.value) });
    setselectedOptionStage(event.target.value);
  };
  const handleSelectChangeStatus = (event) => {
    // settask({ ...task, status: event.target.value});
    switch (event.target.value) {
      case "1":
        settask({ ...task, status_id: "normal" });
        break;
      case "2":
        settask({ ...task, status_id: "sinasignar" });
        break;
      case "3":
        settask({ ...task, status_id: "done" });
        break;
      case "4":
        settask({ ...task, status_id: "blocked" });
        break;
      case "5":
        settask({ ...task, status_id: "atrasada" });
        break;
      default:
        break;
    }
    setselectedOptionStatus(event.target.value);
  };
  return (
    <div>
      {task ? (
        <div className="edit-form">
          <h4>Task</h4>
          <form>
            <div className="form-group">
              <label htmlFor="brand">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={task.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="model">Stage</label>
              <div>
                <label htmlFor="my-dropdown">Selecciona una opción: </label>
                <select id="my-dropdown" value={selectedOptionStage} onChange={handleSelectChangeStage}>
                  <option value="">-- Selecciona --</option>
                  <option value="1">Sin iniciar</option>
                  <option value="2">En progreso</option>
                  <option value="3">Bloqueado</option>
                  <option value="4">Terminado</option>
                  <option value="5">Revisado</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="model">Project Name</label>
              <input
                disabled
                type="text"
                className="form-control"
                id="pname"
                name="pname"
                value={nonSelectedData && nonSelectedData && nonSelectedData.project ? nonSelectedData.project : ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="model">Status</label>
              <div>
                <label htmlFor="my-dropdown">Selecciona una opción: </label>
                <select id="my-dropdown" value={selectedOptionStatus} onChange={handleSelectChangeStatus}>
                  <option value="">-- Selecciona --</option>
                  <option value="1">En progreso</option>
                  <option value="2">Sin asignar</option>
                  <option value="3">Preparado</option>
                  <option value="4">Bloqueada</option>
                  <option value="5">Atrasada</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="model">User</label>
              <input
                disabled
                type="text"
                className="form-control"
                id="user"
                name="user"
                value={nonSelectedData && nonSelectedData && nonSelectedData.user ? nonSelectedData.user : ''}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button
            type="submit"
            className="badge badge-success"
            onClick={savetask}
          >
            Create
          </button>
        </div>
      ) : (
        <div>
          <br />
          <p>Your task has been created</p>
        </div>
      )}
    </div>
  );
};

export default Addtask;
