import './FormInput.css';

function FormInput({
  title,
  name,
  variant,
  error,
  value = '',
  ...restProps
}) {
  const formInputClasses = `
    form-input__input
    form-input__input_variant_${variant} 
    ${error? `form-input__input_variant_${variant}-with-error` : ''}`

  return (
    <div className={`form-input form-input_variant_${variant}`}>
      <label
        className={`form-input__title_variant_${variant}`}
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
        className={`form-input__error-message form-input__error-message_variant_${variant}`}
      >{error}</span>
    </div>
  )
}

export default FormInput;
