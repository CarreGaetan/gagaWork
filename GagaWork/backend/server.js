const port = 3000
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express()
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('Connecté à MongoDB');
    })
    .catch((error) => {
      console.error('Erreur de connexion à MongoDB :', error);
    });

// Middleware pour parser les requêtes JSON
app.use(express.json()); 

// Définir une route simple pour la page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur !');
});

// Importer les routes des goals 
const goalRoutes = require('./routes/goalRoutes');
app.use('/api/goals', goalRoutes)

// Démarrer le serveur et écouter sur le port défini
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);  // 
});