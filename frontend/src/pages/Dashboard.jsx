import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/projects",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");

      fetchProjects();

      alert("Project Created Successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create project");
    }
  };
   const createTask = async () => {
  try {
    if (!selectedProject) {
      alert("Please select a project");
      return;
    }

    const token = localStorage.getItem("token");
     console.log("Task Data:", {
        title: taskTitle,
       description: taskDescription,
        project: selectedProject,
     });
    await API.post(
      "/tasks",
      {
        title: taskTitle,
        description: taskDescription,
        project: selectedProject,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Task Created Successfully!");
    fetchTasks();
    setTaskTitle("");
    setTaskDescription("");
    setSelectedProject("");

  } catch (error) {
    alert(error.response?.data?.message || "Failed to create task");
  }
};
 
    const fetchTasks = async () => {
  try {
    if (!selectedProject) return;

    const token = localStorage.getItem("token");

    const res = await API.get(
      `/tasks/project/${selectedProject}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTasks(res.data);
  } catch (error) {
    console.log(error);
  }
}; 
    const updateTaskStatus = async (taskId, status) => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
      `/tasks/${taskId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchTasks();
  } catch (error) {
    alert(error.response?.data?.message || "Failed to update task");
  }
};
   const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem("token");

    await API.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Task Deleted Successfully!");

    fetchTasks();
  } catch (error) {
    alert(error.response?.data?.message || "Failed to delete task");
  }
};
   useEffect(() => {
  fetchProjects();
}, []);

useEffect(() => {
  if (selectedProject) {
    fetchTasks();
  }
}, [selectedProject]);
  return (
    <div style={{ padding: "30px" }}>
      <h1>Project Management Dashboard</h1>

      <hr />

      <h2>Projects</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            marginRight: "10px",
            padding: "8px",
            width: "220px",
          }}
        />

        <input
          type="text"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            marginRight: "10px",
            padding: "8px",
            width: "250px",
          }}
        />

        <button onClick={createProject}>
          Create New Project
        </button>
      </div>

      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <strong>{project.title}</strong>
            <br />
            {project.description}
          </li>
        ))}
      </ul>

      <hr />

      <h2>Tasks</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          style={{
            marginRight: "10px",
            padding: "8px",
            width: "220px",
          }}
        />

        <input
          type="text"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          style={{
            marginRight: "10px",
            padding: "8px",
            width: "250px",
          }}
        />

        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          style={{
            marginRight: "10px",
            padding: "8px",
            width: "220px",
          }}
        >
          <option value="">Select Project</option>

          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.title}
            </option>
          ))}
        </select>

        <button onClick={createTask}>
           Create Task
        </button>
      </div>

     <ul>
       {tasks.length === 0 ? (
         <li>No tasks yet</li>
        ) : (
          tasks.map((task) => (
            <li key={task._id} style={{ marginBottom: "15px" }}>
               <strong>{task.title}</strong>

               <br />

               {task.description}

               <br />
               <br />

               <select
                  value={task.status}
                  onChange={(e) =>
                      updateTaskStatus(task._id, e.target.value)
                 }
                 style={{
                    padding: "5px",
                    marginRight: "10px",
               }}
              >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>

                <button
                   onClick={() => deleteTask(task._id)}
                   style={{
                      backgroundColor: "red",
                     color: "white",
                      border: "none",
                      padding: "6px 12px",
                     borderRadius: "5px",
                     cursor: "pointer",
                }}
               >
                 Delete
                </button>
           </li>
           ))
         )}
      </ul>
    </div>
  );
}

export default Dashboard;