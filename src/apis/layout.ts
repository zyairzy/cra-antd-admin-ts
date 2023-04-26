import request from './request';
import { AxiosRequestConfig } from 'axios';

/** 获取菜单列表接口 */
export const getMenuList = (params?: object, config?: AxiosRequestConfig): Promise<Record<string, any>> =>
  request({
    url: `/api/v1/user/menu`,
    method: 'get',
    params,
    ...config,
  });
