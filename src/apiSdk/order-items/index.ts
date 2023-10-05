import queryString from 'query-string';
import { OrderItemInterface, OrderItemGetQueryInterface } from 'interfaces/order-item';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getOrderItems = async (
  query?: OrderItemGetQueryInterface,
): Promise<PaginatedInterface<OrderItemInterface>> => {
  return fetcher('/api/order-items', {}, query);
};

export const createOrderItem = async (orderItem: OrderItemInterface) => {
  return fetcher('/api/order-items', { method: 'POST', body: JSON.stringify(orderItem) });
};

export const updateOrderItemById = async (id: string, orderItem: OrderItemInterface) => {
  return fetcher(`/api/order-items/${id}`, { method: 'PUT', body: JSON.stringify(orderItem) });
};

export const getOrderItemById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/order-items/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteOrderItemById = async (id: string) => {
  return fetcher(`/api/order-items/${id}`, { method: 'DELETE' });
};
