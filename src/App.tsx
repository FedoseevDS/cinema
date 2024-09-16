import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/main/main';
import { Layout } from 'antd';

import './styles/global.scss';

const router = createBrowserRouter([
  {
    children: [{ path: '/:id' }],
    element: <Main />,
    path: '/',
  },
]);

const App = () => {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
};

export default App;
