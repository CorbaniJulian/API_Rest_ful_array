import express from "express";
const app = express();
const PORT = 3000;
const __dirname = import.meta.dirname;

app.use(express.json()); //middleware

const users = [
  {
    id: 1,
    nombre: "Walter",
    apellido: "Martinez",
    foto: "foto1.jpg",
  },
  {
    id: 2,
    nombre: "Wendy",
    apellido: "Calizaya",
    foto: "foto2.jpg",
  },
  {
    id: 3,
    nombre: "Julian",
    apellido: "Corbani",
    foto: "foto3.jpg",
  },
];

app.get("/", (req, res) => {
  res.send("API Rest ful con datos desde un array");
  console.log(__dirname);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  user ? res.json(user) : res.status(404).send("User no existe");
});

app.get("/image/users/:id", (req, res) => {
  /*   const user = users.find((u) => u.id == req.params.id);
  console.log(__dirname + "/image/foto" + req.params.id + ".jpg"); */
  /* 
  user
   ? res.sendFile(__dirname + "/image/" + user.foto) 
   : res.status(404).send("User no existe");
  */
  if (user)
    return res.sendFile(__dirname + "/image/foto" + req.params.id + ".jpg");

  res.status(404).send("User no existe");
});

app.post("/users", (req, res) => {
  console.log(req.body);

  const nvoId = users.length + 1;
  const nvoUser = {
    id: nvoId,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    foto: `foto` + nvoId + `.jpg`
  }

  users.push(nvoUser);
  res.send("Nuevo user guardado");
});

app.put("/users", (req, res) => {
  const idAct = req.query.id;
  console.log(req.query.id);
  console.log(req.body);

  const user = users.find(u => u.id == req.query.id);
  console.log(user);
  if(!user) return res.status(404).send("User no existe");

  user.nombre = req.body.nombre;
  user.apellido = req.body.apellido;

  res.json(user);
});

app.delete("/users", (req, res) => {
  const idAct = req.query.id;
  console.log(req.query.id);

  const userIndex = users.findIndex(u => u.id == req.query.id);
  if(!userIndex) return res.status(404).send("User no existe");

  users.splice(userIndex, 1);

  res.status(204).send(); //204 - solicitud procesada sin contenido, nada que enviar, OK, NO CONTENT
});

app.listen(PORT, () => {
  console.log(`servidor de piola en http://localhost:${PORT}`);
});
