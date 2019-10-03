import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import scss from '../boards.module.scss';

class BoardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indx: 0,
      content: '',
      stored: false,
      edit: false,
      votes: 0,
      commenting: false,
      comment: '',
      comments: []
    }

    this.handleKeyup = this.handleKeyup.bind(this);
  }

  handleKeyup = (event) => {
    if (event.keyCode === 13) {
      if (this.state.comment) {
        this.props.onAddCommentEvent(this.state.indx, this.state.comment);
        this.setState({
          comment: ''
        });
      }
    }
    event.stopPropagation();
    event.persist();
  }

  componentDidMount = () => {
    this.setState({
      indx: this.props.itemIndx,
      content: this.props.item.content,
      stored: true,
      edit: false,
      votes: this.props.item.votes,
      // commenting: this.props.item.commenting,
      // comment: this.props.item.comment,
      comments: this.props.item.comments,
    });
    if (typeof this.props.item.commenting != 'undefined') {
      this.setState({
        commenting: this.props.item.commenting,
      });
    }
    if (typeof this.props.item.edit != 'undefined') {
      this.setState({
        edit: this.props.item.edit,
      });
    }
    if (typeof this.props.item.stored != 'undefined') {
      this.setState({
        stored: this.props.item.stored,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      indx: nextProps.itemIndx,
      content: nextProps.item.content,
      stored: true,
      edit: false,
      votes: nextProps.item.votes,
      // commenting: nextProps.item.commenting,
      // comment: nextProps.item.comment,
      comments: nextProps.item.comments,
    });
    if (typeof nextProps.item.commenting != 'undefined') {
      this.setState({
        commenting: nextProps.item.commenting,
      });
    }
    if (typeof nextProps.item.edit != 'undefined') {
      this.setState({
        edit: nextProps.item.edit,
      });
    }
    if (typeof nextProps.item.stored != 'undefined') {
      this.setState({
        stored: nextProps.item.stored,
      });
    }
  }

  render() {
    const { classes, color, enable_vote, disable_votes, hide_vote_count } = this.props;
    const { indx, content, stored, edit, votes, commenting, comment, comments } = this.state;
    
    const votes_arry = [];
    for (let i = 0; i < votes; i++) {
      votes_arry.push(i);
    }
    
    const getItemStyle = (color, itemStyle) => ({
      background: color,
      ...itemStyle
    });

    const comments_arry = [];
    for (let i = 0; i < comments.length; i++) {
      comments_arry.push(
        <FormControl key={i} variant="outlined" fullWidth={true} className={classes.formControl}>
          <Typography variant="subtitle2" fullwidth="true">
            {comments[i].comment}
          </Typography>
          <Fab size="small" className={scss['small-trans-right-red-button']} onClick={() => { this.props.onDelCommentEvent(indx, i); }}>
            <DeleteIcon className={scss['small-trans-icon']}/>
          </Fab>
        </FormControl>);
    }

    const getRedBtnStyle = (itemStyle) => ({
      color: 'red',
      ...itemStyle
    });

    const getGreyBtnStyle = (itemStyle) => ({
      color: 'darkgrey',
      ...itemStyle
    });

    const getWhiteBtnStyle = (itemStyle) => ({
      color: 'white',
      ...itemStyle
    });

    const handleChange = prop => event => {
      this.setState({
        [prop]: event.target.value
      });
      if (prop === 'comment') {
      }
    }

    const handleUpdate = () => {
      this.setState({
        edit: false
      });
      this.props.onUpdateItemEvent(indx, this.state.content);
    };

    const handleEdit = () => {
      this.setState({
        edit: true
      });
      this.props.onEditItemEvent(indx);
    };

    const handleVote = () => {
      this.props.onVoteItemEvent(indx);
    };

    const handleUnvote = () => {
      this.props.onUnvoteItemEvent(indx);
    };

    const handleDelete = () => {
      this.props.onDelItemEvent(indx);
    };

    const handleComment = () => {
      this.setState({
        commenting: !this.state.commenting
      });
      this.props.onCommentItemEvent(indx);
    };

    return (
      <Grid
        spacing={0}
        container
        direction="row"
        className={scss['board-item-panel']}
        style={getItemStyle(
          color
        )}
      >
        <Grid item sm={12} xs={12}>
          <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
            {edit && <TextareaAutosize
                multiline="true"
                rows={1}
                value={content}
                onChange={handleChange('content')}
                className={scss['board-item-title']}
              />}
              {!edit && <Typography variant="subtitle2" gutterBottom>{content}</Typography>}
              {!edit && <Fab size="small" className={scss['small-trans-right-button']} style={getWhiteBtnStyle()} onClick={handleEdit}>
                    <EditIcon className={scss['small-trans-icon']}/>
                </Fab>}
          </FormControl>
        </Grid>
        {edit && <Grid item sm={12} xs={12} className={scss['board-item-actions']}>
          <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              className={scss['item-control-button']}
              onClick={handleUpdate}
              >
                {stored? 'Done' : 'Add'}
            </Button>
            <Fab size="small" className={scss['small-trans-right-button']} style={getRedBtnStyle()} onClick={handleDelete}>
              <DeleteIcon className={scss['small-trans-icon']}/>
            </Fab>
          </FormControl>
        </Grid>}
        {!edit && <Grid item sm={12} xs={12} className={scss['board-item-status']}>
          <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
            <Grid
              container 
              justify="flex-end"
              alignitems="flex-end"
              spacing={0}>
              {(!disable_votes && votes > 0) && votes_arry.map(function(vote, vote_index) {
                return <Fab key={vote_index} size="small" className={scss['small-trans-button']} disabled={true} style={getGreyBtnStyle()}>
                    <FiberManualRecordRoundedIcon className={scss['small-trans-icon']}/>
                  </Fab>})}
              {(!disable_votes && votes > 0) && <Fab size="small" className={scss['small-trans-button']} onClick={handleUnvote} style={getWhiteBtnStyle()}>
                  <CloseRoundedIcon className={scss['small-trans-icon']}/>
                </Fab>}
              {!disable_votes && <Fab size="small" className={scss['small-trans-button']} onClick={handleVote} disabled={!enable_vote} style={getWhiteBtnStyle()}>
                <ThumbUpAltOutlinedIcon className={scss['small-trans-icon']}/>
              </Fab>}
              {(!disable_votes && !hide_vote_count) && <Typography variant="button" align="center">{votes}</Typography>}
              <Fab size="small" className={scss['small-trans-button']} onClick={handleComment} style={getWhiteBtnStyle()}>
                {!commenting && <ChatBubbleOutlineRoundedIcon className={scss['small-trans-icon']}/>}
                {commenting && <ChatBubbleRoundedIcon className={scss['small-trans-icon']}/>}
              </Fab>
              <Typography variant="button" align="center">{comments.length}</Typography>
            </Grid>
          </FormControl>
        </Grid>}
        {(!edit && commenting) && <Grid item sm={12} xs={12}>
              <TextField
                className={scss['board-small-input']}
                placeholder="Enter your comment..."
                fullWidth={true}
                margin="dense"
                variant="outlined"
                value={comment}
                onChange={handleChange('comment')}
                onKeyUp={this.handleKeyup}
              />
            </Grid>}
        <Grid item sm={12} xs={12}>
        {(!edit && commenting && comments.length > 0) && comments_arry}
        </Grid>
      </Grid>
    );
  }
}

BoardItem.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  item: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  enable_vote: PropTypes.bool.isRequired,
  disable_votes: PropTypes.bool.isRequired,
  hide_vote_count: PropTypes.bool.isRequired,
  onDelItemEvent: PropTypes.func.isRequired,
  onUpdateItemEvent: PropTypes.func.isRequired,
  onEditItemEvent: PropTypes.func.isRequired,
  onVoteItemEvent: PropTypes.func.isRequired,
  onUnvoteItemEvent: PropTypes.func.isRequired,
  onCommentItemEvent: PropTypes.func.isRequired,
  onAddCommentEvent: PropTypes.func.isRequired,
  onDelCommentEvent: PropTypes.func.isRequired,
};

export default BoardItem;
