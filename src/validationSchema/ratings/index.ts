import * as yup from 'yup';

export const ratingValidationSchema = yup.object().shape({
  rating_rating: yup.number().integer().required(),
  review: yup.string().nullable(),
  review_date: yup.date().required(),
  user_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
});
