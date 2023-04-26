import request from './request';
import { AxiosRequestConfig } from 'axios';
import { PageData } from '@/interface';
import { User } from '@/interface/user';

//获取用户列表
export const getUsers = (params?: object, config?: AxiosRequestConfig): Promise<PageData<User>> =>
  request({
    url: `/v1/console/users`,
    method: 'get',
    params,
    ...config,
  });
