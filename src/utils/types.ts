export interface APIResponse<T> {
  results: T
  info: ResponseInfo
}

export interface ResponseInfo {
  seed: string
  results: number,
  page: number,
  version: string
}