import Project from "../models/Project.js";

// Create Project
export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      owner: req.user._id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get All Projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user._id,
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Project
export const updateProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    project.title = title || project.title;
    project.description = description || project.description;

    const updatedProject = await project.save();

    res.status(200).json(updatedProject);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      message: "Project deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};