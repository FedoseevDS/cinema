import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './pages/main';
import store from './store';

import './styles/global.scss';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    children: [{ path: '/:id' }],
    element: <Main />,
    path: '/',
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
