import './Tasks.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import delButton from '../../assets/cercle.png'

const Tasks = ({ title, tasks, addTask, deleteTask }) => {
  const [newTask, setNewTask] = useState('');  // State pour la nouvelle tâche
  const [show, setShow] = useState(true);  // State pour afficher ou cacher les tâches

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask(newTask);  // Ajoute la tâche via la fonction passée en props
      setNewTask('');  // Réinitialise le champ de saisie
    }
  };

  return (
    <div className="taskContainer">
      <div className="titleContainer">
        <h2>{title}</h2>
        <button onClick={() => setShow(!show)}>{show ? '-' : '+'}</button>
      </div>

      {show && (
        <div className='inputContainer'>
          <input
            type="text"
            placeholder='Entrez une tâche'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}  // Met à jour le champ de saisie
          />
          <button onClick={handleAddTask}>Ajouter</button>
        </div>
      )}

      <ul>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index}>
              <p>{task.name}</p>
              <button onClick={() => deleteTask(task.id)}>
                  <img src={delButton} alt="Supprimer" />
              </button>
            </li>
          ))
        ) : (
          <p>Aucune tâche pour cette période</p>
        )}
      </ul>
    </div>
  );
};

Tasks.propTypes = {
  title: PropTypes.string.isRequired,  // Le titre de la période (Aujourd'hui, Semaine, Mois, etc.)
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  addTask: PropTypes.func.isRequired,  // Fonction pour ajouter une tâche
  deleteTask: PropTypes.func.isRequired,  // Fonction pour supprimer une tâche
};

export default Tasks;
