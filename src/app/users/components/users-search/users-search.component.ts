import { Component, OnInit } from '@angular/core';
import {Filter} from "../users-search-form/users-search-form.component";
import {UserSearchDisplayerService} from "../../domain/user-search-displayer.service";
import {BehaviorSubject, distinctUntilChanged, filter, map, Observable, shareReplay, startWith} from "rxjs";
import {Paginator, UserEntity} from "../../domain/models/user-entity";
import {PaginatorEvt} from "../../../core/components/paginator/paginator.component";
import {User} from "../../domain/models/user";

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UsersSearchComponent implements OnInit {
  pageSizeOptions = [9, 20, 50];
  users$: Observable<User[]> = this.userSearchService.users$.pipe(filter(Boolean));
  pagination$: Observable<Paginator> = this.userSearchService.pagination$.pipe(shareReplay(1));
  isLoadingData$: Observable<boolean> = this.userSearchService.isloadingData$;
  constructor(private userSearchService: UserSearchDisplayerService) { }

  ngOnInit(): void {
    this.onPaginatorEvt({pageSize: this.pageSizeOptions[0], pageIndex: 0, length: 0});
  }

  onFilter(filter: Filter) {
    console.log('filter', filter);
    this.userSearchService.setFilter(filter);
  }

  onPaginatorEvt(paginatorEvt: PaginatorEvt) {
    console.log('onPaginatorEvt', paginatorEvt);
    this.userSearchService.setPaginator(paginatorEvt);
  }

}
