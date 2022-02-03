import { Row, Col, Card, Skeleton } from 'antd';

export const MoviesLoader = () => (
  <>
    <Skeleton active={true} title={true} paragraph={{ rows: 1 }} />
    <Row gutter={[12, 14]}>
      {[1, 2, 3].map((id) => (
        <Col lg={8} md={24} sm={24} xs={24} key={id}>
          <Card loading={true} />
        </Col>
      ))}
    </Row>
  </>
);
