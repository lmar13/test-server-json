const jsonServer = require('json-server');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 4001;

const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));
const SECRET_KEY = 'secret_key';
const expiresIn = '1h';

server.use(middlewares);
// server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Create a token from a payload 
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token 
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
}

// Check if the user exists in database
function isAuthenticated({ username, password }) {
    const index = userdb.users.findIndex(user => user.login.username === username && user.login.password === password);
    if (index > -1) {
        const user = userdb.users[index];
        const userInfo = {
            username: username,
            name: user.name,
            surname: user.surname,
            email: user.email,
            systemRole: user.systemRole
        };
        return userInfo;
    }
    return false;
}


server.post('/login', function(req, res) {
    const { username, password } = req.body;
    if (isAuthenticated({ username, password }) === false) {
        const status = 401;
        const message = 'Incorrect username or password';
        res.status(status).json({ status, message });
        // return;
    } else {
        const user = isAuthenticated({ username, password });
        const access_token = createToken(user);
        res.status(200).json({ access_token });
    }

});

// server.use(/^(?!\/auth).*$/, (req, res, next) => {
//     if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
//         // if (req.headers.authorization === undefined) {
//         const status = 401;
//         const message = 'Bad authorization header';
//         res.status(status).json({ status, message });
//         return;
//     }
//     jwt.verify(req.headers.authorization.split(' ')[1], SECRET_KEY, function(err, decoded) {
//         if (err) {
//             console.log('err', err);
//             const status = 401;
//             const message = 'Error: access_token is not valid';
//             res.status(status).json({ status, message });
//             return false;
//         } else {
//             next();
//         }

//         // console.log(decoded); // bar
//         // console.log(err);
//     });
// });

server.use(jsonServer.rewriter({
    '/tables/:id/:data': '/:data',
    '/tables/:id/:data/:rowId': '/:data?id=:rowId'
}));

server.use(router);
server.listen(port);