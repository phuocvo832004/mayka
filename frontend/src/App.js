import React, { useEffect, useState } from 'react';
import { getGallery } from './api';
import Gallery from './components/Gallery'; // Import component Gallery

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    getGallery().then(setData);
  }, []);

  return (
    <div>
      <h1>Welcome to My Website</h1>
      <Gallery /> {/* Gắn component Gallery vào */}
    </div>
  );
}

export default App;
