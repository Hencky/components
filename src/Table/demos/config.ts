import { TableProps } from '@pms/ui';
import { Random } from 'mockjs';

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

export const columns = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
  },
  {
    key: 'senderName',
    dataIndex: 'senderName',
    title: '发送人',
  },
  {
    key: 'recipientName',
    dataIndex: 'recipientName',
    title: '接收人',
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: '状态',
  },
  {
    key: 'operator',
    title: '操作',
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
            id: Random.id(),
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
