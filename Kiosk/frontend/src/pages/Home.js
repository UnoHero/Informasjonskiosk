// components
import CoC from "../components/CoC"
import Medie from "../components/Medie"
import Swgoh from "../components/Swgoh"
import Weather from "../components/Weather"
import DB from "../components/DB"

const Home = () => {

  let components = [CoC, Medie, Swgoh, Weather, DB] 

  return (
    <div className="home">
      <CoC/>
    </div>
    )
  }
  
  export default Home