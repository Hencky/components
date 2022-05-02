import { TableProps } from '@pms/ui';

export interface RecordType {
  a: number;
  b: number;
  c: number;
  id: string;
}

export const columns = [
  {
    title: 'title1',
    dataIndex: 'a',
    key: 'title1',
  },
  {
    title: 'title2',
    dataIndex: 'b',
    key: 'title3',
  },
];

export const remoteDataSource: TableProps['remoteDataSource'] = (params) => {
  console.log('params', params);
  const { current, size } = params;
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        ...params,
        total: 100,
        records: new Array(10).fill(0).map((item, index) => {
          return {
            a: (current - 1) * size + index,
            b: (current - 1) * size + index,
            c: (current - 1) * size + index,
            id: `${(current - 1) * size + index}`,
          };
        }),
      };
      resolve(data);
    }, 2000);
  });
};
