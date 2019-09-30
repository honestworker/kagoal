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
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import isEmpty from '../../../../validation/is-empty';

import scss from '../boards.module.scss';

import { getTemplateList } from '../../../../actions/templates.action';

class BoardModal extends React.Component {
  state = {
    data: {
      name: '',
      votes: 6,
      template: '',
      hide_cards: false,
      disable_votes: false,
      hide_vote_count: false,
      show_card_author: false,
    },
    errors: {
      name: '',
      votes: '',
    },
    submit_flag: false,
    loading_flag: false,
    templates: []
  }

  componentDidMount = () => {
    this.props.getTemplateList();
  };
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.res_errors) {
      this.setState({
        res_errors: nextProps.res_errors
      });
    }
    if (nextProps.res_data.api === 'templatelist') {
      this.setState({
        templates: nextProps.res_data.data
      });
    }
    if (nextProps.res_data.api === 'createboard') {
      this.setState({
        data: {
          name: '',
          votes: 6,
          template: '',
          hide_cards: false,
          disable_votes: false,
          hide_vote_count: false,
          show_card_author: false,
        },
        errors: {
          name: '',
          votes: '',
        },
        submit_flag: false,
        loading_flag: false,
        templates: []
      });
    }
  }

  render() {
    const { data, templates, submit_flag, loading_flag, errors } = this.state;
    const { open } = this.props;

    const checkNoError = () => {
      const state_errors = this.state.errors;
      if (!state_errors.name && !state_errors.votes) {
        return true;
      }
      return false;
    }

    const checkValidate = () => {
      const errors = {
        name: '',
        votes: '',
      };
      if (isEmpty(this.state.data.name)) {
        errors.name = 'Please insert the value';
      }
      if (isEmpty(this.state.data.votes)) {
        errors.votes = 'Please insert the value';
      } else {
        if (this.state.data.votes <= 0) {
          errors.votes = 'Please set the value more than 0';
        }
      }
      this.setState({
        errors: errors
      });
    }

    const onChange = prop => event => {
      const board_data = this.state.data;
      if (event.target.type === "checkbox") {
        board_data[prop] = !board_data[prop];
      } else {
        board_data[prop] = event.target.value;
      }
      this.setState({
        data: board_data
      });
      if (submit_flag) {
        setTimeout(()=> checkValidate(), 300);
      }
    }

    const onClose = (event) => {
      this.props.handleClose();
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
          const submit_data = this.state.data;
          this.props.handleSubmit(submit_data);
        }
      }, 300);
    }

    return (
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle className={scss['board-modal-title']}>
          {"Create Board"}
          <IconButton onClick={onClose} disabled={loading_flag} className={scss['board-modal-close-btn']}>
            <CloseIcon/>
          </IconButton>
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
              value={data.name}
              onChange={onChange('name')}
              className={(errors.name) ? scss['is-invalid'] + ' ' : ''}
            />
            {errors.name && <div className={scss['invalid-feedback']}>{errors.name}</div>}
          </FormControl>
          <FormControl className={scss['board-form-control-margin']}>
            <Typography variant="subtitle1" align="left" className={scss['board-modal-header']}>
              Max votes per user(whole board)
            </Typography>
            <TextField
              fullWidth={true}
              margin="dense"
              name="votes"
              type="number"
              value={data.votes}
              onChange={onChange('votes')}
              className={(errors.votes) ? scss['is-invalid'] + ' ' : ''}
            />
            {errors.votes && <div className={scss['invalid-feedback']}>{errors.votes}</div>}
          </FormControl>
          <FormControl className={scss['board-form-control-margin']}>
            <Typography variant="subtitle1" align="left" className={scss['board-modal-header']}>
              Template
            </Typography>
            <Select
              native
              value={data.template}
              onChange={onChange('template')}
              input={
                <OutlinedInput name="template"/>
              }
            >
              {templates.map(function(item, index) {
                return <option value={item._id} key={index}>{item.name}</option>
              })};
            </Select>
          </FormControl>
          <FormControl className={scss['board-form-control']}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.hide_cards}
                  value={data.hide_cards}
                  onChange={onChange('hide_cards')}
                  color="primary"
                />
              }
              label="Hide cards initially"
            />
          </FormControl>
          <FormControl className={scss['board-form-control']}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.disable_votes}
                  value={data.disable_votes}
                  onChange={onChange('disable_votes')}
                  color="primary"
                />
              }
              label="Disable votes initially"
            />
          </FormControl>
          <FormControl className={scss['board-form-control']}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.hide_vote_count}
                  value={data.hide_vote_count}
                  onChange={onChange('hide_vote_count')}
                  color="primary"
                />
              }
              label="Hide vote count"
            />
          </FormControl>
          <FormControl className={scss['board-form-control']}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.show_card_author}
                  value={data.show_card_author}
                  onChange={onChange('show_card_author')}
                  color="primary"
                />
              }
              label="Show card's author"
            />
          </FormControl>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={onSubmit}
            disabled={loading_flag}
            className={scss['board-control-button']}
            >
              Create
              {loading_flag && <CircularProgress size={24} className={scss['process_btn']} />}
          </Button>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            onClick={onClose}
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

BoardModal.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  res_errors: state.errors,
  res_data: state.res_data,
});

export default (connect(mapStateToProps, { getTemplateList }))(BoardModal);
