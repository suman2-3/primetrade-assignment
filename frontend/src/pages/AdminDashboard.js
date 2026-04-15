import { useEffect, useState } from "react";
import API, { getUserRole } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all tasks (admin)
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks"); // assumes admin gets all
      setTasks(res.data);
    } catch (err) {
      setError("Failed to load tasks");
    }
  };

  // Role check
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const role = getUserRole();

    if (role !== "admin") {
      navigate("/dashboard"); // redirect user
      return;
    }

    fetchTasks();
  }, [navigate]);

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError("Delete failed");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="admin-container">
      <div className="admin-box">

        {/* 🔹 Top */}
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <p className="subtitle">Manage all users' tasks</p>

        {error && <p className="error">{error}</p>}

        {/*  Task List */}
        <div className="admin-task-list">
          {tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            tasks.map((task) => (
              <div className="admin-task-card" key={task._id}>
                <div>
                  <strong>{task.title}</strong>
                  <p className="email">
                    {task.user?.email || "Unknown User"}
                  </p>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}