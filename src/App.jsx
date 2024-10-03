import React, { useState } from 'react';
import useIdentity from './useIdentity';
import './App.css';
import Transactions from './Transactions';

function App() {
  const names = [
    "Ajit Bom Malla",
    "Sudip Neupane",
    "Suven Pandey",
    "Prabin Thapa Magar",
    "Milan Dhamala",
    "Bipul Kharal",
    "Hemant Basnet",
    "Biraj Bajracharya",
    "Sachet Manandhar",
  ];
  const [imageSources, setImageSources] = useState([]);
  const [user, setUser] = useIdentity(names);
  const [qrFor, setQrFor] = useState("");

  React.useEffect(() => {
    if (!qrFor) return;
    setImageSources([
      `/qr/${qrFor.toLowerCase().split(' ')[0]}1.jpg`,
      `/qr/${qrFor.toLowerCase().split(' ')[0]}2.jpg`,
      `/qr/${qrFor.toLowerCase().split(' ')[0]}3.jpg`,
    ]);
  }, [qrFor]);

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
          <div id="nameDiv" className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">QR Code Generator</h1>
            <label htmlFor="identity" className="block text-lg font-medium text-gray-700 my-4">Your Name</label>
            <select id="identity" onChange={e => setUser(e.target.value)} value={user} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {names.map((name) => (
                <option key={name.toLowerCase()} value={name.toLowerCase()}>{name}</option>
              ))}
            </select>
            <Transactions from={user} />
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 my-4">Get QR for</label>
            <select id="name" onChange={e => setQrFor(e.target.value)} value={qrFor} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Name</option>
              {names.map((name) => (
                <option key={name.toLowerCase()} value={name.toLowerCase()}>{name}</option>
              ))}
            </select>
          </div>

          <QRCode sources={imageSources} />

        </div>
      </div>
    </>
  );
}

function QRCode({sources}) {
  return (
    <div id="photoDiv" className="flex justify-between items-center space-x-4 mt-8 h-[50%]">
      {
        sources.map((source, index) => (
          <img key={index} src={source} alt="" className="max-w-[250px] rounded-lg shadow-md transition-transform duration-300 hover:scale-[2]" />
        ))
      }
    </div>
  );
}

export default App;
