const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setMoviesGenres,
  setMoviesActors,
  setMoviesDirectors,
} = require("../controllers/movies.controllers");
const express = require("express");

const moviesRouter = express.Router();

moviesRouter.route("/").get(getAll).post(create);

moviesRouter.route("/:id").get(getOne).delete(remove).put(update);

moviesRouter.route("/:id/genres").post(setMoviesGenres);
moviesRouter.route("/:id/actors").post(setMoviesActors);
moviesRouter.route("/:id/directors").post(setMoviesDirectors);

module.exports = moviesRouter;
