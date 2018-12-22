import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import LayOut from '../pages/layOut/view';
import WeekList from '../pages/weeklyList/view';
import Login from '../pages/logIn/view';

export default [
  {
    path:'/user',
    component:Login
  },
  {
    path: '/',
    component: LayOut,
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        component: WeekList,
        exact: true,
        key: 'home'
      },
      {
        path: '/OKR',
        component: WeekList,
        exact: true,
        key: 'OKR'
      },
      {
        path: '/attention',
        component: WeekList,
        exact: true,
        key: 'attention'
      },
      {
        path: '/staff',
        component: WeekList,
        exact: true,
        key: 'staff'
      }
    ]
  }];
