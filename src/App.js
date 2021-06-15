import React, { useState } from 'react';
import './App.css';
import Card from './components/Card';
import getSpotifyToken from './utils/getSpotifyToken';

const baseURL = (pesquisa) => `https://api.spotify.com/v1/search?q=${pesquisa}&type=track&limit=10`;

function App() {
  const [ pesquisa, setPesquisa ] = useState('');
  const [ tracks, setTracks ] = useState([]); //A resposta da API da spotify é um array de músicas dentro do objeto 'tracks';

  async function handleSubmit(e) {
    e.preventDefault();

    if(!pesquisa) return;

    const token = await getSpotifyToken();
    
    const response = await fetch(baseURL(pesquisa), {
      headers: {
        'Authorization': token
      }
    });

    const { tracks } = await response.json(); //Então eu desestruturo o objeto 'tracks' da resposta;

    setTracks(tracks.items); //E chamo a propriedade que contem o array de músicas;
  }

  //Por último uso o método de arrays 'map' para colocar cada item do array no Card, passando a props 'track';
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" value={pesquisa} onChange={e => setPesquisa(e.target.value)} />
      </form>
      {tracks.map(track => ( 
        <Card track={track} />
      ))}
    </div>
  );
}

export default App;