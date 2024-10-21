import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from 'pages/main';
import Detail from 'pages/detail';

import store from 'store';
import MainLayout from 'layouts/mainLayout';

const router = createBrowserRouter([
  {
    children: [
      {
        element: <Main />,
        path: '/',
      },
      {
        element: <Detail />,
        path: '/:id',
      },
    ],
    element: <MainLayout />,
  },
]);

const App = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

export default App;
