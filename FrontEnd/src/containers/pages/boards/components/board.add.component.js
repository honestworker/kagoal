import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

import scss from '../boards.module.scss';

class BoardAdd extends React.Component {
  state = {
  }

  render() {
    const { classes } = this.props;

    const handleClick = (event) => {
      this.props.handleEvent();
    };

    return (
      <Grid
        spacing={0}
        container
        direction="row"
        alignItems="center"
        justify="center"
        className={classes['board-add-panel']}
        onClick={handleClick}
      >
        <Grid item sm={12} xs={12} className={scss['board-add-body']}>
          <Fab size="small" color="primary" aria-label="add" className={scss['icon-button']}>
            <AddIcon />
          </Fab>
          <Typography variant="body2" gutterBottom>
            Add Board
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

BoardAdd.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleEvent: PropTypes.func.isRequired,
};

export default BoardAdd;
