import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState({
    content: 'data will apppear here',
    author: 'data will appear here',
    tags: ["Click on Get quote"]});

  function getQuote() {

    try {
      fetch('https://api.quotable.io/random').then(
        response => response.json()).then(
          (quote) => {
            setData(quote);
          }
        )
    }

    catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='title'>Random Quote Generator</h1>
        <h2 className='Quote'>Quote: {data.content}</h2>
        <h3 className='Author'>Author: {data.author}</h3>
        <h3 className='Tag'>Author: {data.tags[0]}</h3>
        <button onClick={getQuote}>Get Quote</button>
      </header>
    </div>
  );
}

export default App;
