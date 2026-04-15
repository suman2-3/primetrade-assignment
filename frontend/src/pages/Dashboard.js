import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    fetchTasks();
  }, [navigate, fetchTasks]);

  const createTask = async () => {
    if (!title) return;
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };


  const toggleTask = async (id) => {
    await API.patch(`/tasks/${id}/toggle`);
    fetchTasks();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">

        {/* HEADER */}
        <div className="header">
          <h2>My Tasks</h2>
          <button
            className="logout"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>

        {/* INPUT */}
        <div className="input-group">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task..."
          />
          <button onClick={createTask}>Add</button>
        </div>

        {/* TASK LIST */}
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">

              <div className="left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task._id)}
                />

                <div>
                  <p className={task.completed ? "done" : ""}>
                    {task.title}
                  </p>
                  <small>
                    {new Date(task.createdAt).toLocaleString()}
                  </small>
                </div>
              </div>


            </div>
          ))}
        </div>

      </div>
    </div>
  );
}