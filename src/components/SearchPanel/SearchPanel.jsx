import './SearchPanel.css';

function SearchPanel({
  onSearch,
  value,
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
    <form className='search-panel' onSubmit={handleSubmit} noValidate>
      <div className='search-panel__line-container'>
        <input
          type='text'
          name='filmSearch'
          placeholder='Фильм'
          className='search-panel__input'
          value={value}
          onChange={onChange}
          {...restProps}
        />
        <button
          type='submit'
          className='search-panel__button'>
        </button>
      </div>
      <div className='search-panel__toggle'>
        <label className='search-panel__toggle-label' htmlFor='short-films'>
          <input
            className='search-panel__toggle-checkbox-invisible'
            type='checkbox'
            name='short-films'
            id='short-films'
            checked={isToggle}
            onChange={onToggle}
          />
          <span className={`search-panel__toggle-checkbox-visible ${isToggle && 'search-panel__toggle-checkbox-visible_checked'}`} />
            Короткометражки
        </label>
      </div>
    </form>
  );
};

export default SearchPanel;