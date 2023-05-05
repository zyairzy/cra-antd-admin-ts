import request from './request';
import { AxiosRequestConfig } from 'axios';
import { PageData } from '@/interface';
import { User, UserUnlockStatus, UserCreateParam } from '@/interface/user';

//获取用户列表
export const getUsers = (params?: object, config?: AxiosRequestConfig): Promise<PageData<User>> =>
  request({
    url: `/v1/console/users`,
    method: 'get',
    params,
    ...config,
  });

export const getUserById = (userId: string, config?: AxiosRequestConfig): Promise<User> =>
  request({
    url: `/v1/console/users/${userId}`,
    method: 'get',
    ...config,
  });

export const getUserUnlockStatus = (userId: string, config?: AxiosRequestConfig): Promise<UserUnlockStatus> =>
  request({
    url: `/v1/console/users/${userId}/unlock-status`,
    method: 'get',
    ...config,
  });

export const createUser = (data?: UserCreateParam, config?: AxiosRequestConfig): Promise<any> =>
  request({
    url: `/v1/console/users`,
    method: 'post',
    data,
    ...config,
  });

export const unlockUser = (userId: string, config?: AxiosRequestConfig): Promise<any> =>
  request({
    url: `/v1/console/users/${userId}/unlock-status`,
    method: 'put',
    data: {
      unlockStatus: true,
    },
    ...config,
  });

export const enableUser = (userId: string, enabledStatus: boolean, config?: AxiosRequestConfig): Promise<any> =>
  request({
    url: `/v1/console/users/${userId}/enabled-status`,
    method: 'put',
    data: {
      enableStatus: enabledStatus,
    },
    ...config,
  });

export const resetUserPsw = (userId: string, password: string, config?: AxiosRequestConfig): Promise<any> =>
  request({
    url: `/v1/console/users/${userId}/password`,
    method: 'put',
    data: {
      password: password,
      temporary: true,
    },
    ...config,
  });
