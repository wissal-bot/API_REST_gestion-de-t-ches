//Configuration de l'application Express
//Importation des modules nécessaires
//Création du port 

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let tasks = [
    {id: 1, description: 'Faire les courses'},
    {id: 2, description: 'Apprendre API REST'},
];


//Définition des routes
//GET /tasks
//.map permet de parcourrir une liste et de faire une action précise sur chaque élément de la liste
app.get('/tasks', (req, res) => {
    const taskReferences = tasks.map(task => `/task/${task.id}`);
    res.json(taskReferences);
});

//Détails d'une tâche
app.get('/tasks/:id', (req, res) => {
const taskId = parseInt(req.params.id);
const task = tasks.find(task => task.id === taskId);
//Find recherche la tâche correspondante dans la liste des tâches (tasks)

//Si la tâche est trouvée, on renvoie la tâche description
if (task) {
    res.json(task);
//Sinon, on renvoie une erreur 404
} else {
    res.status(404).send('Task not found');
}
});

//Ajout d'une tâche
app.post('/tasks', (req, res) => {
const newTask = {
    id: nextId ,
//On incrémente la variable nextId pour avoir un id unique
    description: req.body.description,
};
nextId++;
//On ajoute la nouvelle tâche à la liste des tâches enprenant l'id initialisé à 3 et de l'incrémenter sans prédéfinir l'Id
tasks.push(newTask);
res.status(201).json({message : 'Task created',task: newTask});
})
//On initialise la variable nextId à 3 car les deux premières tâches sont déjà créées
let nextId = 3;

//Modification d'une tâche
//Il va contenir la description de la tâche à modifier
app.put('/tasks/:id', (req, res) => {
const taskId = parseInt(req.params.id);
const task = tasks.find(task => task.id === taskId);
if (task) {
    task.description = req.body.description;
    res.json({message: 'Task updated', task});
} else {
    res.status(404).send({error :'Task not found'});
}
});

//Suppression d'une tâche
app.delete('/tasks/:id', (req, res) => {
const taskId = parseInt(req.params.id);
tasks = tasks.filter(task => task.id !== taskId);
res.json({message: 'Task deleted'});
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});