import { ItemTypeOptions } from '../../pocketbase-types';
import { StockItem } from '../pages/officer/stocks/Stocks';

export const dummyStockItems: StockItem[] = [
  {
    name: 'Wooden Chair',
    tag: ItemTypeOptions.Office,
    id: '0',
    remaining: 6,
    description: 'Upuan ni Andrei',
    total: 10,
  },
  {
    name: 'Goofy Mouse',
    tag: ItemTypeOptions.IT,
    id: '1',
    remaining: 0,
    description: 'Mouse ni Andrei',
    total: 20,
  },
  {
    name: 'AMD A6 Laptop',
    tag: ItemTypeOptions.IT,
    id: '2',
    remaining: 2,
    description: 'Laptop ko',
    total: 1,
  },
];
