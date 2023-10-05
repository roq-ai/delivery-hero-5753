import * as yup from 'yup';

export const customerProfileValidationSchema = yup.object().shape({
  preferred_cuisine: yup.string().nullable(),
  customer_id: yup.string().nullable(),
});
