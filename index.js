import express from 'express';
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
    res.send("Escribimos un user");

    const nvoId = user.length + 1;
    const nvoUser = {
      "id": nvoId,
      "nombre" : req.body.nombre,
      "apellido" : req.body.apellido,
      "foto": `foto`+ nvoId + `.jpg`
    }
  });

app.listen(PORT, () => {
  console.log(`servidor de piola en http://localhost:${PORT}`);
});