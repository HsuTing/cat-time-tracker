'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium, {StyleRoot} from 'radium';
import {Switch, Route, withRouter} from 'react-router-dom';
import MenuIcon from 'react-icons/lib/md/menu';
import Img from 'cat-components/lib/img';
import Link from 'cat-components/lib/link';
import Sidebar, {sidebarBuilder} from 'cat-components/lib/sidebar';

import pages from 'constants/pages';

import * as style from './style/dashboard';

const buttons = (
  path,
  title,
  hide
) => ({match}) => ( // eslint-disable-line react/display-name, react/prop-types
  <Link style={style.menu.link(match)}
    to={path}
    onClick={() => hide()}
  >{title}</Link>
);

@radium
class DashboardMenu extends React.Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    homepage: PropTypes.string.isRequired,
    style: PropTypes.object,
    hide: PropTypes.func
  }

  static defaultProps = {
    hide: () => {}
  }

  render() {
    const {email, name, homepage, hide, ...props} = this.props;

    return (
      <StyleRoot style={[style.menu.root, props.style]}>
        <div style={style.menu.header}>
          <div />

          <div style={style.menu.imgBackground}>
            <Img style={[style.menu.imgBackground, style.menu.img]}
              link={homepage}
              src='https://hsuting.github.io/public/img/icon.svg'
              type='div'
              target='_blank'
            />
          </div>

          <a style={style.menu.info}
            href={homepage}
            target='_blank'
          >{name}</a>

          <p style={style.menu.info}
          >{email}</p>
        </div>

        <div style={style.menu.linkRoot}>
          {pages.map(({title, path, pages}, index) => (
            <Route key={index}
              path={path}
              exact={Boolean(!pages)}
            >
              {buttons(path, title, hide)}
            </Route>
          ))}
        </div>
      </StyleRoot>
    );
  }
}

@withRouter
@sidebarBuilder
@radium
class Dashboard extends React.Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    homepage: PropTypes.string.isRequired,
    sidebar: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return (
      JSON.stringify(this.props.location) !== JSON.stringify(nextProps.location)
    );
  }

  render() {
    const {email, name, homepage, sidebar} = this.props;

    return (
      <StyleRoot style={style.root}>
        <DashboardMenu email={email}
          name={name}
          homepage={homepage}
          style={style.menu.tabletRoot}
        />

        <div>
          <Switch>
            {pages.map(({title, path, Component, pages}, index) => (
              <Route key={index}
                path={path}
                exact={Boolean(!pages)}
                component={() => (
                  <div>
                    <header style={style.header}>
                      <StyleRoot style={style.menuIconRoot}>
                        <MenuIcon style={style.menuIcon}
                          onClick={() => sidebar()}
                        />
                      </StyleRoot>

                      {title}
                    </header>

                    <div style={style.content}>
                      <Component pages={pages} />
                    </div>
                  </div>
                )}
              />
            ))}
          </Switch>
        </div>
      </StyleRoot>
    );
  }
}


export default ({email, name, homepage}) => ( // eslint-disable-line react/display-name, react/prop-types
  <Sidebar menu={({hide}) => (
    <div>
      <DashboardMenu email={email}
        name={name}
        homepage={homepage}
        hide={hide}
      />
    </div>
  )}
  >
    <Dashboard email={email}
      name={name}
      homepage={homepage}
    />
  </Sidebar>
);
