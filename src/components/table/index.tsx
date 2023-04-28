import React, { useState, forwardRef, useImperativeHandle, useRef, ReactNode } from 'react';
import { Table } from 'antd';
import useService from '@/hooks/tableHook';

/**
 * 封装列表、分页、多选、搜索组件
 * @param {RefType} ref 表格的实例，用于调用内部方法
 * @param {object[]} columns 表格列的配置
 * @param {function} apiFun 表格数据的请求方法
 * @param {object[]} searchConfigList 搜索栏配置
 * @param {function} beforeSearch 搜索前的操作（如处理一些特殊数据）
 * @param {function} onFieldsChange 处理搜索栏表单联动事件
 * @param {object} extraProps 额外的搜索参数（不在搜索配置内的）
 * @param {function} onSelectRow 复选框操作回调
 * @param {string} rowKey 表格行的key
 * @param {function} sortConfig 自定义表格排序字段
 * @param {function} expandedRowRender 额外的展开行
 * @param {function} onExpand 点击展开图标时触发
 * @param {string} rowClassName 表格行的样式名
 * @param {boolean} small 表格和分页的展示大小
 * @param {string[]} extraPagation 额外的分页大小
 */

interface TableProps {
  columns: object[];
  apiFun: (arg0?: unknown[]) => Promise<object>;
  ref?: RefType;
  searchConfigList?: object[];
  extraProps?: object;
  rowKey?: string;
  rowClassName?: string;
  small?: boolean;
  showHeader?: boolean;
  extraPagation?: string[];
  beforeSearch?: (arg0?: unknown) => void;
  onSelectRow?: (arg0?: string[], arg1?: string[]) => void;
  onFieldsChange?: (arg0?: unknown, arg1?: unknown) => void;
  sortConfig?: (arg0?: object) => any;
  expandedRowRender?: () => ReactNode;
  onExpand?: () => void;
}

// eslint-disable-next-line react/display-name
const MyTable = forwardRef((props: TableProps, ref: RefType) => {
  const {
    columns,
    apiFun,
    searchConfigList,
    extraProps,
    rowKey,
    rowClassName,
    small,
    showHeader,
    extraPagation,
    beforeSearch,
    onSelectRow,
    onFieldsChange,
    sortConfig,
    expandedRowRender,
    onExpand,
  } = props;

  // 初始参数
  const initParams = {
    ...extraProps,
    pageNum: 1,
    pageSize: 20,
  };

  // 多选框的选择值
  const [selectedKeys, setSelectedKeys] = useState([]);
  // 列表所有的筛选参数（包括搜索、分页、排序等）
  const [tableParams, setTableParams] = useState(initParams);
  // 列表排序参数
  const [sortParams, setSortParams] = useState({});
  // 列表分页参数
  const [curPageNo, setCurPageNo] = useState(initParams.pageNum);
  const [curPageSize, setCurPageSize] = useState(initParams.pageSize);

  const { loading = false, response }: CommonObjectType = useService(apiFun, tableParams);
  const { records: tableData = [], total = -1 } = response || {};

  // 列表复选框选中变化
  const onSelectChange = (selectedRowKeys: any[], selectedRows: any[]): void => {
    setSelectedKeys(selectedRowKeys);
    onSelectRow(selectedRowKeys, selectedRows);
  };
  // 复选框配置
  const rowSelection = {
    selectedRowKeys: selectedKeys,
    onChange: onSelectChange,
  };
  // 判断是否有复选框显示
  const showCheckbox = onSelectRow ? { rowSelection } : {};

  // 展开配置
  const expendConfig = {
    expandedRowRender,
    onExpand,
    rowClassName,
  };
  // 判断是否有展开行
  const showExpend = expandedRowRender ? expendConfig : {};

  // 表格和分页的大小
  const tableSize = small ? 'small' : 'middle';
  const pagationSize = small ? 'small' : 'default';

  // 分页、筛选、排序变化时触发
  const onTableChange = (pagination: CommonObjectType, filters: CommonObjectType, sorter: object): void => {
    // 如果有sort排序并且sort参数改变时，优先排序
    const sortObj = sortConfig ? sortConfig(sorter) : {};
    setSortParams(sortObj);

    const { current: pageNum, pageSize } = pagination;
    setCurPageNo(pageNum);
    setCurPageSize(pageSize);
    setTableParams({
      ...initParams,
      ...sortObj,
      pageNum,
      pageSize,
    });
  };

  return (
    <div>
      {/* 列表 */}
      <Table
        {...showCheckbox}
        {...showExpend}
        rowKey={rowKey}
        loading={loading}
        dataSource={tableData}
        columns={columns}
        onChange={onTableChange}
        size={tableSize}
        showHeader={showHeader}
        pagination={{
          size: pagationSize,
          total,
          pageSize: tableParams.pageSize,
          current: tableParams.pageNum,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['20', '50', '100', '200', ...extraPagation],
          showTotal: all => `共 ${all} 条`,
        }}
      />
    </div>
  );
});

MyTable.defaultProps = {
  searchConfigList: [],
  ref: null,
  extraProps: {},
  rowKey: 'id',
  rowClassName: '',
  small: false,
  showHeader: true,
  extraPagation: [],
  beforeSearch: () => {},
  onFieldsChange: () => {},
  sortConfig: () => {},
  expandedRowRender: null,
  onExpand: () => {},
};

export default MyTable;
