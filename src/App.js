import React, { useState } from 'react';
import './App.css';

const baseURL = (pesquisa) => `https://api.spotify.com/v1/search?q={pesquisa}&type=track&limit=10`;

function App() {
  const [ pesquisa, setPesquisa ] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if(!pesquisa) return;
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" value={pesquisa} onChange={e => setPesquisa(e.target.value)} />
      </form>
    </div>
  );
}

export default App;
