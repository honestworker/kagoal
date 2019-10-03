import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import isEmpty from '../../../../validation/is-empty';

import scss from '../boards.module.scss';

class BoardNewColumnModal extends React.Component {
  state = {
    name: '',
    errors: {
      name: '',
    },
    submit_flag: false,
    loading_flag: false,
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.res_errors) {
      this.setState({
        res_errors: nextProps.res_errors
      });
    }
    if (nextProps.res_data.api === 'createboardcolumn') {
      this.setState({
        name: '',
        errors: {
          name: '',
        },
        submit_flag: false,
        loading_flag: false,
      });
    }
  }

  render() {
    const { name, submit_flag, loading_flag, errors } = this.state;
    const { open } = this.props;
    
    const checkNoError = () => {
      const state_errors = this.state.errors;
      if (!state_errors.name) {
        return true;
      }
      return false;
    }

    const checkValidate = () => {
      const errors = {
        name: '',
      };
      if (isEmpty(this.state.name)) {
        errors.name = 'Please insert the value';
      }
      this.setState({
        errors: errors
      });
    }

    const handleChange = prop => event => {
      this.setState({
        [prop]: event.target.value
      });
      if (submit_flag) {
        setTimeout(()=> checkValidate(), 300);
      }
    }

    const handleClose = (event) => {
      this.props.onCloseEvent();
    }

    const onSubmit = (event) => {
      this.setState({
        submit_flag: true
      });
      checkValidate();
      setTimeout(()=> {
        if (checkNoError()) {
          this.setState({
            loading_flag: true
          });
          const submit_data = this.state.name;
          this.props.onSumitEvent(submit_data);
        }
      }, 300);
    }

    return (
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        maxWidth="md"
      >
        <DialogTitle className={scss['board-modal-title']}>
          {"New Board"}
        </DialogTitle>
        <DialogContent className={scss['board-modal-content']}>
          <FormControl className={scss['board-form-control-margin']}>
            <Typography variant="subtitle1" align="left">
              Name
            </Typography>
            <TextField
              fullWidth={true}
              margin="dense"
              name="name"
              value={name}
              onChange={handleChange('name')}
              className={(errors.name) ? scss['is-invalid'] + ' ' : ''}
            />
            {errors.name && <div className={scss['invalid-feedback']}>{errors.name}</div>}
          </FormControl>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={onSubmit}
            disabled={loading_flag}
            className={scss['board-control-button']}
            >
              Ok
              {loading_flag && <CircularProgress size={24} className={scss['process_btn']} />}
          </Button>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            onClick={handleClose}
            disabled={loading_flag}
            className={scss['board-control-button']}
            >
              Cancel
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

BoardNewColumnModal.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onSumitEvent: PropTypes.func.isRequired,
  onCloseEvent: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  res_errors: state.errors,
  res_data: state.res_data,
});

export default (connect(mapStateToProps, { }))(BoardNewColumnModal);
