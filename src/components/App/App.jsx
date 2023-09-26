import { Route, Routes } from 'react-router-dom';
import Landing from '../Landing/Landing';

import './App.css';

function App() {
  return (
      <div className="page">
          <>
            <Routes>
              <Route path='/' element={<Landing />} />
            </Routes>
          </>
      </div>
  );
}

export default App;
