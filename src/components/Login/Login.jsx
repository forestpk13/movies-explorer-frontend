import { EMAIL_PATTERN } from '../../utills/constants';
import useFormWithValidation from '../../utills/hooks/useFormWithValidation';
import AuthPage from '../AuthPage/AuthPage';
import FormInput from '../FormInput/FormInput';

function Login({ onSubmit, error, inLoading }) {

  const {
    values,
    errors,
    isValid,
    onChange,
  } = useFormWithValidation();

  const handleSubmit = () => onSubmit(values);

  return (
    <AuthPage
      type='login'
      heading='Рады видеть!'
      onSubmit={handleSubmit}
      isValid={isValid}
      error={error}
      inLoading={inLoading}
    >
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

export default Login;
