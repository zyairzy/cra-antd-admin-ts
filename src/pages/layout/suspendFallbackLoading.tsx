import { Spin, Alert } from 'antd';

interface FallbackMessageProps {
  message: string;
  description?: string;
}

const SuspendFallbackLoading = ({ message, description }: FallbackMessageProps) => {
  return (
    <Spin tip="加载中...">
      <Alert message={message} description={description} type="info" />
    </Spin>
  );
};

export default SuspendFallbackLoading;
