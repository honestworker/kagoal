import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
  };

  textArea = null;

  copyClipBoard = () => {
    this.textArea.select()
    document.execCommand('copy')
  }

  render() {
    const { classes, data } = this.props;

    const handleClone = (event) => {
      this.props.onCloneEvent(this.props.data._id);
    }
    
    const handleView = (event) => {
      this.props.onViewEvent("/boards/" + data.team + '/' + data._id);
    }

    return (
      <Grid
        spacing={0}
        container
        direction="row"
        alignItems="center"
        justify="center"
        className={classes['board-panel']}
      >
        <Grid item sm={12} xs={12} className={scss['board-body']} onClick={handleView}>
          <Typography variant="subtitle1" gutterBottom>
            {data.name}
          </Typography>
          <Fab size="small" aria-label="add" className={scss['small-icon-button-container']}>
            <AccessTime className={classes['small-icon-button']}/>
          </Fab>
          <Typography className={scss['small-text']}>
            {moment(data.created_at).format('DD MMMM, YYYY')}
          </Typography>
        </Grid>
        <Grid item sm={12} xs={12} className={classes['board-actions']}>
          <Grid
            spacing={0}
            container
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Grid item sm={6} xs={6} className={classes['board-action']} onClick={this.copyClipBoard}>
              <Fab size="small" aria-label="add" className={scss['small-icon-button-container']}>
                <FileCopyOutlinedIcon className={classes['small-icon-button']}/>
              </Fab>
              <Typography className={scss['small-text']}>
                URL
              </Typography>
            </Grid>
            <Grid item sm={6} xs={6} className={classes['board-action']} onClick={handleClone}>
              <Fab size="small" aria-label="add" className={scss['small-icon-button-container']}>
                <BookmarksOutlinedIcon className={classes['small-icon-button']}/>
              </Fab>
              <Typography className={scss['small-text']}>
                CLONE
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <input style={{ position: 'fixed', top: '-1000px' }} defaultValue={window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/boards/" + data.team + '/' + data._id} type="text" ref={(textarea) => this.textArea = textarea}  />
      </Grid>
    );
  }
}

BoardWidget.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  data: PropTypes.object.isRequired,
  onCloneEvent: PropTypes.func.isRequired,
  onViewEvent: PropTypes.func.isRequired,
};

export default BoardWidget;
