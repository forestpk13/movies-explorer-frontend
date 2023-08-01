import './SectionHeading.css';

const SectionHeading = ({ title }) => {
  return (
    <>
      <h2 className='section-heading'>{title}</h2>
      <div className='section-heading__line'></div>
    </>
  )
};

export default SectionHeading;
