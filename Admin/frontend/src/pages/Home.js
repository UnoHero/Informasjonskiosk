import { useSpring, animated } from "react-spring";
import styled from "styled-components";

// pages & components
import Header from '../components/Header'
import Footer from '../components/Footer'
import ControlPanel from '../components/ControlPanel'

const Control = styled.div`
  margin: auto;
`
const Home = () => {
  return (
    <div className="home">
      <Header />
      <Control>
        <ControlPanel/> 
      </Control>
      <Footer />
    </div>
  );
}

export default Home;
