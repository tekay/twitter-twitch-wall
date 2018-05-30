import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterWallComponent } from './twitter-wall.component';

describe('TwitterWallComponent', () => {
  let component: TwitterWallComponent;
  let fixture: ComponentFixture<TwitterWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
