import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerProfileInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  customer_id?: string;
  preferred_cuisine?: string;

  user?: UserInterface;
  _count?: {};
}

export interface CustomerProfileGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_id?: string;
  preferred_cuisine?: string;
}
