// src/components/UserInput.js
import React, { useState } from 'react';

function UserInput({ onGenerate }) {
  const [letter, setLetter] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Default background color
  const [fontColor, setFontColor] = useState('#000000'); // Default font color
  const [font, setFont] = useState('Arial'); // Default font family

  const handleInputChange = (e) => {
    setLetter(e.target.value);
  };

  const handleGenerate = () => {
    onGenerate(letter, backgroundColor, fontColor, font);
  };

  return (
    <div className="UserInput">
      <input
        type="text"
        placeholder="Enter a letter"
        value={letter}
        onChange={handleInputChange}
      />
      <input
        type="color"
        value={backgroundColor}
        onChange={(e) => setBackgroundColor(e.target.value)}
      />
      <input
        type="color"
        value={fontColor}
        onChange={(e) => setFontColor(e.target.value)}
      />
      <select value={font} onChange={(e) => setFont(e.target.value)}>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
        <option value="Options">You can Add more Fonts If You want</option>
        {/* Add more font options as needed */}
      </select>
      <button onClick={handleGenerate}>Generate Logo</button>
    </div>
  );
}

export default UserInput;
