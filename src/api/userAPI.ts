import { User } from "@app/utils/model/user";
import { APIResponse } from "@app/utils/types";
import { BaseAPI } from "./base.api";

export default class UserAPI extends BaseAPI {
  constructor() {
    super('/api')
  }

  public async getUserList(): Promise<APIResponse<User[]>> {
    return this.makeRequest('GET', '', {})
  }
}