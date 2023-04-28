/**
 * tableHook 用于处理 Table组件的分页事件
 * 自定义的一个 hook，该 hook 封装了 ajax 请求中的 { loading, error, response } 三个基础逻辑；
 */
import { useEffect, useState, useCallback } from 'react';

export const useServiceCallback = (service: (arg0?: any) => Promise<object>): CommonObjectType[] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  // 使用 useCallback，来判断 service 是否改变
  const callback = useCallback(
    params => {
      setLoading(true);
      setError(null);
      service(params)
        .then(res => {
          setLoading(false);
          setResponse(res);
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [service]
  );
  return [callback, { loading, error, response }];
};

const useService = (service: (arg0?: any) => Promise<object>, params?: CommonObjectType): object => {
  const [callback, { loading, error, response }]: any[] = useServiceCallback(service);
  useEffect(() => {
    callback(params);
    return () => {};
  }, [callback, params]);
  return { loading, error, response };
};

export default useService;
