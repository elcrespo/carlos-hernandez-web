import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {debounceTime, fromEvent, map, Observable, ReplaySubject, takeUntil, withLatestFrom} from "rxjs";
import {FormControl} from "@angular/forms";

export interface Filter {
  login: string;
}

@Component({
  selector: 'app-users-search-form',
  templateUrl: './users-search-form.component.html',
  styleUrls: ['./users-search-form.component.scss']
})
export class UsersSearchFormComponent implements AfterViewInit, OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  searchText$!: Observable<string>;
  searchBtnClick$!: Observable<any>;
  filter$!: Observable<Filter>;
  searchLoginFormCtrl = new FormControl('');
  @ViewChild('searchBtn', { static: true }) searchButton!: ElementRef;
  @Output() filter = new EventEmitter<Filter>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initObservables();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  initObservables(): void {
    this.searchText$ = this.searchLoginFormCtrl.valueChanges.pipe(
      debounceTime(500),
      map(searchText => searchText || '')
    )
    this.searchBtnClick$ = fromEvent(
      this.searchButton.nativeElement, 'click'
    ).pipe(
      debounceTime(300)
    );

    this.filter$ = this.searchBtnClick$.pipe(
      withLatestFrom(this.searchText$),
      map(([_, searchText]) => ({login: searchText})),
      takeUntil(this.destroyed$)
    );

    this.filter$.subscribe(search => this.filter.emit(search));
  }
}
