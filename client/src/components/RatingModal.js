import { Modal, Typography, Form, InputNumber } from 'antd';
import { movieAPI } from '../api/movie-api';
import { useError } from '../hooks/useError';

import '../styles/RatingModal.scss';

const { Text } = Typography;
const { useForm } = Form;

export const RatingModal = ({ closeModal, visible, title, notionId }) => {
  const [markAsWatched, { isLoading, error, isError }] = movieAPI.useMarkAsWatchedMutation();
  const [form] = useForm();

  const { triggerError } = useError(error);

  if (isError) {
    return triggerError(error);
  }

  const onCancle = () => {
    form.resetFields();
    closeModal();
  };

  const onFinish = (values) => {
    markAsWatched(Object.assign({ title, notionMovieId: notionId }, values)).then(() => closeModal());
  };

  return (
    <Modal
      className="rating-modal"
      title={<Text strong>Постав оцінку</Text>}
      visible={visible}
      centered={true}
      onCancel={onCancle}
      okText="Відправити"
      okButtonProps={{ loading: isLoading }}
      cancelText="Закрити"
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="rating"
          rules={[
            { required: true, message: 'Введи рейтинг' },
            { type: 'number', min: 1, max: 10, message: 'Мінімальна оцінка - 1, максимальна - 10' }
          ]}
        >
          <InputNumber size="large" addonAfter="/10" className="rating-input" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
