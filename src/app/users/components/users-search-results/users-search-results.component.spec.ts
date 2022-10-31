import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSearchResultsComponent } from './users-search-results.component';

describe('UsersSearchResultsComponent', () => {
  let component: UsersSearchResultsComponent;
  let fixture: ComponentFixture<UsersSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersSearchResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
