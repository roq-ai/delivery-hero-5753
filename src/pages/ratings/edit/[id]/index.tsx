import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getRatingById, updateRatingById } from 'apiSdk/ratings';
import { ratingValidationSchema } from 'validationSchema/ratings';
import { RatingInterface } from 'interfaces/rating';
import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';

function RatingEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<RatingInterface>(
    () => (id ? `/ratings/${id}` : null),
    () => getRatingById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: RatingInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateRatingById(id, values);
      mutate(updated);
      resetForm();
      router.push('/ratings');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<RatingInterface>({
    initialValues: data,
    validationSchema: ratingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Ratings',
              link: '/ratings',
            },
            {
              label: 'Update Rating',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Rating
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Rating Rating"
            formControlProps={{
              id: 'rating_rating',
              isInvalid: !!formik.errors?.rating_rating,
            }}
            name="rating_rating"
            error={formik.errors?.rating_rating}
            value={formik.values?.rating_rating}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('rating_rating', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.review}
            label={'Review'}
            props={{
              name: 'review',
              placeholder: 'Review',
              value: formik.values?.review,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="review_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Review Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.review_date ? new Date(formik.values?.review_date) : null}
              onChange={(value: Date) => formik.setFieldValue('review_date', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<RestaurantInterface>
            formik={formik}
            name={'restaurant_id'}
            label={'Select Restaurant'}
            placeholder={'Select Restaurant'}
            fetcher={getRestaurants}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/ratings')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'rating',
    operation: AccessOperationEnum.UPDATE,
  }),
)(RatingEditPage);
