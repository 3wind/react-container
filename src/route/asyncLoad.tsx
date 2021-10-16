import Loadable from 'react-loadable';
import AsyncLoading from '@/components/AsyncLoading';

const TIMEOUT = 10000;

const asyncLoad = (loader: any) =>
  Loadable({
    loader,
    loading: AsyncLoading,
    timeout: TIMEOUT,
  });

export default asyncLoad;
