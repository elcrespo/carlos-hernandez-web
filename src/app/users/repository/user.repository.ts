import { User } from "../domain/models/user";
import { Observable } from "rxjs";
import {UserEntity} from "../domain/models/user-entity";

export interface UserQueryParams {
  perPage: number;
  page: number;
  q: string;
}

export default interface UserRepository {
  getByLogin(queryParams: UserQueryParams): Observable<UserEntity>
}
