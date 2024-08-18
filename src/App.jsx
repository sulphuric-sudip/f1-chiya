import React, { useState } from 'react';
import './App.css';

function App() {
  const names = [
    "Sudip Neupane",
    "Suven Pandey",
    "Prabin Thapa Magar",
    "Milan Dhamala",
    "Bipul Kharal",
    "Hemant Basnet",
    "Biraj Bajracharya",
    "Sachet Manandhar"
  ];
  const [name, setName] = useState(names[0]);
  const [sources, setSources] = useState([]);

  React.useEffect(() => {
    setSources([
      `/qr/${name.toLowerCase().split(' ')[0]}1.jpg`,
      `/qr/${name.toLowerCase().split(' ')[0]}2.jpg`,
      `/qr/${name.toLowerCase().split(' ')[0]}3.jpg`,
    ]);
  }, [name]);

  return (
    <>
      <div class="bg-gray-100 min-h-screen flex items-center justify-center">
        <div class="container mx-auto p-8 bg-white rounded-lg shadow-lg">
          <div id="nameDiv" class="mb-6">
            <label for="name" class="block text-lg font-medium text-gray-700 mb-2">Choose a name:</label>
            <select id="name" onChange={e => setName(e.target.value)} value={name} class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {names.map((name) => (
                <option key={name.toLowerCase()} value={name.toLowerCase()}>{name}</option>
              ))}
            </select>
          </div>

          <QRCode sources={sources} />

        </div>
      </div>
    </>
  );
}

function QRCode({sources}) {
  return (
    <div id="photoDiv" class="flex justify-between items-center space-x-4 mt-8 h-[50%]">
      {
        sources.map((source, index) => (
          <img key={index} src={source} alt="" class="max-w-[250px] rounded-lg shadow-md transition-transform duration-300 hover:scale-[2]" />
        ))
      }
    </div>
  );
}

export default App;
