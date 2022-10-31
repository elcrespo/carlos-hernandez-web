import { Injectable } from '@angular/core';
import { UserWebRepository } from "../repository/user-web-repository";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  finalize,
  map,
  Observable, shareReplay,
  Subject,
  switchMap, tap
} from "rxjs";
import { UserEntity} from "./models/user-entity";
import { Filter } from "../components/users-search-form/users-search-form.component";
import { UserQueryParams } from "../repository/user.repository";
import { PaginatorEvt } from "../../core/components/paginator/paginator.component";

@Injectable({
  providedIn: 'root'
})
export class UserSearchDisplayerService {
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private paginatorSubject: BehaviorSubject<PaginatorEvt> = new BehaviorSubject<PaginatorEvt>({length:0, pageIndex: 0, pageSize: 9});
  private paginator$: Observable<PaginatorEvt> = this.paginatorSubject.asObservable();
  private filterSubject: Subject<Filter> = new Subject<Filter>();
  private filter$: Observable<Filter> = this.filterSubject.asObservable();
  private queryParams$: Observable<UserQueryParams> = combineLatest([this.paginator$, this.filter$]).pipe(
    map(([paginator, filter]) => ({
      perPage: paginator.pageSize,
      page: paginator.pageIndex + 1,
      q: filter.login
    }))
  );
  private searchResult$: Observable<UserEntity> = this.queryParams$.pipe(
    debounceTime(300),
    tap(() => this.isLoadingSubject.next(true)),
    switchMap((queryParams) => this.userRepository.getByLogin(queryParams).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    )),
    shareReplay(1)
  );
  users$ = this.searchResult$.pipe(
    map(results => results.items)
  );
  pagination$ = this.searchResult$.pipe(map(results => results?.paginator));
  isloadingData$ = this.isLoadingSubject.asObservable();

  constructor(private userRepository: UserWebRepository) {}

  setFilter(filter: Filter) {
    this.filterSubject.next(filter);
  }

  setPaginator(paginator: PaginatorEvt) {
    this.paginatorSubject.next(paginator);
  }

}
