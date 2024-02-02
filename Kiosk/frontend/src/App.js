import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages 
import Home from './pages/Home'

// components
import CoC from "./components/CoC"
import Medie from "./components/Medie"
import Swgoh from "./components/Swgoh"
import Weather from "./components/Weather"


function App() {

  let components = [CoC, Medie, Swgoh, Weather] 

  return (
    <div className="App">
      <div className="App">
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
