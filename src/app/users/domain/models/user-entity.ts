import { User } from "./user";

export interface PaginatorEvt {
  length: number;
  pageIndex: number;
  pageSize: number;
}

export interface Paginator {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
  sizePerPage: number;
  page: {
    current: number;
    of: number;
  }
}
export interface UserEntity {
  paginator: Paginator;
  items: User[]
}
