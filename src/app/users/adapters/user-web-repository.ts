import { Injectable } from '@angular/core';
import UserRepository, {UserQueryParams} from "../domain/ports/user.repository";
import {map, Observable} from "rxjs";
import { UserWebRepositoryMapper } from "./user-web-repository-mapper";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserEntity} from "../domain/models/user-entity";

export interface UserWeb {
  id: number;
  login: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: string;
  score: number;
}

export interface UserWebEntity {
  total_count: number;
  incomplete_results: boolean;
  items: UserWeb[]
}

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
