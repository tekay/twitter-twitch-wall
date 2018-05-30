import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { KSQLService } from '../ksql.service';
import { Tweet } from '../tweet.model';

@Component({
  selector: 'app-twitter-wall',
  templateUrl: './twitter-wall.component.html',
  styleUrls: ['./twitter-wall.component.css']
})
export class TwitterWallComponent implements OnInit {

  displayedTweets: Tweet[] = [];

  constructor(private ksql: KSQLService) {
    this.ksql.tweets.subscribe(() => {
      let tweets = this.ksql.currentTweets;
      this.displayedTweets = tweets.slice(tweets.length - 20, tweets.length - 1)
    });
	}

  ngOnInit() {
  }

}
