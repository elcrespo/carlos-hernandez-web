import { Injectable } from '@angular/core';
import UserRepository, {UserQueryParams} from "./user.repository";
import {map, Observable} from "rxjs";
import { UserWebRepositoryMapper } from "./user-web-repository-mapper";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserWebEntity} from "../domain/models/user-web-entity";
import {UserEntity} from "../domain/models/user-entity";

@Injectable({
  providedIn: 'root'
})
export class UserWebRepository implements UserRepository {
  mapper = new UserWebRepositoryMapper();
  // TODO: move this URL to a setting that depends on the environment
  apiBaseUrl = "https://api.github.com/";

  constructor(private http: HttpClient) { }

  getByLogin(queryParams: UserQueryParams): Observable<UserEntity> {
    const { page, perPage, q } = queryParams;
    const params = new HttpParams()
      .set('q', q)
      .set('per_page', perPage)
      .set('page', page);
    const queryUrl = this.apiBaseUrl + 'search/users' + '?' + params.toString();

    return this.http.get<UserWebEntity>(queryUrl).pipe(
      map(response => this.mapper.mapFrom(response)),
      map(reponseMapped => {
        //TODO: move this to a named function
        const totalCount = reponseMapped.paginator.totalCount;
        const hasNextPage = (totalCount - (page * perPage)) > 0;
        const hasPreviousPage = totalCount > perPage && page > 1;
        const totalPages = totalCount > 0 ? Math.floor(totalCount/perPage) : 0;
        const pagination = {
          hasNextPage,
          hasPreviousPage,
          totalCount,
          sizePerPage: perPage,
          page: {
            current: page,
            of: totalPages
          }
        };
        return {
          ...reponseMapped,
          paginator: pagination
        }
      })
    );
  }
}
