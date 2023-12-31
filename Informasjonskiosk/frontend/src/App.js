import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Media from "./components/Medie"


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
          <Media/>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
