const express = require("express");
const { Sequelize } = require("sequelize");

// ---------------------------------------- INITIALISATION DE LA BDD ----------------------------------- //

// const sequelize = new Sequelize(
//   "", // BDD name
//   "root", // USER name
//   "", // MP
//   { dialect: "mysql", host: "localhost" }
// );

// try {
//   sequelize.authenticate();
//   console.log("Connecté à la base de données MySQL!");

//   sequelize.query("CREATE DATABASE `mabdd`;").then(([results, metadata]) => {
//     console.log("Base de données créée !");
//   });

// } catch (error) {
//   console.error("Impossible de se connecter, erreur suivante :", error);
// }

// ---------------------------------------- INSERT INTO BDD -------------------------------------------- //

// const User = sequelize.define("User", {
//   firstName: {
//     type: Sequelize.STRING,
//   },
//   isActive: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false,
//   },
// });

// await User.sync({force: true});

// ---------------------------------------- SELECT INTO BDD -------------------------------------------- //

// const sequelize = new Sequelize("mabdd", "root", "", {
//   dialect: "mysql",
//   host: "localhost",
// });

// try {
//   sequelize.authenticate();
//   console.log("Connecté à la base de données MySQL!");

//   sequelize
//     .query(
//       "SELECT eleves.id as 'eleve_id', eleves.nom as 'eleve_nom', eleves.cours_id, cours.nom as 'cours_nom', cours.date as 'cours_date' FROM eleves JOIN cours on eleves.cours_id = cours.id"
//     )
//     .then(([results, metadata]) => {
//       console.log(results);
//     });
// } catch (error) {
//   console.error("Impossible de se connecter, erreur suivante :", error);
// }

// ----------------------------------------------------------------------------------------------------- //

// La constante app est l’instanciation d’un objet Express, qui va contenir notre serveur ainsi que les méthodes dont nous aurons besoin.
const app = express();

const parkings = require("./parkings.json");
const reservations = require("./reservations.json");

app.use(express.json());

// ----------------------------------------------------------------------------------------------------- //

// La méthode .get d’express permet de définir une route GET. Elle prend en premier paramètre une String qui a défini la route à écouter et une callback,
// qui est la fonction à exécuter si cette route est appelée.

// GETALL
app.get("/parkings", (request, response) => {
  // Le callback prend en paramètres :
  // L’objet request, qui reprend toutes les données fournies par la requête
  // Et l’objet res, fourni par express, qui contient les méthodes pour répondre à la requête qui vient d’arriver.

  response.status(200).json(parkings);
});

// GETONE
app.get("/parkings/:id", (request, response) => {
  const id = parseInt(request.params.id);
  // il faut d’abord transformer le params de String en Number

  const parking = parkings.find((parking) => parking.id === id);
  // rechercher dans les parkings pour trouver celui qui a l’id correspondant à celui passé dans l’URL

  response.status(200).json(parking);
});

// POST
app.post("/parkings", (req, res) => {
  parkings.push(req.body);
  //   console.log("req.body:", req.body);

  res.status(200).json(parkings);
});

// PUT
app.put("/parkings/:id", (req, res) => {
  const id = parseInt(req.params.id);

  let parking = parkings.find((parking) => parking.id === id);
  parking.name = req.body.name;
  parking.city = req.body.city;
  parking.type = req.body.type;

  res.status(200).json(parking);
});

// DELETE
app.delete("/parkings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let parking = parkings.find((parking) => parking.id === id);

  parkings.splice(parkings.indexOf(parking), 1);
  res.status(200).json(parkings);
});

// GETALLWITH
app.get("/parkings/:id/reservations", (request, response) => {
  const id = parseInt(request.params.id);

  const resasParkingX = reservations.filter(
    (reservation) => reservation.parkingId === id
  );

  response.status(200).json(resasParkingX);
});

// GETONEWITH
app.get("/reservations/:id", (request, response) => {
  const id = parseInt(request.params.id);

  const resa = reservations.find((reservation) => reservation.id === id);

  const displayParking = parseInt(resa.parkingId);

  response.status(200).json(displayParking);
});

// ----------------------------------------------------------------------------------------------------- //

app.listen(8080, () => {
  console.log("Serveur is listening .. ");
});
