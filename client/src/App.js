import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const API_URL = process.env.REACT_APP_API_ULR;

  const [movie, setMovie] = useState('');

  const testConnection = async () => {
    const response = await axios(API_URL + '/movies');
    setMovie(response.data.movie.to_do.text[0].plain_text);
  };

  return (
    <div className="App">
      <button onClick={testConnection}>Get me some good movie</button>
      <h1>{movie}</h1>
    </div>
  );
}

export default App;
