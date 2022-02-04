import { Typography } from 'antd';
import Masonry from 'react-masonry-css';

import { movieAPI } from '../api/movie-api';
import { MoviesEmpty } from './MoviesEmpty';
import { MoviesItem } from './MoviesItem';
import { pluralize } from '../utils';
import { MoviesLoader } from './MoviesLoader';
import { useError } from '../hooks/useError';

import '../styles/MoviesList.scss';
import { FullMovieModal } from './FullMovieModal';
import useBoolean from '../hooks/useBoolean';

const { Title } = Typography;

export const MoviesList = () => {
  const { data, isError, error, isFetching } = movieAPI.endpoints.fetchMovie.useQueryState();
  const [
    fetchFullMovieInfo,
    { data: fullMovie, isLoading: fullMovieLoading, error: fullMovieError, isError: isFullMovieError }
  ] = movieAPI.useFetchFullMovieInfoMutation();
  const { value, setTrue, setFalse } = useBoolean(false);

  const { triggerError } = useError(error || fullMovieError);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    800: 2,
    500: 1
  };

  if (isError || isFullMovieError) {
    triggerError();
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
        {data.movies.length && (
          <Title level={5} className="movie-meta">
            Знайдено {data.movies.length} {pluralize(data.movies.length, ['фільм', 'фільми', 'фільмів'])}
          </Title>
        )}
      </div>
      {data.movies.length ? (
        <>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data.movies.map((movie) => (
              <MoviesItem
                movie={movie}
                key={movie.id}
                notionId={data.notionId}
                fetchFullMovieInfo={fetchFullMovieInfo}
                isLoading={fullMovieLoading}
                openModal={setTrue}
              />
            ))}
          </Masonry>
          <FullMovieModal fullMovie={fullMovie} closeModal={setFalse} visible={value} />
        </>
      ) : (
        <MoviesEmpty />
      )}
    </>
  );
};
