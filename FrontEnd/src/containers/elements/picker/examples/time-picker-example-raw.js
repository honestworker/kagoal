/*eslint no-useless-escape: 0*/
export default `import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
});

function TimePickers(props) {
  const { classes } = props;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="time"
        label="Alarm clock"
        type="time"
        defaultValue="07:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          step: 300 // 5 min
        }}
      />
    </form>
  );
}

TimePickers.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(TimePickers);
`;
