import FormInput from '../FormInput/FormInput';
import { EMAIL_REGEXP } from '../../utils/constants';
import useValidationOfForm from '../../utils/hooks/useValidationOfForm';
import './Form.css';


function Form({ page }) {
  const {
    values,
    errors,
    isValid,
    onChange,
  } = useValidationOfForm();

  const buttonTextCheck = page === 'login'
    ? {
      text: 'Войти',
    } : {
      text: 'Зарегистрироваться',
    };

  return (
    <form className={`form`}>
      <fieldset className='form__fields'>
      <FormInput
        value={values.name}
        error={errors.name}
        onChange={onChange}
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
        name='email'
        title='E-mail'
        type='email'
        pattern={EMAIL_REGEXP}
        required
      />
      <FormInput
        value={values.password}
        error={errors.password}
        onChange={onChange}
        name='password'
        title='Пароль'
        type='password'
        minLength='6'
        required
      />

      </fieldset>
      <div className='form__button-container'>
          <button className='form__submit-button' type='submit' disabled={!isValid}>{buttonTextCheck.text}</button>
      </div>
    </form>
  )
}

export default Form;