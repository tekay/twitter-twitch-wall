import { EventEmitter } from 'events';
import request = require('request-promise');

export class Tweet {
  time: string;
  name: string;
  text: string;
  hashtags: string[];

  constructor(time: string, name: string, text: string, hashtags: string[]) {
    this.time = time;
    this.name = name;
    this.text = text;
    this.hashtags = hashtags;
  }
}

export class Topic {
  name: string;
  tweets: Tweet[];
  emitter: EventEmitter;
  static cacheSize = 5000;

  constructor(name: string) {
    this.name = name;
    this.tweets = [];
    this.emitter = new EventEmitter();
    this.fetchTweets();
  }

  public fetchTweets() {
    request({
      method: 'POST',
      body: {
        'ksql': `SELECT CREATEDAT, USER_NAME, TEXT, HASHTAGENTITIES FROM ${this.name};`,
        'streamsProperties': {
          'ksql.streams.auto.offset.reset': 'earliest'
        }
      },
      uri: 'http://localhost:8088/query',
      json: true
    }).on('data', (data: Buffer) => {
      data.toString('utf8').trim().split("\n").forEach(line => {
        if (line == "") {
          return;
        }
        try {
          let object = JSON.parse(line).row.columns;
          object[3] = JSON.parse(object[3]).map(entity => entity.Text);
          let tweet = new Tweet(object[0], object[1], object[2], object[3]);
          this.tweets.push(tweet);
          if(this.tweets.length > 5000) {
            this.tweets.shift();
          }
//          console.log(this.name, tweet.time);
          this.emitter.emit('tweet', tweet);
        } catch (e) {
          console.log("shit's on fire, yo!");
          console.log(e);
        }
      });
    });
  }

}

