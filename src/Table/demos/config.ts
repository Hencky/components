import { TableProps } from '@pms/ui';

export const columns = [];

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
