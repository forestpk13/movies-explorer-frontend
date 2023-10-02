import './SectionTitle.css';

function SectionTitle ({ title }) {
  return (
    <>
      <h2 className='section-title'>{title}</h2>
      <div className='section-title__underline'></div>
    </>
  )
};

export default SectionTitle;
