import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import MainLayout from 'layouts';

import Main from 'pages/main';
import Detail from 'pages/detail';

import store from 'store';

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

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
