import React from 'react';
import Silos from './Componentes/Silos';
import './App.css';

function App() {
  
  return (
    
      <>
      <div className="App">
      <header className="App-header">
        <h1>
          Silos Monitoring
        </h1>
      </header>
    </div>
    <main role="main" className="flex-shrink-0 mt-5">
      <Silos/>
      </main>
      </>
  );
}

export default App;
