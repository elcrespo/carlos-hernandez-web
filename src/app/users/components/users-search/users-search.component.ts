import {Component, Inject, OnInit} from '@angular/core';
import {Filter} from "../users-search-form/users-search-form.component";
import { filter, Observable, shareReplay} from "rxjs";
import {Paginator, PaginatorEvt} from "../../domain/models/user-entity";
import {User} from "../../domain/models/user";
import UserSearchDisplayerRepository from "../../domain/ports/user-search-displayer.repository";

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UsersSearchComponent implements OnInit {
  pageSizeOptions = [9, 20, 50];
  users$: Observable<User[]> = this.userSearchService.users$.pipe(filter(Boolean));
  pagination$: Observable<Paginator> = this.userSearchService.pagination$.pipe(shareReplay(1));
  isLoadingData$: Observable<boolean> = this.userSearchService.isLoadingData$;
  constructor(@Inject('UserSearchDisplayerRepository') private userSearchService: UserSearchDisplayerRepository) { }

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
