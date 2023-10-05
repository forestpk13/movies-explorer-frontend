import './FormInput.css';

function FormInput({
  title,
  name,
  error,
  value = '',
  ...restProps
}) {
  const formInputClasses = `
    form-input__input
    ${error? 'form-input__input-with-error' : ''}`

  return (
    <div className={'form-input'}>
      <label
        className={'form-input__title'}
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
        className={'form-input__error-message'}
      >{error}</span>
    </div>
  )
}

export default FormInput;