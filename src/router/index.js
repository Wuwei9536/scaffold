import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import LayOut from '../pages/layOut/view';
import WeekList from '../pages/weeklyList/view';
import Login from '../pages/logIn/view';
import Edit from '../pages/edit/view';
import Info from '../pages/info/view';
import Demo from '../pages/edit';

export default [
  // {
  //   path:'/user',
  //   component:Login
  // },
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
        path: '/edit',
        component: Edit,
        key:'edit'
      },
      {
        path:'/details',
        component:Info,
        key:'info'
      },
      {
        path: '/OKR',
        component: Demo,
        exact: true,
        key: 'OKR'
      },
      {
        path: '/attention',
        component: Info,
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
