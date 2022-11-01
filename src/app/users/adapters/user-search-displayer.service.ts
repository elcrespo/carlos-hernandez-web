import {Inject, Injectable} from '@angular/core';
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
import {Paginator, PaginatorEvt, UserEntity} from "../domain/models/user-entity";
import { Filter } from "../components/users-search-form/users-search-form.component";
import UserRepository, { UserQueryParams } from "../domain/ports/user.repository";
import {User} from "../domain/models/user";
import UserSearchDisplayerRepository from "../domain/ports/user-search-displayer.repository";

@Injectable({
  providedIn: 'root'
})
export class UserSearchDisplayerService implements UserSearchDisplayerRepository{
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
  users$:Observable<User[]> = this.searchResult$.pipe(
    map(results => results.items)
  );
  pagination$: Observable<Paginator> = this.searchResult$.pipe(map(results => results?.paginator));
  isLoadingData$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor( @Inject('UserRepository') private userRepository: UserRepository) {}

  setFilter(filter: Filter) {
    this.filterSubject.next(filter);
  }

  setPaginator(paginator: PaginatorEvt) {
    this.paginatorSubject.next(paginator);
  }

}
