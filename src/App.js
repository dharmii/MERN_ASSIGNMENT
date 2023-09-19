// src/App.js
import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling
import UserInput from './components/UserInput';
import LogoGenerator from './components/LogoGenerator';

function App() {
  const [logoData, setLogoData] = useState(null);

  const handleGenerateLogo = (letter, backgroundColor, fontColor, font) => {
    setLogoData({ letter, backgroundColor, fontColor, font });
  };

  return (
    <div className="App">
      <h1>Logo Generator</h1>
      <UserInput onGenerate={handleGenerateLogo} />
      {logoData && (
        <LogoGenerator
          letter={logoData.letter}
          backgroundColor={logoData.backgroundColor}
          fontColor={logoData.fontColor}
          font={logoData.font}
        />
      )}
    </div>
  );
}

export default App;
