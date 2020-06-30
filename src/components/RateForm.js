import React from 'react';
import PropTypes from 'prop-types';
import { Icon, IconButton } from '@material-ui/core';

export class RateForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let stars = [false, false, false, false, false];
    if (this.props.value) {
      for (let i = 0; i < this.props.value; i++) stars[i] = true;
    }
    return (
      <div>
        {stars.map((star, idx) =>
          <IconButton key={idx} onClick={() => this.props.onRate(idx + 1)}>
            {star ? <Icon>star</Icon> : <Icon>star_border</Icon>}
          </IconButton>
        )}
      </div>
    );
  }
}

RateForm.propTypes = {
  onRate: PropTypes.func,
  value: PropTypes.number
};
