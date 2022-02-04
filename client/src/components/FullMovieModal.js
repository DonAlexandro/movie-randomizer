import { Modal, Typography } from 'antd';
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
          {fullMovie.title} ({fullMovie.year})
        </Text>
      }
      visible={visible}
      footer={
        <Text>
          <StarFilled /> {fullMovie.rating}
        </Text>
      }
      centered={true}
      onCancel={closeModal}
    >
      {fullMovie.description}
    </Modal>
  );
};
