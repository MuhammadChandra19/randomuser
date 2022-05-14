import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, Method } from 'axios';

export class BaseAPI {
  private baseURL: string
  private path: string
  private axiosInstance: AxiosInstance

  constructor(path: string) {
    this.path = path
    this.baseURL = 'https://randomuser.me/'
    this.axiosInstance = axios.create()

    this.axiosInstance.interceptors.response.use(
      response => response.data,
      (error: AxiosError) =>  Promise.reject(error)
    )
  }

  async makeRequest<T>(
    method: Method, 
    url: string, 
    data: any = {}, 
    addtionalConfig = {},
    headers: AxiosRequestHeaders = {}
  ): Promise<T> {
    let header: AxiosRequestHeaders = {
      "Content-Type": "application/json"
    };

    if (Object.keys(headers).length > 0) {
      header = headers;
    }

    const config: AxiosRequestConfig = {
      baseURL: this.baseURL,
      method: <Method>method,
      url: `${this.path}${url}`,
      headers: header,
      ...addtionalConfig
    };

    console.log(config)

    if (method === "GET") {
      Object.keys(data).forEach(key => {
        if ((data[key] === null || data[key] === "")) {
          delete data[key]
        }
      });
      config.params = data
    } else {
      config.data = data
    }

    return this.axiosInstance.request(config)
  }
}