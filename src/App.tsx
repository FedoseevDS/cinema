import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './pages/main';

import './styles/global.scss';

const router = createBrowserRouter([
  {
    children: [{ path: '/:id' }],
    element: <Main />,
    path: '/',
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
