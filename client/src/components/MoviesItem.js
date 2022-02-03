import { Card, Typography } from 'antd';
import { InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const { Title } = Typography;

export const MoviesItem = ({ movie }) => (
  <Card
    actions={[<CheckCircleOutlined />, <InfoCircleOutlined />]}
    cover={<LazyLoadImage alt={movie.title} src={movie.image} />}
    title={<Title level={4}>{movie.title}</Title>}
  >
    {movie.description}
  </Card>
);
