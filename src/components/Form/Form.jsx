import FormInput from '../FormInput/FormInput';
import { EMAIL_REGEXP } from '../../utils/constants';
import useValidationOfForm from '../../utils/hooks/useValidationOfForm';
import './Form.css';


function Form({ onSubmit, page }) {
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

  let isRegisterPage = page === 'register' ? true : false;
  let isProfilePage = page === 'profile' ? true : false;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form className={`form`} onSubmit={handleSubmit}>
      <fieldset className='form__fields'>
      {(isRegisterPage || isProfilePage) && <FormInput
        value={values.name}
        error={errors.name}
        onChange={onChange}
        name='name'
        title='Имя'
        type='text'
        isProfilePage={isProfilePage}
        required
        minLength='3'
      />}
      <FormInput
        value={values.email}
        error={errors.email}
        onChange={onChange}
        name='email'
        title='E-mail'
        type='email'
        isProfilePage={isProfilePage}
        pattern={EMAIL_REGEXP}
        required
      />
      {!isProfilePage && <FormInput
        value={values.password}
        error={errors.password}
        onChange={onChange}
        name='password'
        title='Пароль'
        type='password'
        isProfilePage={isProfilePage}
        minLength='6'
        required
      />}

      </fieldset>
      <div className='form__button-container'>
          <button className={`form__submit-button ${isProfilePage && 'form__submit-button_page_profile'}`} type='submit' disabled={!isValid}>{isProfilePage ? 'Редактировать' : buttonTextCheck.text}</button>
      </div>
    </form>
  )
}

export default Form;