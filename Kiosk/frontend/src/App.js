import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages 
import Home from './pages/Home'

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
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
