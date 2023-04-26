export interface PageData<T> {
  current: number; // 当前页
  size: number; // 每页大小
  total: number; // 总数
  pages?: number; // 总页数
  records: T[];
}
