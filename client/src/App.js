import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Layout } from 'antd';

import './styles/App.scss';
import { useButtonDebounce } from './hooks/useDebounce';

const { Content } = Layout;

function App() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [movie, setMovie] = useState({});

  const testConnection = useButtonDebounce(async () => {
    const response = await axios(API_URL + '/movie');
    setMovie(response.data);
  }, 250);

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  return (
    <Layout>
      <Content className="layout">
        <div className="layout-background">
          <Button size="large" type="primary" onClick={testConnection}>
            Завантажити кінчик
          </Button>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
