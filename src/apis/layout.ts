import request from './request';
import { AxiosRequestConfig } from 'axios';
import { MenuList } from '@/interface/layout/menu.interface';

/** 获取菜单列表接口 */
export const getMenuList = (params?: object, config?: AxiosRequestConfig): Promise<MenuList> =>
  request({
    url: `/v1/console/menu`,
    method: 'get',
    params,
    ...config,
  });
