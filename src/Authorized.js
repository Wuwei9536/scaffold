import React from 'react';
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { getAuthority } from '@/utils/authority';
import Redirect from 'react-router-dom';

const Authority = getAuthority();
const Authorized = RenderAuthorized('user');
/* eslint-disable */
export default ({ children }) => (
  <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/user" />}>
    {children}
  </Authorized>
);
