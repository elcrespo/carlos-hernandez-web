import {Observable} from "rxjs";
import {User} from "../models/user";
import {Paginator, PaginatorEvt} from "../models/user-entity";
import {Filter} from "../../components/users-search-form/users-search-form.component";

export default interface UserSearchDisplayerRepository {
  users$: Observable<User[]>;
  pagination$: Observable<Paginator>;
  isLoadingData$: Observable<boolean>;
  setFilter(filter: Filter): void;
  setPaginator(paginator: PaginatorEvt): void;
}
