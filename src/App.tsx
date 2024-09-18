import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import MainLayout from 'layouts';

import Main from 'pages/main';
import Detail from 'pages/detail';

import store from 'store';

import './styles/global.scss';

const router = createBrowserRouter([
  {
    children: [
      {
        element: <Main />,
        path: 'cinema',
      },
      {
        element: <Detail />,
        path: 'cinema/:id',
      },
    ],
    element: <MainLayout />,
  },
]);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
