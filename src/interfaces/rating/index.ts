import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';
import { GetQueryInterface } from 'interfaces';

export interface RatingInterface {
  id?: string;
  rating_rating: number;
  review?: string;
  review_date: any;
  user_id: string;
  restaurant_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  restaurant?: RestaurantInterface;
  _count?: {};
}

export interface RatingGetQueryInterface extends GetQueryInterface {
  id?: string;
  review?: string;
  user_id?: string;
  restaurant_id?: string;
}
