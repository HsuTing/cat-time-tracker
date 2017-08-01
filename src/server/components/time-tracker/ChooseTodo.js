'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import TodoContainer from 'containers/TodoContainer';

@radium
export default class ChooseTodo extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const {data} = this.props;

    return (
      <div>
        <TodoContainer todo={data.todo}
          data={data}
          modifyChooseTodo={data => console.log(data)}
        />
      </div>
    );
  }
}
