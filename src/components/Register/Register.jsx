import { EMAIL_PATTERN } from '../../utills/constants';
import useFormWithValidation from '../../utills/hooks/useFormWithValidation';

import AuthPage from '../AuthPage/AuthPage';
import FormInput from '../FormInput/FormInput';

function Register({ onSubmit, error, inLoading }) {

  const {
    values,
    errors,
    isValid,
    onChange,
  } = useFormWithValidation();

  const handleSubmit = () => onSubmit(values);

  return (
    <AuthPage
      type='register'
      heading='Добро пожаловать!'
      isValid={isValid}
      onSubmit={handleSubmit}
      error={error}
      inLoading={inLoading}
    >
      <FormInput
        value={values.name}
        error={errors.name}
        onChange={onChange}
        variant='max'
        name='name'
        title='Имя'
        type='text'
        required
        minLength='3'
      />
      <FormInput
        value={values.email}
        error={errors.email}
        onChange={onChange}
        variant='max'
        name='email'
        title='E-mail'
        type='email'
        pattern={EMAIL_PATTERN}
        required
      />
      <FormInput
        value={values.password}
        error={errors.password}
        onChange={onChange}
        variant='max'
        name='password'
        title='Пароль'
        type='password'
        minLength='6'
        required
      />
    </AuthPage>
  );
}

export default Register;
