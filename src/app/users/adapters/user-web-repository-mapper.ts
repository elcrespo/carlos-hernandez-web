import { Mapper } from "../../core/base/mapper";
import { UserEntity } from "../domain/models/user-entity";
import {UserWebEntity} from "./user-web-repository";

export class UserWebRepositoryMapper implements Mapper<UserWebEntity, UserEntity> {
  mapFrom(param: UserWebEntity): UserEntity {
    return {
      paginator: {
        hasNextPage: false,
        hasPreviousPage: false,
        totalCount: param.total_count,
        sizePerPage: 3,
        page: {
          current: 1,
          of: 1
        }
      },
      items: param.items.map(item => ({
        login: item.login,
        avatar_url: item.avatar_url,
        type: item.type
      }))
    };
  }
}
