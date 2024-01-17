import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Swgoh from "./components/Swgoh"


function App() {
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
          <Swgoh/>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
