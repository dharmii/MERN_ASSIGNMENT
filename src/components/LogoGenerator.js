// src/components/LogoGenerator.js
import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';

function LogoGenerator({ letter, backgroundColor, fontColor, font }) {
  const logoRef = useRef(null);
  const [downloaded, setDownloaded] = useState(false);
  const [textSize, setTextSize] = useState(100); // Initial text size in percentage

  const handleDownload = () => {
    if (!logoRef.current || downloaded) return;

    html2canvas(logoRef.current, {
      width: 500, // Fixed width for the image
      height: 500, // Fixed height for the image
      backgroundColor: backgroundColor,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'logo.jpg';
      link.click();
      setDownloaded(true);
    });
  };

  const handleTextSizeChange = (e) => {
    setTextSize(parseInt(e.target.value)); // Parse the selected value to an integer
  };

  useEffect(() => {
    if (logoRef.current) {
      // Clear any previous content
      logoRef.current.innerHTML = '';

      logoRef.current.style.backgroundColor = backgroundColor;
      logoRef.current.style.color = fontColor;
      logoRef.current.style.fontFamily = font; // Use the selected font family
      logoRef.current.style.width = '500px'; // Fixed width for the logo
      logoRef.current.style.height = '500px'; // Fixed height for the logo
      logoRef.current.style.border = '2px solid #333';
      logoRef.current.style.borderRadius = '8px';
      logoRef.current.style.display = 'flex';
      logoRef.current.style.alignItems = 'center';
      logoRef.current.style.justifyContent = 'center';
      logoRef.current.style.overflow = 'hidden'; // Hide overflow
      // Calculate font size based on text length and selected text size percentage
      const fontSize = (500 * textSize) / 100;
      // Add a container for text with the calculated font size
      const textContainer = document.createElement('div');
      textContainer.style.width = '100%';
      textContainer.style.textAlign = 'center';
      textContainer.style.overflow = 'hidden';
      textContainer.style.textOverflow = 'ellipsis'; // Add ellipsis if text overflows
      textContainer.style.whiteSpace = 'nowrap';
      textContainer.style.fontSize = `${fontSize}px`; // Set the font size
      textContainer.innerText = letter; // Display the provided letter
      logoRef.current.appendChild(textContainer);
    }
  }, [backgroundColor, fontColor, font, letter, textSize]);

  // Reset the downloaded state when a new letter is generated
  useEffect(() => {
    setDownloaded(false);
  }, [letter]);

  return (
    <div className="LogoGenerator">
      <div className="logo" ref={logoRef}></div>
      <div className="text-size-control">
        <label htmlFor="textSize">Text Size:</label>
        <select id="textSize" value={textSize} onChange={handleTextSizeChange}>
          <option value={10}>10%</option>
          <option value={20}>20%</option>
          <option value={30}>30%</option>
          <option value={40}>40%</option>
          <option value={50}>50%</option>
          <option value={60}>60%</option>
          <option value={70}>70%</option>
          <option value={80}>80%</option>
          <option value={90}>90%</option>
          <option value={100}>100%</option>
          <option value={200}>200%</option>
          <option value={300}>300%</option>
          <option value={400}>400%</option>
          <option value={500}>500%</option>
        </select>
      </div>
      <button key={downloaded ? 'downloaded' : 'download'} onClick={handleDownload}>
        {downloaded ? 'Downloaded' : 'Download Logo'}
      </button>
    </div>
  );
}

export default LogoGenerator;


