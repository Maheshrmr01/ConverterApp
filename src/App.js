import React from 'react';
// import ExcelUploader from './components/ExcelUploader';
import Converter from './components/converter/Converter';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Department Of Information Technology</h1>
      <Converter/>
      <Routes>
        <Route path='/' element={<></>}/>
      </Routes>
    </div>
  );
}

export default App;
