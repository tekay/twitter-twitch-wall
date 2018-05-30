import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { http } from 'stream-http';
import { Socket } from 'socket.io-client';
import * as socket from 'socket.io-client';
import { Subject, Observable, of, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Tweet } from './tweet.model';

@Injectable({
  providedIn: 'root'
})
export class KSQLService {
	public currentTweets: Tweet[];
	public socket;

  private tweetsSource = new Subject<Tweet>();
  tweets = this.tweetsSource.asObservable();

  constructor(private httpClient: HttpClient) {
    //this.socket = Socket('/');
		this.socket = socket('/');
		this.httpClient.get<any>('/api/collection/twitch')
			.subscribe((data) => {
				this.currentTweets = data.tweets;
				this.tweetsSource.next();
			});
		this.initSocket();
  }

  public initSocket(): void {
    this.socket.emit("twitch");
    this.socket.on('newTweet', (data: Tweet) => {
//			console.log(data);
      this.currentTweets.push(data);
      if (this.currentTweets.length > 10000) {
        this.currentTweets.shift();
      }
      this.tweetsSource.next(data);
    });
  }

	public getTweets(): Observable<Tweet[]> {
		return this.httpClient.get<any>('/api/collection/twitch').pipe(
      map((data) => {
				return data.tweets;
			})
		);
	}

}
