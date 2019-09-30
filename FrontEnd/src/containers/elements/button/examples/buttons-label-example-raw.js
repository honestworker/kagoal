/*eslint no-useless-escape: 0*/
export default `import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Delete from '@material-ui/icons/Delete';
import FileUpload from '@material-ui/icons/FileUpload';
import KeyboardVoice from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import Save from '@material-ui/icons/Save';

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
});

function IconLabelButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button className={classes.button} variant="contained" color="secondary">
        Delete
        <Delete className={classes.rightIcon} />
      </Button>
      <Button className={classes.button} variant="contained" color="primary">
        Send
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
      <Button className={classes.button} variant="contained" color="default">
        Upload
        <FileUpload className={classes.rightIcon} />
      </Button>
      <Button className={classes.button} variant="contained" disabled color="secondary">
        <KeyboardVoice className={classes.leftIcon} />
        Talk
      </Button>
      <Button className={classes.button} variant="contained" size="small">
        <Save className={classes.leftIcon} />
        Save
      </Button>
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(IconLabelButtons);
`;
