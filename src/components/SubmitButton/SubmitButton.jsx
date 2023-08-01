import './SubmitButton.css';

function SubmitButton({ children, ...restProps }) {
  return <button className='submit-button' type='submit' {...restProps}>{children}</button>
}

export default SubmitButton;
