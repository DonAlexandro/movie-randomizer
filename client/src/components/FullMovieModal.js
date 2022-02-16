import { Modal, Typography, Tag } from 'antd';
import { StarFilled } from '@ant-design/icons';

import '../styles/FullMovieModal.scss';

const { Text } = Typography;

export const FullMovieModal = ({ fullMovie, visible, closeModal }) => {
  if (!fullMovie) {
    return <></>;
  }

  return (
    <Modal
      className="full-movie-modal"
      width={700}
      title={
        <Text strong={true}>
          <a
            href={process.env.REACT_APP_EXTARNAL_MOVIES_SITE + encodeURIComponent(fullMovie.title)}
            target="_blank"
            rel="noreferrer"
          >
            {fullMovie.title} ({fullMovie.year})
          </a>
        </Text>
      }
      visible={visible}
      footer={
        <>
          <div className="categories">
            <Text strong className="category-label">
              Жанри:
            </Text>
            {fullMovie.genres.map((genre) => (
              <Tag key={genre.id}>{genre.name}</Tag>
            ))}
          </div>
          <Text className="rating">
            <StarFilled /> {fullMovie.rating}
          </Text>
        </>
      }
      centered={true}
      onCancel={closeModal}
    >
      {fullMovie.description ? (
        <Text>{fullMovie.description}</Text>
      ) : (
        <Text italic type="secondary">
          Опису відсутній
        </Text>
      )}
    </Modal>
  );
};
