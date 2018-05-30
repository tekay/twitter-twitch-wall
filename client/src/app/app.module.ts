import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
	MatTableModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { TwitterWallComponent } from './twitter-wall/twitter-wall.component';

import { KSQLService } from './ksql.service';

@NgModule({
  declarations: [
    AppComponent,
    TwitterWallComponent
  ],
  imports: [
    BrowserModule,
		BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule
  ],
  providers: [KSQLService],
  bootstrap: [AppComponent]
})
export class AppModule { }
