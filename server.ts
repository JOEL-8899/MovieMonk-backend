import express, { Request, Response } from 'express';
import { connect } from 'mongoose';
import AuthController from './controllers/AuthController';
import UserReviewController from './controllers/UserReviewController';
import UserController from "./controllers/UserController";
import FollowListController from "./controllers/FollowListController";
import WatchlistController from './controllers/WatchlistController';

const cors = require('cors');
const session = require("express-session");
const app = express();
let sess = {
  secret: process.env.SECRET || "CS5610",
  resave: false,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 * 7,
    sameSite: 'none'
  }
}

if (process.env.ENV === 'PRODUCTION') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
const bodyParser = require('body-parser');
app.use(cors({ credentials: true, origin: process.env.ORIGINS }));
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


connect('mongodb+srv://webdevfinal:web12345@cluster0.mbnud63.mongodb.net/?retryWrites=true&w=majority', options, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log("MongoDB connection successful");
});

app.get('/', (req: Request, res: Response) =>
  res.send('Welcome to Web Dev Final Project!!!!'));

AuthController.getInstance(app);
UserReviewController.getInstance(app);
UserController.getInstance(app);
FollowListController.getInstance(app);
WatchlistController.getInstance(app);

/*
* Start a server listening at port 4000 locally
* but use environment variable PORT on Heroku if available.
*/
const PORT = 4000;
app.listen(process.env.PORT || PORT);