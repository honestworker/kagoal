import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import LocalHospitalOutlinedIcon from '@material-ui/icons/LocalHospitalOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import ForumIcon from '@material-ui/icons/Forum';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';

import scss from '../boards.module.scss';

class BoardSidenav extends React.Component {
  render() {
    const { classes, open, data } = this.props;

    const toggleDrawer = () => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      
      this.props.onCloseEvent();
    };
  
    const handleChange = prop => event => {
      if (event.target.type === "checkbox") {
        this.props.onChagneStatusEvent(prop);
      } else {
      }
    }

    const handleIncVote = () => event => {
      this.props.onChagneValueEvent('votes', 'inc');
    };

    const handleDesVote = () => event => {
      this.props.onChagneValueEvent('votes', 'desc');
    };

    const handleCopyToClipboard = () => event => {
    };

    const handleExportBoard = () => event => {
    };

    const handleImportCSV = () => event => {
    };

    const handleShowHideComment = () => event => {
      this.props.onChagneStatusEvent('show_comment');
    };

    const handleResetAllVotes = () => event => {
      this.props.onResetAllVotesEvent();
    };

    const handleDeleteAllCards = () => event => {
      this.props.onDelAllCardsEvent();
    };

    const handleDeleteBoard = () => event => {
      this.props.onDelAllBoardEvent();
    };

    return (
      <Drawer anchor="right" open={open} onClose={toggleDrawer()}>
        <Grid
          role="presentation" 
          className={scss['board-siderbar-panel']}>
          <Grid item sm={12} xs={12} className={scss['board-siderbar-action']}>
            <Fab size="small" className={scss['small-trans-right-button-rm']} onClick={toggleDrawer()}>
              <CloseRoundedIcon/>
            </Fab>
          </Grid>
          <Typography variant="h6" fullwidth="true" gutterBottom>
            Board controls
          </Typography>
          <Grid item sm={12} xs={12} className={scss['board-siderbar-checks']}>
            <FormControl className={scss['board-direction-row']}>
              <Typography variant="subtitle1" align="left" className={scss['board-modal-header']}>
                Max votes: 
              </Typography>
              <Typography variant="h6" align="left" className={scss['board-modal-header']}>
                {data.votes}
              </Typography>
              <Fab size="small" onClick={handleIncVote()} className={scss['small-trans-button-tm']}>
                <LocalHospitalOutlinedIcon/>
              </Fab>
              <Fab size="small" onClick={handleDesVote()} className={scss['small-trans-button-tm']}>
                <IndeterminateCheckBoxOutlinedIcon/>
              </Fab>              
            </FormControl>
            <FormControl className={scss['board-form-control']}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.hide_cards}
                    value={data.hide_cards}
                    onChange={handleChange('hide_cards')}
                    color="primary"
                  />
                }
                label="Hide cards"
              />
            </FormControl>
            <FormControl className={scss['board-form-control']}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.disable_votes}
                    value={data.disable_votes}
                    onChange={handleChange('disable_votes')}
                    color="primary"
                  />
                }
                label="Disable votes"
              />
            </FormControl>
            <FormControl className={scss['board-form-control']}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.hide_vote_count}
                    value={data.hide_vote_count}
                    onChange={handleChange('hide_vote_count')}
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
                    onChange={handleChange('show_card_author')}
                    color="primary"
                  />
                }
                label="Show card's author"
              />
            </FormControl>
          </Grid>
          <Grid item sm={12} xs={12}>
            <FormControl className={scss['board-button-action']} onClick={handleCopyToClipboard}>
              <Fab size="small" className={scss['small-trans-func-button']}>
                <FileCopyOutlinedIcon/>
              </Fab>
              <Typography variant="subtitle1" align="left" className={scss['board-modal-header']}>
                Copy board to clipboard
              </Typography>
            </FormControl>
          </Grid>
          <Grid item sm={12} xs={12}>
            <FormControl className={scss['board-button-action']} onClick={handleExportBoard}>
              <Fab size="small" className={scss['small-trans-func-button']}>
                <CloudDownloadOutlinedIcon/>
              </Fab>
              <Typography variant="subtitle1" align="left" className={scss['board-modal-header']}>
                Export Board
              </Typography>
            </FormControl>
          </Grid>
          <Grid item sm={12} xs={12}>
            <FormControl className={scss['board-button-action']} onClick={handleImportCSV}>
              <Fab size="small" className={scss['small-trans-func-button']}>
                <CloudUploadOutlinedIcon/>
              </Fab>
              <Typography variant="subtitle1" align="left" className={scss['board-modal-header']}>
                Import CSV
              </Typography>
            </FormControl>
          </Grid>
          <Grid item sm={12} xs={12}>
            <FormControl className={scss['board-button-action']} onClick={handleShowHideComment()}>
              <Fab size="small" className={scss['small-trans-func-button']}>
                {data.show_comment && <ForumIcon/>}
                {!data.show_comment && <ForumOutlinedIcon/>}
              </Fab>
              <Typography variant="subtitle1" align="left" className={scss['board-modal-header']}>
                Show/Hide Comments
              </Typography>
            </FormControl>
          </Grid>
          <Grid item sm={12} xs={12}>
            <FormControl className={scss['board-button-action']} onClick={handleResetAllVotes()}>
              <Fab size="small" className={scss['small-trans-func-button']}>
                <RefreshOutlinedIcon/>
              </Fab>
              <Typography variant="subtitle1" align="left" className={scss['board-modal-header']}>
                Reset all votes
              </Typography>
            </FormControl>
          </Grid>
          <Grid item sm={12} xs={12}>
            <FormControl className={scss['board-button-action']} onClick={handleDeleteAllCards()}>
              <Fab size="small" className={scss['small-trans-func-button']}>
                <DeleteOutlineOutlinedIcon/>
              </Fab>
              <Typography variant="subtitle1" align="left" className={scss['board-modal-header']}>
                Delete all cards
              </Typography>
            </FormControl>
          </Grid>
          <Grid item sm={12} xs={12}>
            <FormControl className={scss['board-button-action']} onClick={handleDeleteBoard()}>
              <Fab size="small" className={scss['small-trans-func-button']}>
                <DeleteOutlineOutlinedIcon/>
              </Fab>
              <Typography variant="subtitle1" align="left" className={scss['board-modal-header']}>
                Delete board
              </Typography>
            </FormControl>
          </Grid>
        </Grid>
      </Drawer>
    );
  }
}

BoardSidenav.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  data: PropTypes.object.isRequired,
  onCloseEvent: PropTypes.func.isRequired,
  onChagneStatusEvent: PropTypes.func.isRequired,
  onChagneValueEvent: PropTypes.func.isRequired,
  onResetAllVotesEvent: PropTypes.func.isRequired,
  onDelAllCardsEvent: PropTypes.func.isRequired,
  onDelAllBoardEvent: PropTypes.func.isRequired,
};

export default BoardSidenav;
