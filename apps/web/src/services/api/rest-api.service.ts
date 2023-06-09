import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { wrapTokenMiddleware } from '../../interceptors/axios.interceptor';
import { BASE_API_URL } from '../../constants/environment';

const BASE_URL = (process.env.BASE_API_URL || BASE_API_URL) + '/api/';

export interface GenericSuccessResponse {
  success: string;
}

class RestApi {
  protected axios: AxiosInstance | null = null;

  protected baseUrl = BASE_URL;

  constructor() {
    this.createInstance();
  }

  protected createInstance() {
    const instanceConfig = this.getInstanceConfig();
    const axiosInstance = axios.create(instanceConfig);
    this.axios = wrapTokenMiddleware(axiosInstance);
  }

  protected getInstanceConfig(): AxiosRequestConfig<any> {
    return {
      baseURL: BASE_URL,
    };
  }

  public async getAll(url: string, params?: Record<string, string>) {
    const response = await this.axios?.get(url, {
      params,
    });
    return response?.data;
  }

  public async getOne(url: string, params?: Record<string, string>) {
    const response = await this.axios?.get(url, {
      params,
    });
    return response?.data;
  }

  public async post(url: string, payload: any, params?: Record<string, string>) {
    const response = await this.axios?.post(url, payload, {
      params,
    });
    return response?.data;
  }

  public async put(url: string, payload: any, params?: Record<string, string>) {
    const response = await this.axios?.put(url, payload, {
      params,
    });
    return response?.data;
  }

  public async delete(url: string, params?: Record<string, string>) {
    const response = await this.axios?.delete(url, {
      params,
    });
    return response?.data;
  }
}

export { RestApi };
