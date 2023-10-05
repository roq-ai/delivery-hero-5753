import { MenuInterface } from 'interfaces/menu';
import { OrderInterface } from 'interfaces/order';
import { GetQueryInterface } from 'interfaces';

export interface OrderItemInterface {
  id?: string;
  quantity: number;
  price: number;
  menu_id: string;
  order_id: string;
  created_at?: any;
  updated_at?: any;

  menu?: MenuInterface;
  order?: OrderInterface;
  _count?: {};
}

export interface OrderItemGetQueryInterface extends GetQueryInterface {
  id?: string;
  menu_id?: string;
  order_id?: string;
}
