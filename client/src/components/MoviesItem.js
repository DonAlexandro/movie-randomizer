import { Card, Spin, Typography } from 'antd';
import { InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useButtonDebounce } from '../hooks/useDebounce';

const { Title } = Typography;

export const MoviesItem = ({ movie, notionId, fetchFullMovieInfo, isLoading, openModal, openRatingModal }) => {
  const handleFetchFullMovieInfo = useButtonDebounce(() => {
    fetchFullMovieInfo({ imdbMovieId: movie.id, notionMovieId: notionId });
    openModal();
  }, 100);

  return (
    <Spin spinning={isLoading} tip="Завантажую детальнішу інформацію...">
      <Card
        actions={[
          <CheckCircleOutlined onClick={openRatingModal} />,
          <InfoCircleOutlined onClick={handleFetchFullMovieInfo} />
        ]}
        cover={<LazyLoadImage onClick={handleFetchFullMovieInfo} alt={movie.title} src={movie.image} />}
        title={
          <Title onClick={handleFetchFullMovieInfo} level={4}>
            {movie.title}
          </Title>
        }
      >
        {movie.description}
      </Card>
    </Spin>
  );
};
