import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class TimeIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingTime: props.creatingTime,
      timeAgo: formatDistanceToNow(props.creatingTime, { includeSeconds: true }),
    };
    this.intervalId = null;
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.timer(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timer() {
    const { creatingTime } = this.state;
    this.setState(() => ({ timeAgo: formatDistanceToNow(creatingTime, { includeSeconds: true }) }));
  }

  render() {
    const { timeAgo } = this.state;
    return <span className="created">created {timeAgo} ago</span>;
  }
}

TimeIndicator.defaultProps = {
  creatingTime: new Date(),
};

TimeIndicator.propTypes = {
  creatingTime: PropTypes.instanceOf(Date),
};
