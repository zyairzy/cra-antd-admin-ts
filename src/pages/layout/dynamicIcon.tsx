import { UserOutlined, AppstoreOutlined, TableOutlined, QuestionOutlined } from '@ant-design/icons';

interface DynamicIconProps {
  type: string;
  [key: string]: any;
}

const DynamicIcon = ({ type, ...rest }: DynamicIconProps) => {
  const getIcon = iconType =>
    ({
      QuestionOutlined: <QuestionOutlined {...rest} />,
      UserOutlined: <UserOutlined {...rest} />,
      AppstoreOutlined: <AppstoreOutlined {...rest} />,
      TableOutlined: <TableOutlined {...rest} />,
    }[iconType]);

  return getIcon(type) || <QuestionOutlined {...rest} />;
};

export default DynamicIcon;
