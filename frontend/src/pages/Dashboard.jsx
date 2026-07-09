import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

    // Input fields clear
    setTitle("");
    setDescription("");

    // Refresh project list
    fetchProjects();

    alert("Project Created Successfully!");
  } catch (error) {
    alert(error.response?.data?.message || "Failed to create project");
  }
};
  useEffect(() => {
    fetchProjects();
  }, []);

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
          style={{
            marginRight: "10px",
            padding: "8px",
            width: "220px",
      }}
     />

     <input
    type="text"
    placeholder="Task Description"
    style={{
      marginRight: "10px",
      padding: "8px",
      width: "250px",
    }}
  />

  <button>Create Task</button>
</div>

<ul>
  <li>Design Dashboard - Todo</li>
</ul>
    </div>
  );
}

export default Dashboard;