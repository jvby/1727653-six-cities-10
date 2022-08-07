import FadeLoader from 'react-spinners/FadeLoader';
import { CSSProperties } from 'react';

const override: CSSProperties = {
  display: 'block',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

function LoadingScreen(): JSX.Element {
  const loading = true;
  return (
    <FadeLoader color={'blue'} loading={loading} cssOverride={override}/>
  );
}

export default LoadingScreen;
