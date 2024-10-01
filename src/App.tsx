import { ToastContainer } from 'react-toastify';
import ScrollToTop from './helpers/ScrollToTop';
import useRouteElement from './useRouteElement';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from 'react-tooltip';

function App() {
  const routeElement = useRouteElement();
  return (
    <div className='text-white'>
      <ScrollToTop />
      {routeElement}
      <ToastContainer />
      <Tooltip style={{ backgroundColor: 'rgb(55, 65, 81)' }} id='my-tooltip' />
    </div>
  );
}

export default App;
