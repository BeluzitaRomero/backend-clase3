const express = require("express");
const app = express();
const Container = require("./container");

const container = new Container("productos.json");

app.get("/", (req, res) => {
  res.send("<h1>hola mundo😎</h1>");
});

app.get("/products", async (req, res) => {
  const productsArray = await container.getAll();

  let list = `<ul></ul>`;
  for (const p of productsArray) {
    list += `<li>${p.title}</li>`;
  }

  res.send(list);
});

app.get("/randomProduct", async (req, res) => {
  const productsArray = await container.getAll();
  const random = Math.floor(Math.random() * productsArray.length);
  res.send(productsArray[random]);
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${server.address().port}😎`
  );
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
