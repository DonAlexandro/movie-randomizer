import { Empty } from 'antd';
import { Emoji } from '../components/Emoji';

export const MoviesEmpty = () => (
  <Empty
    description={
      <strong>
        Хмм... таких кінчезів в базі IMDb немає <Emoji symbol="🤔" />
      </strong>
    }
  />
);
