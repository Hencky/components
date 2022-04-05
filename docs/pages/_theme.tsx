import React from 'react';
import { createTheme, defaultSideNavs } from 'vite-pages-theme-doc';

import Component404 from './404';

export default createTheme({
  logo: <div style={{ fontSize: '20px' }}>📘 组件库</div>,
  topNavs: [
    {
      label: '主页',
      path: '/',
      activeIfMatch: {
        // match all first-level paths
        exact: true,
      },
    },
    {
      label: '组件',
      path: '/components/Text',
      activeIfMatch: '/components',
    },
    { label: 'antd', href: 'https://ant.design/components/overview-cn/' },
  ],
  sideNavs: (ctx) => {
    return defaultSideNavs(ctx, {
      groupConfig: {
        components: {
          demos: {
            label: 'Demos (dev only)',
            order: -1,
          },
          general: {
            label: 'General',
            order: 1,
          },
          'data-display': {
            label: 'Data Display',
            order: 2,
          },
        },
      },
    });
  },
  Component404,
});
