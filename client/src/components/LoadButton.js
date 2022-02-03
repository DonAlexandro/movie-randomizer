import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { movieAPI } from '../api/movie-api';

import { useButtonDebounce } from '../hooks/useDebounce';

export const LoadButton = () => {
  const [fetchMovie, { isFetching }] = movieAPI.useLazyFetchMovieQuery();
  const testConnection = useButtonDebounce(async () => fetchMovie(), 250);

  return (
    <div className="load-button-wrapper">
      <Button loading={isFetching} size="large" type="primary" onClick={testConnection} icon={<SearchOutlined />}>
        {isFetching ? 'Пошук в IMDb...' : 'Знайти кіно'}
      </Button>
    </div>
  );
};
