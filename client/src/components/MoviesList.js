import { Typography, notification } from 'antd';
import Masonry from 'react-masonry-css';

import { movieAPI } from '../api/movie-api';
import { MoviesEmpty } from './MoviesEmpty';
import { MoviesItem } from './MoviesItem';
import { pluralize } from '../utils';
import { MoviesLoader } from './MoviesLoader';

import '../styles/MoviesList.scss';

const { Title } = Typography;

export const MoviesList = () => {
  const { data, isError, error, isFetching } = movieAPI.endpoints.fetchMovie.useQueryState();

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    800: 2,
    500: 1
  };

  if (isError) {
    notification.error({
      message: 'Онамаєш, помилка...',
      description: error.data
    });
  }

  if (isFetching) {
    return <MoviesLoader />;
  }

  if (!data) {
    return <></>;
  }

  return (
    <>
      <div className="movie-title">
        <Title className="movie-name">{data.title}</Title>
        {data.movies?.length && (
          <Title level={5} className="movie-meta">
            Знайдено {data.movies.length} {pluralize(data.movies.length, ['фільм', 'фільми', 'фільмів'])}
          </Title>
        )}
      </div>
      {data.movies.length ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data.movies.map((movie) => (
            <MoviesItem movie={movie} key={movie.id} />
          ))}
        </Masonry>
      ) : (
        <MoviesEmpty />
      )}
    </>
  );
};
