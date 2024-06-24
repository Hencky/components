import { Random } from 'mockjs';
import type { TableProps, ColumnType } from 'lucky-bird-ui';

import './style.less';

const status = ['dispatching', 'success', 'warning'];

const level = ['High', 'Medium', 'Low'];

const recipientName = ['Lucy', 'Lily', 'Jack', 'Mocy'];

const recipientTime = ['morning', 'afternoon', 'night'];

const priceProject = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
export interface RecordType {
  a: number;
  b: number;
  c: number;
  id: string;
}

export const columns: ColumnType<RecordType>[] = [
  {
    key: 'id',
    title: 'ID',
    sorter: true,
  },
  {
    key: 'senderName',
    title: '发送人',
    tooltip: '提示',
  },
  {
    key: 'recipientName',
    title: '接收人',
  },
  {
    key: 'status',
    title: '状态',
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
            id: `${(current - 1) * size + index}`,
            name: Random.name(),
            senderName: Random.name(),
            senderNumber: Random.id(),
            senderAddress: Random.sentence(2, 3),
            recipientName: Random.pick(recipientName),
            recipientNumber: Random.id(),
            recipientAddress: Random.sentence(2, 3),
            recipientTime: Random.pick(recipientTime),
            time: [Random.date('yyyy-MM-dd'), Random.date('yyyy-MM-dd')],
            priceProject: Random.pick(priceProject),
            address: Random.city(true),
            status: Random.pick(status),
            level: Random.pick(level),
            description: Random.sentence(3, 4),
            times: Random.natural(),
            createTime: Random.date('MM-dd HH:mm:ss'),
            ruler: [[{ type: 'price', comparator: 'lt', value: '100' }]],
          };
        }),
      };

      console.log('result', data);
      resolve(data);
    }, 2000);
  });
};

export const remoteDataSourceSingle: TableProps['remoteDataSource'] = (params) => {
  console.log('params', params);
  const { current, size } = params;
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = new Array(10).fill(0).map((item, index) => {
        return {
          id: `${(current - 1) * size + index}`,
          name: Random.name(),
          senderName: Random.name(),
          senderNumber: Random.id(),
          senderAddress: Random.sentence(2, 3),
          recipientName: Random.pick(recipientName),
          recipientNumber: Random.id(),
          recipientAddress: Random.sentence(2, 3),
          recipientTime: Random.pick(recipientTime),
          time: [Random.date('yyyy-MM-dd'), Random.date('yyyy-MM-dd')],
          priceProject: Random.pick(priceProject),
          address: Random.city(true),
          status: Random.pick(status),
          level: Random.pick(level),
          description: Random.sentence(3, 4),
          times: Random.natural(),
          createTime: Random.date('MM-dd HH:mm:ss'),
          ruler: [[{ type: 'price', comparator: 'lt', value: '100' }]],
        };
      });

      console.log('result', data);
      resolve(data);
    }, 2000);
  });
};
