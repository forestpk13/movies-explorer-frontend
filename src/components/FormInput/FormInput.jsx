import './FormInput.css';

function FormInput({
  title,
  name,
  error,
  isProfilePage,
  value = '',
  ...restProps
}) {
  const formInputClasses = `
    form-input__input
    ${error ? 'form-input__input-with-error' : ''} ${isProfilePage ? 'form-input__input_page_profile' : ''}`

  return (
    <div className={`form-input ${isProfilePage ? 'form-input_page_profile' : ''}`}>
      <label
        className={`form-input__title ${isProfilePage ? 'form-input__title_page_profile' : ''}`}
        htmlFor={name}
      >
        {title}
      </label>
      <input
        className={formInputClasses}
        id={name}
        name={name}
        value={value}
        {...restProps}
      />
      <span
        className={`form-input__error-message ${isProfilePage ? 'form-input__error-message_page_profile' : ''}`}
      >{error}</span>
    </div>
  )
}

export default FormInput;