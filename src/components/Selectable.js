import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableRow, TableCell, TableBody, Checkbox, IconButton, Icon, TableHead } from '@material-ui/core';
import { xor, indexOf } from 'lodash';

const styles = {
  actions: {
    display: 'flex',
    flexWrap: 'nowrap'
  }
};

class Selectable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selected: props.selected || []
    };
  }
  isSelected(idx) {
    return indexOf(this.state.selected, idx) >= 0;
  }
  onSelect(idx) {
    const selected = xor(this.state.selected, [idx]);
    this.setState({ selected });
    this.props.onSelect(selected);
  }
  render() {
    const { classes } = this.props;
    const { props } = this;
    const visibleKeys = props.cols.map(col => col.id);
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {props.cols.map(col => {
              return (
                <TableCell key={col.id}>
                  {col.title}
                </TableCell>
              );
            })}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, idx) => {
            return (
              <TableRow
                key={idx}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={this.isSelected(idx)}
                    onChange={() => this.onSelect(idx)}
                  />
                </TableCell>
                {visibleKeys.map(key => {
                  return (
                    <TableCell
                      key={key}
                    >
                      {row[key]}
                    </TableCell>
                  );
                })}
                <TableCell padding="checkbox" className={classes.actions}>
                  <IconButton onClick={() => props.onEdit(idx)}>
                    <Icon>edit_icon</Icon>
                  </IconButton>
                  <IconButton onClick={() => props.onDelete(idx)}>
                    <Icon>delete_icon</Icon>
                  </IconButton>
                  {props.onDetails && <IconButton onClick={() => props.onDetails(idx)}>
                    <Icon>info_icon</Icon>
                  </IconButton>
                  }
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

Selectable.propTypes = {
  cols: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDetails: PropTypes.func,
  selected: PropTypes.array,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Selectable);