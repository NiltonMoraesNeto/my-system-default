import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Login route
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = router.db.get('users').find({ email, password }).value();

  if (user) {
    res.jsonp({
      token: 'fake-jwt-token',
      user: { id: user.id, email: user.email }
    });
  } else {
    res.status(400).jsonp({ message: "Credenciais inválidas" });
  }
});

// Logout route
server.post('/logout', (req, res) => {
  // In a real app, you might want to invalidate the token here
  res.jsonp({ message: "Logout bem-sucedido" });
});

// Verify token route
server.get('/verify-token', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token === 'fake-jwt-token') {
    res.jsonp({ valid: true });
  } else {
    res.status(401).jsonp({ message: "Token inválido" });
  }
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});