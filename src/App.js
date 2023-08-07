import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './abi.json';
import './App.css';

function App() {
  const [contract, setContract] = useState();
  const [todoCount, setTodoCount] = useState(0);
  const [inputItem, setInputItem] = useState();
  const [inputListItem, setInputListItem] = useState();
  const [inputListItemRes, setInputListItemRes] = useState();


  const contractExecution = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const Contract = new ethers.Contract("0x95CE58B67D652D2389b564d42Bb13932d5977d2F", abi, signer)
    setContract(Contract)
  }

  const getTodoCount = async () => {
    if (contract) {
      const res = await contract.count();
      setTodoCount(Number(res))
    }
  }

  useEffect(() => {
    contractExecution();
  }, [])

  const handleChange = (e) => {
    setInputItem(e.target.value)
  }

  const handleSubmit = async () => {
    const res = await contract.getTodo(inputItem);
  }

  const handleGetTodoList = async () => {
    const res = await contract.todoList(inputListItem - 1);
    setInputListItemRes(res);
  }

  const handleTodoList = (e) => {
    setInputListItem(e.target.value);
  }

  return (

    <div className='app-container'>
      <button onClick={getTodoCount}>Get the Count</button>
      <h1>count of todo :- {todoCount}</h1>

      <div className='input-container'>
        Enter The Input value
        <input onChange={handleChange}></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className='input-container'>
        <input onChange={handleTodoList}></input>
        <button onClick={handleGetTodoList}>Get todoList</button>
        <h3>{inputListItemRes}</h3>
      </div>

    </div>
  )
}

export default App






/*
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
*/