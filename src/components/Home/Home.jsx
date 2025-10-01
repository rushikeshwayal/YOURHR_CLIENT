
import '../../index.css'
import LandingHome from "./LandingHome";
import Nonummy from './Nonummy';
import PlantCare from './PlantCare';
import Testimonial from '../Testimonial/Testimonial';
import Footer from '../Footer/Footer';
import Hero from './Hero';
import Feature from './Features';
function Home() {
  return (
    <div className="">
      <LandingHome />
      <Feature />
      <Nonummy />
      <PlantCare />
      <Hero />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default Home;