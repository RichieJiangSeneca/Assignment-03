/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Siyang Jiang Student ID: 172747230 Date: Jun 21 2025
*
*  Published URL: ___________________________________________________________
*
********************************************************************************/


const express = require("express");
const path = require("path");
const app = express();

const projectData = require("./data/projectData.json");
const sectorData = require("./data/sectorData.json");

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views/about.html"));
});

app.get("/solutions/projects", (req, res) => {
    const { sector } = req.query;

    if (sector) {
        const filteredProjects = projectData.filter(p => p.sector_id === parseInt(sector));
        if (filteredProjects.length === 0) {
            return res.status(404).json({ error: "No projects found for this sector" });
        }
        return res.json(filteredProjects);
    }

    res.json(projectData);
});

app.get("/solutions/projects/:id", (req, res) => {
    const project = projectData.find(p => p.id === parseInt(req.params.id));

    if (!project) {
        return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views/404.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
