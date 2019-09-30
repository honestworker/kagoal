import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Fab from '@material-ui/core/Fab';
import AccessTime from '@material-ui/icons/AccessTime';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';

import scss from '../boards.module.scss';

class BoardWidget extends React.Component {
  state = {
    clipboard: ''
  }

  componentDidMount = () => {
    console.log(this.props.data);
  };

  textArea = null;

  copyClipBoard = () => {
    this.textArea.select()
    document.execCommand('copy')
  }


  render() {
    const { clipboard } = this.state;
    const { classes, data } = this.props;

    return (
      <Grid
        spacing={0}
        container
        direction="row"
        alignItems="center"
        justify="center"
        className={classes['board-panel']}
      >
        <Grid item sm={12} xs={12} className={scss['board-body']}>
          <Typography variant="subtitle1" gutterBottom>
            {data.name}
          </Typography>
          <Fab size="small" aria-label="add" className={scss['small-icon-button-container']}>
            <AccessTime className={scss['small-icon-button']}/>
          </Fab>
          <Typography className={scss['small-text']}>
            {moment(data.created_at).format('DD MMMM, YYYY')}
          </Typography>
        </Grid>
        <Grid item sm={12} xs={12} className={scss['board-actions']}>
          <Grid
            spacing={0}
            container
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Grid item sm={6} xs={6} className={scss['board-action']} onClick={this.copyClipBoard}>
              <Fab size="small" aria-label="add" className={scss['small-icon-button-container']}>
                <FileCopyOutlinedIcon className={scss['small-icon-button']}/>
              </Fab>
              <Typography className={scss['small-text']}>
                URL
              </Typography>
            </Grid>
            <Grid item sm={6} xs={6} className={scss['board-action']}>
              <Fab size="small" aria-label="add" className={scss['small-icon-button-container']}>
                <BookmarksOutlinedIcon className={scss['small-icon-button']}/>
              </Fab>
              <Typography className={scss['small-text']}>
                CLONE
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <input style={{ position: 'fixed', top: '-1000px' }} defaultValue={window.location.protocol + window.location.hostname + "/boards/" + data.team + '/' + data._id} type="text" ref={(textarea) => this.textArea = textarea}  />
      </Grid>
    );
  }
}

BoardWidget.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  data: PropTypes.object.isRequired,
};

export default BoardWidget;
