import Banner from "../Banner/Banner";
import AboutDiploma from "../AboutDiploma/AboutDiploma";
import Technologies from "../Technologies/Technologies";
import Student from "../Student/Student";
import Projects from "../Projects/Projects";

function Landing() {
  return (
    <main className='landing'>
      <Banner />
      <AboutDiploma />
      <Technologies />
      <Student />
      <Projects />
    </main>
  )
};

export default Landing;
