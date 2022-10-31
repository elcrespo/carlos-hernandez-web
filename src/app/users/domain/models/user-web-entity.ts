import { UserWeb } from "./user-web";

export interface UserWebEntity {
  total_count: number;
  incomplete_results: boolean;
  items: UserWeb[]
}
