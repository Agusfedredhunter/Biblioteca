Gimnasio Helenic Works 🏋️

Trabajo Práctico N°3 - Node.js, Express y Deploy en Render
**Materia:** Programación III
**Institución:** Universidad Tecnológica Nacional
**Carrera:** Tecnicatura Universitaria en Programación
**Profesor:** Gustavo Ramoscelli
**Ayudante:** María Victoria Ruiz


Grupo N°15

 Integrantes y sus ramas:  
 Alumno Fedigatti Augusto, rama `alumno_1_Fedigatti`
 Alumno Pelizza Joaquin, rama `alumno_2_Pelizza`
 Alumno Urdampilleta Iñaki, rama `alumno_3_Urdampilleta`
 Alumno Lima Jesus, rama `alumno_4_Lima`
 Alumno Moore Andy, rama `alumno_5_Moore`
 Alumno Morel Ramiro, rama  `alumno_6_Morel`


Descripción del Proyecto

Helenic Works es una API REST desarrollada con Node.js y Express para el gimnasio del mismo nombre. Provee endpoints para consultar servicios, integrantes del equipo y gestión de usuarios. El front-end está desplegado en GitHub Pages y consume los datos directamente desde la API alojada en Render.com.

- Front-end (GitHub Pages): https://agusfedredhunter.github.io/Biblioteca/
- Back-end (Render): https://bliblioteca.onrender.com


Metodología de trabajo con Git y GitHub

Se trabajó con ramas por alumno. Cada alumno realizó sus cambios y luego hizo un Pull Request para mergear a main.

Flujo de trabajo:
1. Cada alumno crea su rama: `git checkout -b rama-alumnoX`
2. Realiza sus cambios y hace commits: `git commit -m "descripción"`
3. Sube su rama: `git push origin rama-alumnoX`
4. Abre un Pull Request desde su rama hacia `main` en GitHub
5. Se revisa y se mergea a `main`


División de archivos entre integrantes

| Alumno | Archivos a cargo |
|--------|-----------------|
| Alumno 1 | `app.js`, `models/server.js` |
| Alumno 2 | `routes/servicios.js`, `data/servicios.json` |
| Alumno 3 | `routes/equipo.js`, `data/equipo.json` |
| Alumno 4 | `routes/usuarios.js`, `data/usuarios.json` |
| Alumno 5 | `pages/login.html`, `pages/perfil.html` |
| Alumno 6 | `index.html`, `css/style.css`, `README.md` |

Distribución de archivos y carpetas

Biblioteca/
├── app.js
├── models/
│   └── server.js
├── routes/
│   ├── servicios.js
│   ├── equipo.js
│   └── usuarios.js
├── data/
│   ├── servicios.json
│   ├── equipo.json
│   └── usuarios.json
├── pages/
│   ├── login.html
│   ├── perfil.html
│   ├── servicios.html
│   ├── equipo.html
│   ├── contacto.html
│   ├── faq.html
│   └── pedidos.html
├── css/
│   └── style.css
├── assets/
├── index.html
├── .env
├── .gitignore
└── package.json



Explicación de funciones

`app.js`

javascript
app.use(cors());

Habilita CORS para que el front-end en GitHub Pages pueda hacer peticiones a la API de render.com sin que el navegador las bloquee por tener dominios diferentes. 

javascript
app.use(express.json());

Permite que Express lea peticiones en formato JSON.

javascript
app.use('/servicios', serviciosRouter);
app.use('/equipo', equipoRouter);
app.use('/perfil', usuariosRouter);
app.use('/login', usuariosRouter);

Registra las rutas de la API.


`models/server.js`

javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

Usa la variable de entorno `PORT` para poder reutilizarla en render.


`routes/servicios.js`

javascript
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const servicios = JSON.parse(data);
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
});

Lee el archivo `servicios.json` de forma asíncrona y devuelve todos los servicios. Si ocurre un error responde con código 500.

javascript
router.get('/:id', async (req, res) => {
  try {
    const servicio = servicios.find(s => s.id === parseInt(req.params.id));
    if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(servicio);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el servicio' });
  }
});

Busca un servicio por su `id` usando `.find()`. Si no existe devuelve error 404.



`routes/equipo.js`

javascript
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const equipo = JSON.parse(data);
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el equipo' });
  }
});

Lee y devuelve todos los integrantes del equipo fictisio desde `equipo.json`


`routes/usuarios.js`

javascript
router.get('/:id', async (req, res) => {
  try {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
});

Devuelve el perfil de un usuario según su `id`, incluyendo nombre, mail, fecha de registro y últimos 3 pedidos.

javascript
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = usuarios.find(u => u.mail === email && u.password === password);
    if (!usuario) return res.status(401).json({ error: 'Credenciales incorrectas' });
    res.json({ id: usuario.id, nombre: usuario.nombre });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

Recibe `email` y `password` del body, los compara con el JSON y si coinciden devuelve el id y nombre del usuario, si no coinciden responde con error 401


Estructura de los archivos JSON

`data/servicios.json`
json
{
  "id": 1,
  "nombre": "Musculación y Cross Training",
  "descripcion": "Acceso libre al salón de pesas, máquinas guiadas y área de peso libre y funcional.",
  "precio": 25000,
  "imagen": "musculacion.png"
}


 `data/equipo.json`
`json
{
  "id": 1,
  "nombre": "Marcos S.",
  "rol": "Head Coach & Musculación",
  "descripcion": "Especialista en hipertrofia y periodización del entrenamiento.",
  "imagen": "trainer.png"
}

`data/usuarios.json`
`json
{
  "id": 1,
  "nombre": "Joaquin",
  "mail": "joaquin@mail.com",
  "password": "1234",
  "fechaRegistro": "2025-01-15",
  "foto": "user.png",
  "ultimosPedidos": [
    "Plan Musculación",
    "Personal Trainer",
    "Evaluación Física"
  ]
}
