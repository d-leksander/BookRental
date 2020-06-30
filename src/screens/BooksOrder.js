import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Icon, Typography, Paper, TextField, Card, CardMedia, CardContent, CardActions, Grid, Select, MenuItem, InputLabel, FormControl, Toolbar } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import AppsIcon from '@material-ui/icons/Apps';
import { withStyles } from '@material-ui/core/styles';
import { ReservationForm } from '../components/ReservationForm';
import { RateForm } from '../components/RateForm';
import Map from '../components/Map';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit,
    left: theme.spacing.unit,
  },
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

const currentDate = new Date().toJSON().slice(0, 10);

class BooksOrder extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      filters: {
        checkinDate: currentDate,
        checkoutDate: currentDate,
        type: '',
        rate: '',
        count: '',
      },
      modal: {
        open: false,
        data: null
      },
      map: false,
    };
  }

  componentDidMount() {
    this.props.onInit();
  }

  handleChange(e, item) {
    this.setState({
      filters: {
        ...this.state.filters,
        [item]: e.target.value
      }
    });
  }

  openModal(data) {
    this.setState({ modal: { open: true, data } });
  }

  closeModal(data) {
    data.user = this.context.store.getState().auth.user.name;
    this.setState({ modal: { open: false } });
    if (data) this.props.onOrder(data);
  }

  toggleMap() {
    this.setState({ map: !this.state.map });
  }

  filteredBooks() {
    const filters = this.state.filters;
    // Filter by date range
    const books = this.props.books.filter(book => {
      for (let key in book.reservations) {
        const reservation = book.reservations[key];
        if (filters.checkoutDate >= reservation.checkin && filters.checkinDate <= reservation.checkout) {
          return false;
        }
      }
      if (!!filters.type && filters.type !== book.type) return false;
      if (!!filters.rate && filters.rate > book.rate) return false;
      if (!!filters.count && filters.count < book.count) return false;
      return true;
    });
    return books;
  }

  render() {
    const { state } = this;
    const { classes } = this.props;
    const ranges = [...Array(5).keys()];
    return (
      <div>
        <Paper>
          <Toolbar className={classes.container}>
            <TextField
              id="checkinDate"
              label="Checkin date"
              type="date"
              className={classes.textField}
              defaultValue={currentDate}
              onChange={(e) => this.handleChange(e, 'checkinDate')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="checkoutDate"
              label="Checkout date"
              type="date"
              className={classes.textField}
              defaultValue={currentDate}
              onChange={(e) => this.handleChange(e, 'checkoutDate')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl className={classes.textField}>
              <InputLabel htmlFor="type-simple" shrink={true}>Type</InputLabel>
              <Select
                value={state.filters.type}
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
            <FormControl className={classes.textField}>
              <InputLabel htmlFor="rate-simple" shrink={true}>Minimum rate</InputLabel>
              <Select
                value={state.filters.rate}
                onChange={(e) => this.handleChange(e, 'rate')}
                inputProps={{
                  name: 'rate',
                  id: 'rate-simple',
                }}
              >
                <MenuItem value=""></MenuItem>
                {
                  ranges.map(i =>
                    <MenuItem value={i + 1} key={i}>
                      {ranges.slice(0, i + 1).map(j => <Icon key={j}>star</Icon>)}
                    </MenuItem>
                  )
                }
              </Select>
            </FormControl>

            <TextField
              id="count"
              label="Max count"
              className={classes.textField}
              onChange={(e) => this.handleChange(e, 'count')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Toolbar>
        </Paper>
        <div>
          {this.state.map ?
            <Map
              books={this.filteredBooks()}
              containerElement={<div style={{ height: 'calc(100vh - 128px)' }} />}
              mapElement={<div style={{ height: '100%' }} />}
              mapElement={<div style={{ height: '100%' }} />}
            />
            :
            <Grid container alignItems={'stretch'}>
              {this.filteredBooks().map((book, idx) => {
                return (
                  <Card className={classes.card} item="true" xs={3} key={idx}>
                    <CardMedia className={classes.media}
                      image={book.photo}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="headline" component="h2">
                        {book.bname}
                      </Typography>
                      {book.author}
                    </CardContent>
                    <CardActions>
                      <IconButton size="small" color="primary"
                        onClick={() => this.openModal(book)}>
                        <Icon>shopping_cart</Icon>
                      </IconButton>
                      <RateForm value={book.rate} onRate={(rate) => this.props.onRate({ bookId: book.id, rate })} />
                    </CardActions>
                  </Card>
                );
              })}
            </Grid>
          }
        </div>
        <ReservationForm
          type={state.modal.type}
          open={state.modal.open}
          data={state.modal.data}
          onClose={(data) => this.closeModal(data)}
          label="Add"
          ref={(form) => {
            this.form = form;
          }}
        />
        <Button variant="fab" color="primary" aria-label="add"
          className={classes.fab}
          onClick={() => this.toggleMap({})}
        >
          {this.state.map ? <AppsIcon /> : <MapIcon />}
        </Button>
      </div>
    );
  }
}

BooksOrder.propTypes = {
  onInit: PropTypes.func.isRequired,
  onOrder: PropTypes.func.isRequired,
  onRate: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

BooksOrder.contextTypes = {
  store: PropTypes.object.isRequired
};

export default withStyles(styles)(BooksOrder);
