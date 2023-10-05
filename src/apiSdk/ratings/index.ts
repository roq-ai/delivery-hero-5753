import queryString from 'query-string';
import { RatingInterface, RatingGetQueryInterface } from 'interfaces/rating';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getRatings = async (query?: RatingGetQueryInterface): Promise<PaginatedInterface<RatingInterface>> => {
  return fetcher('/api/ratings', {}, query);
};

export const createRating = async (rating: RatingInterface) => {
  return fetcher('/api/ratings', { method: 'POST', body: JSON.stringify(rating) });
};

export const updateRatingById = async (id: string, rating: RatingInterface) => {
  return fetcher(`/api/ratings/${id}`, { method: 'PUT', body: JSON.stringify(rating) });
};

export const getRatingById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/ratings/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteRatingById = async (id: string) => {
  return fetcher(`/api/ratings/${id}`, { method: 'DELETE' });
};
