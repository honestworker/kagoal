import React from 'react';
import { Route, Switch } from 'react-router-dom';

import asyncComponent from './components/async.component';
import Classic from './layouts/layout-classic/layout-classic.component';
import Compact from './layouts/layout-compact/layout-compact.component';
import Toolbar from './layouts/layout-toolbar/layout-toolbar.component';
import Boxed from './layouts/layout-boxed/layout-boxed.component';
import Funky from './layouts/layout-funky/layout-funky.component';
import Tabbed from './layouts/layout-tabbed/layout-tabbed.component';
import NoLayout from './layouts/layout-none/layout-none.component';

// DASHBOARD ROUTE
const AsyncAnalyticsDashboard = asyncComponent(() => import('./containers/dashboards/analytics/analytics.component'));

// AUTHENTICATION ROUTES
const AsyncLogin = asyncComponent(() => import('./containers/authentication/login/login.component'));
const AsyncRegister = asyncComponent(() => import('./containers/authentication/register/register.component'));

// ERROR ROUTES
const AsyncError404 = asyncComponent(() => import('./containers/errors/404.component'));
const AsyncError500 = asyncComponent(() => import('./containers/errors/500.component'));

const AsyncNotFound = asyncComponent(() => import('./containers/not-found/not-found.component'));

// PAGES ROUTES
const AsyncTeamList = asyncComponent(() => import('./containers/pages/teams/teams.list.component'));
const AsyncTeamCreate = asyncComponent(() => import('./containers/pages/teams/teams.create.component'));
const AsyncTeamEdit = asyncComponent(() => import('./containers/pages/teams/teams.edit.component'));

// BOARDS ROUTES
const AsyncBoardsList = asyncComponent(() => import('./containers/pages/boards/boards.list.component'));
const AsyncBoardEdit = asyncComponent(() => import('./containers/pages/boards/boards.edit.component'));

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

const ClassicLayout = props => (
  <Classic>{props.children}</Classic>
);

const CompactLayout = props => (
  <Compact>{props.children}</Compact>
);

const ToolbarLayout = props => (
  <Toolbar>{props.children}</Toolbar>
);

const BoxedLayout = props => (
  <Boxed>{props.children}</Boxed>
);

const FunkyLayout = props => (
  <Funky>{props.children}</Funky>
);

const TabbedLayout = props => (
  <Tabbed>{props.children}</Tabbed>
);

// TODO: Consider looping through an object containing all routes
export default ({ childProps, layout }) => {
  let activeLayout;
  switch (layout.currentLayout) {
  case 'classic':
    activeLayout = ClassicLayout;
    break;
  case 'compact':
    activeLayout = CompactLayout;
    break;
  case 'toolbar':
    activeLayout = ToolbarLayout;
    break;
  case 'boxed':
    activeLayout = BoxedLayout;
    break;
  case 'funky':
    activeLayout = FunkyLayout;
    break;
  case 'tabbed':
    activeLayout = TabbedLayout;
    break;
  default:
    activeLayout = ClassicLayout;
  }

  return (
    <Switch>
      <AppRoute path="/" exact component={AsyncAnalyticsDashboard} props={childProps} layout={activeLayout} />
      <AppRoute path="/login" exact component={AsyncLogin} props={childProps} layout={NoLayout} />
      <AppRoute path="/register" exact component={AsyncRegister} props={childProps} layout={NoLayout} />
      <AppRoute path="/teams" exact component={AsyncTeamList} props={childProps} layout={activeLayout} />
      <AppRoute path="/team/create" exact component={AsyncTeamCreate} props={childProps} layout={activeLayout} />
      <AppRoute path="/team/:id" exact component={AsyncTeamEdit} props={childProps} layout={activeLayout} />
      <AppRoute path="/boards" exact component={AsyncBoardsList} props={childProps} layout={activeLayout} />
      <AppRoute path="/boards/:tid/:bid" exact component={AsyncBoardEdit} props={childProps} layout={activeLayout} />
      <AppRoute path="/errors/404" exact component={AsyncError404} props={childProps} layout={NoLayout} />
      <AppRoute path="/errors/500" exact component={AsyncError500} props={childProps} layout={NoLayout} />
      <AppRoute component={AsyncNotFound} layout={activeLayout} />
    </Switch>);
};
