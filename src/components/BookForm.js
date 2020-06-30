import React from 'react';
import PropTypes from 'prop-types';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import DragDrop from '@uppy/react/lib/DragDrop';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const style = {
  photoContainer: {
    textAlign: 'center'
  },
  photo: {
    maxWidth: '100%',
    height: 250
  }
};

export class BookForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: 0, bname: '', author: '', photo: '', type: '', count: 0, location: null, reservations: [], rates: [], rate: 0
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      if (nextProps.data.id) {
        this.setState(nextProps.data);
      } else {
        this.setState(
          {
            id: 0, bname: '', author: '', photo: '', type: '', count: 0, location: null, reservations: [], rates: [], rate: 0
          }
        );
      }
      this.setupUppy();
    }
    return null;
  }
  setupUppy() {
    if (this.uppy) this.uppy.close();
    this.uppy = Uppy({
      id: 'bookPhoto',
      restrictions: { maxNumberOfFiles: 1 },
      autoProceed: true
    });
    this.uppy.use(Tus, { endpoint: '/upload/', limit: 1 });
    this.uppy.on('complete', (result) => {
      const url = result.successful[0].uploadURL.replace('upload/dist/', '');
      this.setState({
        photo: url
      });
    });
  }
  handleChange(e, item) {
    this.setState({
      [item]: e.target.value
    });
  }
  render() {
    const { state, props } = this;
    return (
      <Dialog
        open={props.open}
        onClose={() => props.onClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add or edit book info</DialogTitle>
        <DialogContent>
          <div style={style.photoContainer}>
            <img src={state.photo} style={style.photo} />
            {this.uppy &&
              <DragDrop
                uppy={this.uppy}
                locale={{
                  strings: {
                    chooseFile: 'Pick a new photo'
                  }
                }}
              />
            }
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="bname"
            label="Name"
            type="text"
            value={state.bname}
            onChange={(e) => this.handleChange(e, 'bname')}
            fullWidth
          />
          <TextField
            margin="dense"
            id="author"
            label="Author"
            type="text"
            value={state.author}
            onChange={(e) => this.handleChange(e, 'author')}
            fullWidth
          />
          <FormControl>
            <InputLabel htmlFor="type-simple">Type</InputLabel>
            <Select
              value={state.type}
              onChange={(e) => this.handleChange(e, 'type')}
              inputProps={{
                name: 'type',
                id: 'type-simple',
              }}
            >
              <MenuItem value="scientific">Scientific</MenuItem>
              <MenuItem value="novel">Novel</MenuItem>
              <MenuItem value="humanistic">Humanistic</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="count"
            label="Count of copies available"
            type="number"
            value={state.count}
            onChange={(e) => this.handleChange(e, 'count')}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => props.onClose(state)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

BookForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  open: PropTypes.bool
};
