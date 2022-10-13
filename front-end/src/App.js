import React, { useEffect, useState } from "react";
import "./App.css";
import Elek from "./components/Elek";

function App() {
  const [fetchData, setFetchData] = useState([]);
  const [rerender, setRerender] = useState();
  const [taskUpdate, setTaskupdate] = useState(false);
  const [addText, setAddText] = useState("");
  const [update, setUpdate] = useState(false);
  const createTask = (task) => {
    fetch("http://localhost:6789/tasks", {
      method: "POST",
      body: JSON.stringify({ title: task }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(setAddText(""))
      .then(setUpdate(update === true ? false : true));
  };

  const deleteTask = (id) => {};

  useEffect(() => {
    fetch("http://127.0.0.1:6789/tasks", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setFetchData(data))
      .then(setRerender(false));
  }, [update]);

  useEffect(() => {
    console.log(fetchData);
    setRerender(true);
  }, [fetchData]);

  return (
    <>
      <h1>ToDo List</h1>
      <div id="menu">
        <label>Your new to-do</label>
        <input
          type="text"
          value={addText}
          placeholder="enter new task"
          onChange={(e) => {
            setAddText(e.target.value);
          }}
        />
        <button
          onClick={() => {
            addText.length !== 0 && createTask(addText);
          }}
        >
          add task
        </button>
      </div>
      <div id="list">
        <div>
          {rerender === true &&
            fetchData.map((element) => (
              <Elek
                text={element.title}
                setUpdate={setUpdate}
                update={update}
                id={element.id}
              />
            ))}
          <br></br>
        </div>
      </div>
    </>
  );
}

export default App;
