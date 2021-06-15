import React, { useState } from 'react';
import './App.css';
import Card from './components/Card';
import getSpotifyToken from './utils/getSpotifyToken';

const baseURL = (pesquisa) => `https://api.spotify.com/v1/search?q=${pesquisa}&type=track&limit=10`;

function App() {
  const [ pesquisa, setPesquisa ] = useState('');
  const [ tracks, setTracks ] = useState([]); //A resposta da API da spotify é um array de músicas dentro do objeto 'tracks';
  const [ carregando, setCarregando ] = useState(false);
  const [ erros, setErros ] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    if(!pesquisa) return;

    setErros();
    setCarregando(true);

    try {
      const token = await getSpotifyToken(); //Primeira requisição
      
      const response = await fetch(baseURL(pesquisa), {
        headers: {
          'Authorization': token
        }
      });

      const { tracks } = await response.json(); //Então eu desestruturo o objeto 'tracks' da resposta;

      setTracks(tracks.items); //E chamo a propriedade que contem o array de músicas, sendo minha última requisição;
    } catch (error) {
      setErros(error.message);
      setTracks([]);
    }
    
    setCarregando(false);
  }

  //Por último uso o método de arrays 'map' para colocar cada item do array no Card, passando a props 'track';
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" value={pesquisa} onChange={e => setPesquisa(e.target.value)} />
      </form>
      {carregando && <span className="loading">Carregando ...</span>}
      {erros && <span className="error">{erros}</span>}
      {(tracks.length === 0 && !erros && !carregando) && <span className="not-found">Nada encontrado :(</span>}
      {tracks.map(track => ( 
        <Card track={track} />
      ))}
    </div>
  );
}

export default App;