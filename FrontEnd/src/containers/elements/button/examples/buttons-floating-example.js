import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  }
});

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="contained" color="primary" aria-label="add" className={classes.button}>
        <AddIcon />
      </Button>
      <Button variant="contained" disabled aria-label="delete" className={classes.button}>
        <DeleteIcon />
      </Button>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(FloatingActionButtons);
