
import { User } from "../utils/model/user";
import { APIResponse } from "../utils/types";
import { BaseAPI } from "./base.api";

export type FetchParams = {
  page?: number
  pageSize?: number
  results?: number
  sortOrder?: string
  sortBy?: string
  keyword?: string
  gender?: string
}

export default class UserAPI extends BaseAPI {
  constructor() {
    super('/api')
  }

  public async getUserList(params: FetchParams): Promise<APIResponse<User[]>> {
    return this.makeRequest('GET', '', params)
  }
}