import queryString from 'query-string';
import { CustomerProfileInterface, CustomerProfileGetQueryInterface } from 'interfaces/customer-profile';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCustomerProfiles = async (
  query?: CustomerProfileGetQueryInterface,
): Promise<PaginatedInterface<CustomerProfileInterface>> => {
  return fetcher('/api/customer-profiles', {}, query);
};

export const createCustomerProfile = async (customerProfile: CustomerProfileInterface) => {
  return fetcher('/api/customer-profiles', { method: 'POST', body: JSON.stringify(customerProfile) });
};

export const updateCustomerProfileById = async (id: string, customerProfile: CustomerProfileInterface) => {
  return fetcher(`/api/customer-profiles/${id}`, { method: 'PUT', body: JSON.stringify(customerProfile) });
};

export const getCustomerProfileById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/customer-profiles/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteCustomerProfileById = async (id: string) => {
  return fetcher(`/api/customer-profiles/${id}`, { method: 'DELETE' });
};
