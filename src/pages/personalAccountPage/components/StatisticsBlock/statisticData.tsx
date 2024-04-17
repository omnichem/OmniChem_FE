interface IStatisticData {
  id: number;
  statisticName: string;
  totalCount: number;
  percentage: string;
}
export const statiscticData: IStatisticData[] = [
  {
    id: 1,
    statisticName: 'Всего посетителей',
    totalCount: 11300,
    percentage: '+ 2.5',
  },
  {
    id: 2,
    statisticName: 'Новых посетителей',
    totalCount: 8236,
    percentage: '-1.2',
  },
  {
    id: 3,
    statisticName: 'Лидов',
    totalCount: 2352,
    percentage: '+ 11',
  },
  {
    id: 4,
    statisticName: 'Запрос образцов',
    totalCount: 1000,
    percentage: '+ 10',
  },
  {
    id: 5,
    statisticName: 'Запрос КП',
    totalCount: 800,
    percentage: '+ 5.2',
  },
];
