import React from 'react';
import { Layout } from 'antd';

import { LoadButton } from './components/LoadButton';
import { MoviesList } from './components/MoviesList';

import './styles/App.scss';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Content className="layout">
        <div className="layout-background">
          <LoadButton />
          <MoviesList />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
