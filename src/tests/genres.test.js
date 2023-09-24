const request = require("supertest");
const app = require("../app");
require("../models");

let id;

test("GET /genres debe traer todos los genres", async () => {
  const res = await request(app).get("/genres");
  console.log(res.body);
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test("POST /genres debe crear un genres", async () => {
  const genres = {
    name: "Metal",
  };
  const res = await request(app).post("/genres").send(genres);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(genres.name);
});

test("PUT /genres/:id debe actualizar un genres", async () => {
  const genresUpdated = {
    name: "Metal Updated",
  };
  const res = await request(app).put(`/genres/${id}`).send(genresUpdated);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(genresUpdated.name);
});

test("GET /genres/:id debe obtener un genero por su ID", async () => {
  const res = await request(app).get(`/genres/${id}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(id);
});

test("DELETE /genres/:id debe eliminar un genres", async () => {
  const res = await request(app).delete(`/genres/${id}`);
  expect(res.status).toBe(204);
});
