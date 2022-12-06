import express, { Request, Response } from 'express';
import { connect } from 'mongoose';

const cors = require('cors');
const session = require("express-session");
const app = express();
let sess = {
  secret: process.env.SECRET || "CS5610",
  resave: false,
  cookie: {
    secure: false
  }
}

if (process.env.ENV === 'PRODUCTION') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
const bodyParser = require('body-parser');
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(session(sess));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
}

app.get('/', (req: Request, res: Response) =>
  res.send('Welcome to Web Dev Final Project!!!!'));

/*
* Start a server listening at port 4000 locally
* but use environment variable PORT on Heroku if available.
*/
const PORT = 4000;
app.listen(process.env.PORT || PORT);