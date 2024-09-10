import { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Dashboard from './Components/Dashboard/Dashboard';
import MainGoals from './Components/MainGoals/MainGoals';
import Tasks from './Components/Tasks/Tasks';
import { useEffect } from 'react';

function App() {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);  // Objectif sélectionné


  useEffect(() => {
    console.log('Fetching goals from API...');
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/goals');  // Appelle l'API pour récupérer les goals
        if (response.ok) {
          const data = await response.json();
          setGoals(data);  // Met à jour l'état avec les goals récupérés
        } else {
          console.error('Erreur lors de la récupération des goals');
        }
      } catch (error) {
        console.error('Erreur réseau', error);
      }
    };
    fetchGoals();
  }, []);
  
  
  const addGoal = async (newGoal) => {
    const newGoalObject = {
      name: newGoal,  // Le nom de l'objectif (goal)
      tasks: {
        today: [],
        week: [],
        month: [],
        year: [],
      },
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoalObject),  // Convertir l'objectif en JSON pour l'envoyer au backend
      });
  
      if (response.ok) {
        const createdGoal = await response.json();  // Récupérer l'objectif créé (avec l'_id) depuis la réponse
        setGoals([...goals, createdGoal]);  // Ajouter l'objectif créé au tableau `goals`
      } else {
        console.error('Erreur lors de la création du goal');
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
  };
  
  

  const deleteGoal = async (goalId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/goals/${goalId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setGoals(goals.filter((goal) => goal._id !== goalId));  // Utiliser _id pour filtrer et supprimer l'objectif
      } else {
        console.error('Erreur lors de la suppression du goal');
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
  };
  

  // Ajout de tâche pour chaque période
  const addTaskToPeriod = (taskName, period) => {
    const updatedTasks = [...selectedGoal.tasks[period], { id: Date.now(), name: taskName }];
    const updatedGoal = { ...selectedGoal, tasks: { ...selectedGoal.tasks, [period]: updatedTasks } };

    setGoals(goals.map((goal) => (goal.id === selectedGoal.id ? updatedGoal : goal)));
    setSelectedGoal(updatedGoal);  // Met à jour l'objectif sélectionné
  };

  // Suppression de tâche pour chaque période
  const deleteTaskFromPeriod = (taskId, period) => {
    const updatedTasks = selectedGoal.tasks[period].filter((task) => task.id !== taskId);
    const updatedGoal = { ...selectedGoal, tasks: { ...selectedGoal.tasks, [period]: updatedTasks } };

    setGoals(goals.map((goal) => (goal.id === selectedGoal.id ? updatedGoal : goal)));
    setSelectedGoal(updatedGoal);  // Met à jour l'objectif sélectionné
  };

  return (
    <div className="pageContainer">
      <Header />
      <div className='mainContainer'>
        <Dashboard />
        <MainGoals
          goals={goals}
          addGoal={addGoal}
          deleteGoal={deleteGoal}
          setSelectedGoal={setSelectedGoal}  // Passe la fonction pour sélectionner un goal
        />
      </div>

      <div className="tasksContainer">
        {selectedGoal ? (
          <>
            <Tasks
              title="Aujourd'hui"
              tasks={selectedGoal.tasks.today}
              addTask={(taskName) => addTaskToPeriod(taskName, 'today')}
              deleteTask={(taskId) => deleteTaskFromPeriod(taskId, 'today')}
            />
            <Tasks
              title="Semaine"
              tasks={selectedGoal.tasks.week}
              addTask={(taskName) => addTaskToPeriod(taskName, 'week')}
              deleteTask={(taskId) => deleteTaskFromPeriod(taskId, 'week')}
            />
            <Tasks
              title="Mois"
              tasks={selectedGoal.tasks.month}
              addTask={(taskName) => addTaskToPeriod(taskName, 'month')}
              deleteTask={(taskId) => deleteTaskFromPeriod(taskId, 'month')}
            />
          </>
        ) : (
          <p>Veuillez sélectionner un objectif pour voir ses tâches</p>
        )}
      </div>
    </div>
  );
}

export default App;
