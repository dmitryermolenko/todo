import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

function TimeIndicator(props) {
  const { creatingTime } = props;
  const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(creatingTime, { includeSeconds: true }));

  const timer = () => {
    setTimeAgo(() => formatDistanceToNow(creatingTime, { includeSeconds: true }));
  };

  useEffect(() => {
    const id = setInterval(() => timer(), 5000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span className="created">created {timeAgo} ago</span>;
}

TimeIndicator.defaultProps = {
  creatingTime: new Date(),
};

TimeIndicator.propTypes = {
  creatingTime: PropTypes.instanceOf(Date),
};

export default TimeIndicator;
