import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as socket from 'socket.io';

import { Topic, Tweet } from './models';

let router = express();

let twitch = new Topic('tweets');


router.use(bodyParser.json());

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let server = router.listen(3030, () => console.log('Server started'));

let io = socket(server);

io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);

  socket.on('twitch', function( user ){
    twitch.emitter.on('tweet', (tweet) => {
//      console.log("server emits new tweet");
      socket.emit('newTweet', tweet);
    });
  });
});

router.get("/collection/twitch", (req: Request, res: Response) => {
  res.json({
    tweets: twitch.tweets
  });
});

router.use('/', express.static(__dirname + '/../client/dist/client'));
router.use('/*', express.static(__dirname + '/../client/dist/client'));
