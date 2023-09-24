const request = require("supertest");
const app = require("../app");
const Actors = require("../models/Actors");
const Directors = require("../models/Directors");
const Genres = require("../models/Genres");
require("../models");

let id;

test("GET /movies debe traer todos los movies", async () => {
  const res = await request(app).get("/movies");
  console.log(res.body);
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test("POST /movies debe crear una movies", async () => {
  const movie = {
    name: "Insidios 5",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/v1-0001-insidious5-stillselects00089321-r-1998x1080-thumbnail-647f50924b21e.jpg?resize=980:*",
    synopsis:
      "'Insidious 5' continuará la historia de la familia Lambert diez años después de los eventos de 'Insidious: Capítulo 2' y podremos ver al ya crecidito hijo mayor, Dalton, comenzando la universidad. Seguro que no solo lo va a pasar mal con alguna asignatura...",
    releaseYear: 2020,
  };
  const res = await request(app).post("/movies").send(movie);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("PUT /movies/:id debe actualizar una movie", async () => {
  const movieUpdated = {
    name: "Insidios 5 Updated",
  };
  const res = await request(app).put(`/movies/${id}`).send(movieUpdated);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movieUpdated.name);
});

test("GET /movies/:id debe obtener una movie por su ID", async () => {
  const res = await request(app).get(`/movies/${id}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(id);
});

//----------------------------------------------------------------------
test("POST /movies/:id/actors debe insertar las movies de un actor", async () => {
  const actor = await Actors.create({
    firstName: "Oscar",
    lastName: "Pérez",
    nationality: "USA",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
    birthday: "1990-01-01",
  });
  const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});
//----------------------------------------------------------------------
test("POST /movies/:id/directors debe insertar las movies de un director", async () => {
  const director = await Directors.create({
    firstName: "Marco",
    lastName: "Valencia",
    nationality: "USA",
    image: "https://randomuser.me/api/portraits/men/84.jpg",
    birthday: "1995-12-10",
  });
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});
//----------------------------------------------------------------------
test("POST /movies/:id/genres debe insertar las movies de un genero", async () => {
  const genero = await Genres.create({
    name:"Romanse"
  });
  const res = await request(app).post(`/movies/${id}/genres`).send([genero.id]);
  await genero.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});
//-----------------------------------------------------------------------------

test("DELETE /movies/:id debe eliminar una movie", async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.status).toBe(204);
});
