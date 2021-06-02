import React from 'react';
import { Redirect } from 'react-router-dom';
import NotFoundView from './screens/errors/NotFoundView';
import LoginScreen from './screens/login/LoginScreen';

export const authRoutes = [
  { path: '/', element: <Redirect to="/login" /> },
  { path: '/login', element: <LoginScreen /> },

  { path: '404', element: <NotFoundView /> },
  { path: '*', element: <Redirect to="/login" /> }
];

export const dashboardRoutes = [
  { path: '/', element: <Redirect to="/your-courses" /> },
  { path: '/login', element: <Redirect to="/your-courses" /> },
  { path: '/explore-courses', element: () => <div>Explore</div> },
  { path: '/your-courses', element: () => <div>Explore2</div> },
  { path: '/your-courses/:groupId', element: () => <div>Explore3</div> },

  { path: '404', element: <NotFoundView /> },
  { path: '*', element: <Redirect to="/login" /> }
];
