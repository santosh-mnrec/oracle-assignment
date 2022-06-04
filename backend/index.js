var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');
var port = process.env.PORT || 8080;
var app = express();

var router = express.Router();
var rr = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/tasks', router);
app.use('/random', rr);

rr.get('/', (req, res) => {
  throw new Error('BROKEN');
  //res.sendStatus(403);
});

app.listen(port, function () {
  console.log(`Express server listening on port ${port}`);
});

const db = [
  { id: 0, title: 'Learn Kubernetes', complete: true, date: new Date() },
  { id: 1, title: 'Learn Draft', complete: true, date: new Date() },
  { id: 2, title: 'Learn Helm', complete: false, date: new Date() },
  {
    id: 3,
    title: 'Remote debugging is awesome!',
    complete: false,
    date: new Date(),
  },
];

router.get('/', (req, res) => {
  console.log(req.method + ' ' + req.url);
  res.status(200).json(db);
});

router.get('/:id', (req, res) => {
  console.log(req.method + ' ' + req.url);

  const { id } = req.params;
  const todoItem = db.filter((todo) => todo.id == id)[0];

  if (!todoItem) {
    res.sendStatus(404);
  } else {
    res.status(200).json(todoItem);
  }
});

router.post('/', (req, res) => {
  console.log(req.method + ' ' + req.url);

  const { title, complete } = req.body;
  var lastId;
  var last = db[db.length - 1];
  if (last == undefined) {
    lastId = -1;
  }
  //const id = last.id + 1;
  const id = lastId + 1;
  const newTodo = { id, title, complete };

  db.push(newTodo);

  res.status(201).location(`/api/todos/${id}`).json(newTodo);
});

router.put('/:id', (req, res) => {
  console.log(req.method + ' ' + req.url);

  const { id, title, complete } = req.body;

  const exists = db.filter((todo) => todo.id == id).length > 0;
  if (!exists) {
    res.sendStatus(404);
    return;
  }

  db.map((todo) => {
    if (todo.id == id) {
      todo.complete = complete;
    }
  });

  res.sendStatus(200);
});

router.delete('/:id', (req, res) => {
  console.log(req.method + ' ' + req.url);

  const { id } = req.params;
  const todoItem = db.filter((todo) => todo.id == id)[0];

  if (!todoItem) {
    res.sendStatus(404);
    return;
  }
  db.splice(
    db.indexOf((todo) => todo.id == id),
    1
  );
  res.sendStatus(200);
});

module.exports = {
  app, router
}


