const express = require("express");

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
app.get("/parkings/:id/reservations/:id", (request, response) => {
  const id = parseInt(request.params.id);

  const resasParkingX = reservations.filter(
    (reservation) => reservation.parkingId === id
  );

  response.status(200).json(resasParkingX);
});

// ----------------------------------------------------------------------------------------------------- //

app.listen(8080, () => {
  console.log("Serveur is listening .. ");
});