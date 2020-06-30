import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { LibraryBooks } from "@material-ui/icons";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const styles = theme => ({
  card: {
    width: 400,
    maxWidth: '100%',
    margin: theme.spacing.unit,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
});

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
    };
  }

  openModal(book) {
    this.setState({ selected: book });
  }

  handleClose() {
    this.setState({ selected: {} });
  }

  render() {
    const { classes } = this.props;
    return (
        <div>
          <GoogleMap
              defaultZoom={14}
              defaultCenter={{ lat: 50.062346, lng: 19.938464 }}
          >
            {
              this.props.books.map(
                  (book, idx) => book.location &&
                      <Marker
                          position={{ lat: book.location.lat, lng: book.location.lng }}
                          icon={LibraryBooks}
                          onClick={() => this.openModal(book)}
                          key={idx}
                      />
              )
            }
          </GoogleMap>
          <Dialog
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={!!this.state.selected.id}
              onClose={() => this.handleClose()}
          >
            <Card className={classes.card}>
              <CardMedia className={classes.media}
                         image={this.state.selected.photo}
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {this.state.selected.bname}
                </Typography>
                {this.state.selected.author}
              </CardContent>
            </Card>
          </Dialog>
        </div>
    );
  }
}

Map.propTypes = {
  books: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withGoogleMap(props => <Map books={props.books} classes={props.classes} />));