const Goal = require('../models/Goals')

// Récupérer tous les goals 
exports.getAllGoals = async (req, res) => {
    try {
        const goals = await Goal.find();
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ error })
    }
}

// Créer un nouveau goal
exports.createGoal = async (req, res) => {
    const { name } = req.body;
    const newGoal = new Goal({
      name,
      tasks: {
        today: [],
        week: [],
        month: [],
        year: [],
      },
    });
  
    try {
      const savedGoal = await newGoal.save();
      res.status(201).json(savedGoal);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

// Supprimer un goal
exports.deleteGoal = async (req, res) => {
  try {
    // Recherche et suppression en une seule opération
    const goal = await Goal.findByIdAndDelete(req.params.id);

    // Si le goal n'existe pas, renvoie un statut 404
    if (!goal) {
      return res.status(404).json({ message: 'Goal introuvable' });
    }

    // Si tout va bien, renvoie un message de succès
    res.status(200).json({ message: 'Goal supprimé avec succès' });
  } catch (error) {
    // Gestion des erreurs, par exemple, si l'ID est mal formaté
    res.status(500).json({ message: 'Erreur lors de la suppression du goal', error });
  }
};
