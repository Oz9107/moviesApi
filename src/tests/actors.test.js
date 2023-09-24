const request = require("supertest");
const app = require("../app");
require("../models");

let id;

test("GET /actors debe traer todos los actores", async () => {
  const res = await request(app).get("/actors");
  console.log(res.body);
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test("POST /actors debe crear un actors", async () => {
  const actor = {
    firstName: "Aurelio",
    lastName: "Marco",
    nationality: "italiana",
    image: "https://michael.com/image.jpg",
    birthday: "1958",
  };
  const res = await request(app).post("/actors").send(actor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(actor.name);
});

test("PUT /actors/:id debe actualizar un actor", async () => {
  const actorsUpdated = {
    firstName: "Aurelio Updated",
  };
  const res = await request(app).put(`/actors/${id}`).send(actorsUpdated);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(actorsUpdated.name);
});

test("GET /actors/:id debe obtener un actor por su ID", async () => {
  const res = await request(app).get(`/actors/${id}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(id);
});

test("DELETE /actors/:id debe eliminar un actor", async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});