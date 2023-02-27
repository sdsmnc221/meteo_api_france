const express = require('express');
const axios = require('axios');

require('dotenv').config();

const app = express();

const db = require('./database');
// pour permettre la communication entre le front et le back en dev.
const cors = require('cors');

// a ajouter pour la communication entre le front et le back en dev lorsque express est instancié
app.use(
  cors({
    credentials: true,
  })
);

// Initialisation de la base avec les deux tables nécessaires (à garder)
db.init();
// exemple de requete sql à supprimer
db.all('select * from city').then((rows) => {
  // console.table(rows);
});

// dans le cas où le front est fait en js natif, voici une ligne de commande à ajouter pour servir le front à partir du projet node
// si vous faîtes du VueJS ou du React ce n'est pas nécessaire
// dans ce cas il n'est pas nécessaire d'utiliser la partie cors (ligne 6 à 8)
//app.use('/', express.static('../../front/'));

const PORT = 3000;

const addCols = () =>
  [
    'meteo',
    'sunHours',
    'weather',
    'probarain',
    'probafrost',
    'probafog',
    'probawind',
  ].forEach((column) => {
    db.run(`ALTER TABLE city 
          ADD ${column} VARCHAR(20)
  `);
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/cities', (req, res) => {
  addCols();
  db.all('select * from city').then((rows) => {
    res.send(rows);
  });
});

app.get('/meteo/:city', async (req, res) => {
  const row = await db.get(
    `select * from city where insee = "${req.params.city}"`
  );

  if (row) {
    if (!row.meteo) {
      // addCols();

      const meteo = await axios.get(
        `https://api.meteo-concept.com/api/forecast/daily?token=${process.env.METEO_TOKEN}&insee=${row.insee}`
      );

      console.log(meteo?.data);

      if (meteo && meteo.data) {
        const {
          sun_hours: sun,
          probarain,
          weather,
          probafrost,
          probafog,
          probawind70: probawind,
        } = meteo.data.forecast[0];
        await db.run(`UPDATE city 
                      SET meteo = "true", sunHours = "${sun}", weather = "${weather}", probarain = "${probarain}", probafrost = "${probafrost}", probafog = "${probafog}", probawind = "${probawind}"
                      WHERE insee = "${row.insee}";
        `);
        const row_ = await db.get(
          `select * from city where insee = "${req.params.city}"`
        );

        res.send(row_);
      }
    } else {
      res.send(row);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
