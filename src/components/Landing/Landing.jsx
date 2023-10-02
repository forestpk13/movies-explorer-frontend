import Banner from "../Banner/Banner";
import AboutDiploma from "../AboutDiploma/AboutDiploma";
import Technologies from "../Technologies/Technologies";
import Student from "../Student/Student";

function Landing() {
  return (
    <main className='landing'>
      <Banner />
      <AboutDiploma />
      <Technologies />
      <Student />
    </main>
  )
};

export default Landing;
