const express = require("express");
const server = express();
const axios = require("axios");

const unsplashApiKey = "Ryd5V1rN8vRB2L8d8BW8A5bEcOtq0mWVZF-GAf1wuJw";

const Port = process.env.Port || 3000;

//***** setting Middlewars */

server.use(express.static("public"));
server.set("view engine", "ejs");

//***** Setting Endpoints */

server.get("/", (req, res) => {
  const page = req.query.page;
  const query = req.query.q;

  // Define the API URL based on whether a query is provided
  let apiUrl;
  if (query) {
    apiUrl = `https://api.unsplash.com/search/photos/?page=${
      page || 1
    }&per_page=30&query=${query}&client_id=${unsplashApiKey}`;
  } else {
    apiUrl = `https://api.unsplash.com/photos/random?count=20&client_id=${unsplashApiKey}`;
  }

  // Fetch images from the Unsplash API
  axios
    .get(apiUrl)
    .then(function (response) {
      const data = response.data.results || response.data;
      // Use results for search and data for random

      // Render the 'index' template with the fetched data
      res.render("index", { data });
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send("Error fetching photo data");
    });
});

server.get("/favorites", (req, res) => {
  res.render("favorites");
});

server.get("/photo/:id", (req, res) => {
  const id = req.params.id;
  // Construct the URL for the Unsplash API
  const apiUrl = `https://api.unsplash.com/photos/${id}?client_id=${unsplashApiKey}`;

  axios
    .get(apiUrl)
    .then(function (response) {
      const data = response.data; // Get the data from the response
      res.render("template", { data });
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send("Error fetching photo data");
    });
});

//***** Setting a Port for my server */

server.listen(Port, () => {
  console.log(`Server is running on Port : ${Port}`);
});
