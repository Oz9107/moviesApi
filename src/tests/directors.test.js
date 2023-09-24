const request = require("supertest");
const app = require("../app");
require("../models");

let id;

test("GET /directors debe traer todos los directors", async () => {
  const res = await request(app).get("/directors");
  console.log(res.body);
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test("POST /directors debe crear un directors", async () => {
  const director = {
    firstName: "Cervantes",
    lastName: "Pedro",
    nationality: "Frances",
    image: "https://randomuser.me/api/portraits/men/92.jpg",
    birthday: "1960",
  };
  const res = await request(app).post("/directors").send(director);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(director.name);
});

test("PUT /directors/:id debe actualizar un directors", async () => {
  const directorUpdated = {
    firstName: "Cervantes Updated",
  };
  const res = await request(app).put(`/directors/${id}`).send(directorUpdated);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(directorUpdated.name);
});

test("GET /directors/:id debe obtener un director por su ID", async () => {
  const res = await request(app).get(`/directors/${id}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(id);
});

test("DELETE /directors/:id debe eliminar un directors", async () => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.status).toBe(204);
});
