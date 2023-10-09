import './SectionTitle.css';

function SectionTitle ({ title }) {
  return (
    <div className='section-title'>
      <h2 className='section-title__title'>{title}</h2>
      <div className='section-title__underline'></div>
    </div>
  )
};

export default SectionTitle;
