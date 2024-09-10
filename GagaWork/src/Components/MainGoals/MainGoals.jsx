import { useState } from 'react';
import './MainGoals.scss'
import PropTypes from 'prop-types'

const MainGoals = ({goals, addGoal, deleteGoal, setSelectedGoal}) => {

  const [show, setShow] = useState(true)

  const toggleButton = () => {
    setShow(!show)
  }

  const [newGoal, setNewGoal] = useState('')

  const handleAddGoal = () => {
    addGoal(newGoal)
    setNewGoal('')
  }

   // Vérifie que goals n'est pas vide
   if (goals.length === 0) {
    return <p>Aucun objectif trouvé</p>;
  }

  return (
    <div className="goalsContainer">
      <div className="titleContainer">
        <h1>Objectifs</h1>
        <button onClick={toggleButton}>{show ? "-" : "+"}</button>
      </div>
      {show && (
        <div className='inputContainer'>
          <input 
          type="text" 
          placeholder='Entrez un objectif'
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)} />
          <button onClick={handleAddGoal}>Ajouter</button>
        </div>
      )}
      <div className='goalsItems'>
        <ul>
          {goals.map((goal, index) => (
            <li key={index}>
              <p onClick={() => setSelectedGoal(goal)}>{goal.name}</p>
              <button onClick={() => deleteGoal(goal._id)}>-</button>
            </li>
          ))}
        </ul>
      </div>
  </div>
  )
}

MainGoals.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      tasks: PropTypes.shape({
        today: PropTypes.arrayOf(PropTypes.object),
        week: PropTypes.arrayOf(PropTypes.object),
        month: PropTypes.arrayOf(PropTypes.object),
        year: PropTypes.arrayOf(PropTypes.object),
      }),
    })
  ).isRequired,
  addGoal: PropTypes.func.isRequired,
  deleteGoal: PropTypes.func.isRequired,
  setSelectedGoal: PropTypes.func.isRequired,
};


export default MainGoals;