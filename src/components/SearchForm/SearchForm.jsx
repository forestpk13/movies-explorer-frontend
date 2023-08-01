import './SearchForm.css';

function SearchForm({
  onSearch,
  value,
  validationMessage,
  onChange,
  onToggle,
  isToggle,
  onSubmit,
  ...restProps
}) {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className='search-form' onSubmit={handleSubmit} noValidate>
      <div className='search-form__inner'>
      <div className='search-form__search-icon'></div>
        <input
          type='text'
          name='filmSearch'
          placeholder='Фильм'
          className='search-form__input'
          value={value}
          onChange={onChange}
          {...restProps}
        />
        <span className='search-form__error'>{validationMessage}</span>
        <div className='search-form__side-block'>
          <button
            type='submit'
            className='search-form__button'></button>
          <div className='search-form__divider'></div>
          <div className='search-form__toggle'>
            <label className='search-form__toggle-label' htmlFor='short-films'>
              <input
                className='search-form__toggle-checkbox-invisible'
                type='checkbox'
                name='short-films'
                id='short-films'
                checked={isToggle}
                onChange={onToggle}
              />
              <span className={`search-form__toggle-checkbox-visible ${isToggle && 'search-form__toggle-checkbox-visible_checked'}`} />
              Короткометражки
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
