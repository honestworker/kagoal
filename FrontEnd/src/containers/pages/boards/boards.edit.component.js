import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';

import BoardColumn from './components/board.column.component';
import BoardSidenav from './components/board.siderbar.component';
import BoardNewColumnModal from './components/board.new.column.modal.component';

import themeStyles from './boards.theme.style';
import scss from './boards.module.scss';

import { getBoardDetail, updateBoard, updateBoardItem, deleteBoardItem, deleteBoard, createBoardColumn } from '../../../actions/boards.action';

class BoardEdit extends React.Component {
  constructor() {
    super();
    this.state = { 
      board: {},
      columns: [],
      ismobile: false,
      siderbar: false,
      new_modal: false,
      edit_title: false,
      edit_description: false,
      enable_vote: true,
      show_comments: false,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  updateWindowDimensions() {
    if (window.innerWidth < 768) {
      this.setState({ ismobile: true });
    } else {
      this.setState({ ismobile: false });
    }
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.updateWindowDimensions);
    this.updateWindowDimensions();

    this.props.getBoardDetail(this.props.match.params.tid, this.props.match.params.bid);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }

  UNSAFE_componentWillReceiveProps(nextProps, oldState) {
    if (nextProps.res_errors) {
      this.setState({
        res_errors: nextProps.res_errors
      });
    }
    if (nextProps.res_data.api === 'detailboard'
      || nextProps.res_data.api === 'updateboard'
      || nextProps.res_data.api === 'updateboarditem'
      || nextProps.res_data.api === 'deleteboarditem'
      || nextProps.res_data.api === 'createboardcolumn') {
      const column_data = nextProps.res_data.data.columns;
      // for (let column_indx = 0; column_indx < column_data.length; column_indx++) {
      //   if (column_data[column_indx].items) {
      //     column_data[column_indx].items.reverse();
      //   }
      // }
      let total_votes = 0;
      for (let column_indx = 0; column_indx < column_data.length; column_indx++) {
        if (column_data[column_indx].items) {
          for (let item_indx = 0; item_indx < column_data[column_indx].items.length; item_indx++) {
            total_votes = total_votes + column_data[column_indx].items[item_indx].votes;
          }
        }
      }
      let enable_vote = true;
      if (total_votes >= nextProps.res_data.data.votes) {
        enable_vote = false;
      }
      if (nextProps.res_data.data.disable_votes) {
        enable_vote = false;
      }
      this.setState({
        board: nextProps.res_data.data,
        columns: column_data,
        enable_vote: enable_vote,
      });
    }
    if (nextProps.res_data.api === 'deleteboard') {
      this.props.history.push('/boards');
    }
    if (nextProps.res_data.api === 'createboardcolumn') {
      this.setState({
        new_modal: false
      });
    }
  }

  render() {
    const { ismobile, siderbar, board, edit_title, enable_vote, new_modal } = this.state;
    const { classes } = this.props;

    const handelDragEnd = (result) => {
      if (!result.destination) {
        return;
      }

      const columns = reorder(
        this.state.columns,
        result.source.index,
        result.destination.index
      );

      this.setState({
        columns
      });
    }

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const start_id = result[startIndex]._id;
      const end_id = result[endIndex]._id;
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      this.props.updateBoard(board._id, {
        action: 'exchange_column',
        start_id: start_id,
        end_id: end_id,
      })
      return result;
    };

    let drop_direction = "horizontal";
    const getItemStyle = (isDragging, draggableStyle) => ({
      userSelect: "none",
      padding: "10px",
      margin: "10px 5px",
      flexGrow: 1,
      ...draggableStyle
    });
    
    let getListStyle = isDraggingOver => ({
      display: 'flex',
      padding: "10px",
      overflow: 'auto',
      width: '100%',
    });

    if (ismobile) {
      drop_direction = "vertical";
      getListStyle = isDraggingOver => ({
        padding: "10px",
        overflow: 'auto',
        width: '100%',
      });
    }
    
    const handleChange = prop => event => {
      const board_data = this.state.board;
      if (event.target.type === "checkbox") {
        board_data[prop] = !board_data[prop];
      } else {
        board_data[prop] = event.target.value;
      }
      this.setState({
        board: board_data
      });
    }

    const handleUpdateItemContent = (column_id, item_id, content) => {
      this.props.updateBoardItem(board._id, {column: column_id, item: item_id, content: content, action: 'content'});
    };

    const handleDelItem = (column_id, item_id) => {
      this.props.deleteBoardItem(board._id, column_id, item_id);
    };

    const handleVoteItem = (column_id, item_id) => {
      if (enable_vote) {
        this.props.updateBoardItem(board._id, {column: column_id, item: item_id, action: 'vote'});
      }
    };
    
    const handleUnvoteItem = (column_id, item_id) => {
      this.props.updateBoardItem(board._id, {column: column_id, item: item_id, action: 'unvote'});
    };

    const handleAddComment = (column_id, item_id, comment) => {
      this.props.updateBoardItem(board._id, {column: column_id, item: item_id, comment: comment, action: 'add_comment'});
    };

    const handleDelComment = (column_id, item_id, comment_id) => {
      this.props.updateBoardItem(board._id, {column: column_id, item: item_id, comment: comment_id, action: 'del_comment'});
    };
    
    const handleEditTitle = () => {
      this.setState({
        edit_title: true
      });
    }

    const handleDoneTitle = () => {
      this.setState({
        edit_title: false
      });
    }

    const handleUpdateTitle = () => {
      this.setState({
        edit_title: false
      });
      const update_data = {
        action: 'field',
        name: this.state.board.name,
      }
      this.props.updateBoard(board._id, update_data);
    }
    
    const handleNewColumn = () => {
      this.setState({
        new_modal: true
      });
    }

    const handleNewBoard = (data) => {
      this.props.createBoardColumn(board._id, {name: data});
    };

    const handleUpdateColumnTitle = (column_id, name) => {
      const update_data = {
        action: 'column_title',
        name: name,
        column: column_id,
      }
      this.props.updateBoard(board._id, update_data);
    }    

    const handleDelColumn = (column_id) => {
      const update_data = {
        action: 'delete_column',
        column: column_id,
      }
      this.props.updateBoard(board._id, update_data);
    }

    const handleCloseModal = (event) => {
      this.setState({
        new_modal: false
      });
    };

    const handleOpenSiderbar = (event) => {
      this.setState({
        siderbar: true
      })
    };
    
    const handleCloseSiderbar = (event) => {
      this.setState({
        siderbar: false
      })
    };
    
    const handleChangeStatusSiderbar = (prop) => {
      const board_data = this.state.board;
      if (prop === 'show_comment') {
        const column_data = this.state.columns;
        for (let column_indx = 0; column_indx < column_data.length; column_indx++) {
          if (column_data[column_indx].items) {
            for (let item_indx = 0; item_indx < column_data[column_indx].items.length; item_indx++) {
              column_data[column_indx].items[column_indx].commenting = !this.state.show_comments;
            }            
          }
        }
        this.setState({
          columns: column_data,
          show_comments: !this.state.show_comments
        });
      } else {
        board_data[prop] = !board_data[prop];
        const update_data = {
          action: 'field',
          [prop]: board_data[prop],
        }
        this.setState({
          board: board_data
        });
        this.props.updateBoard(board._id, update_data);
      }
    };
    
    const handleChangeValueSiderbar = (prop, val) => {
      const board_data = this.state.board;
      if (prop === 'votes') {
        if (val === 'inc') {
          board_data.votes = board_data.votes + 1;
        } else {
          if (board_data.votes > 1) {
            board_data.votes = board_data.votes - 1;
          }
        }
      }
      this.setState({
        board: board_data
      });
    };
    
    const handleResetAllVotes = (event) => {
      this.props.updateBoard(board._id, {action: 'reset_all_votes'});
    };
    
    const handleDelAllCards = (event) => {
      this.props.updateBoard(board._id, {action: 'reset_all_cards'});
    };

    const handleDelAllBoard = (event) => {
      this.props.deleteBoard(board._id);
    };
    
    return (
      <Grid
        spacing={0}
        container
        direction="row"
      >
        <Grid item sm={12} xs={12} className={scss['board-title']}>
          <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
            <Grid
              container 
              spacing={0}>
              {!edit_title && <Typography variant="subtitle2" fullwidth="true">
                  {board.name}
                </Typography>}
              {edit_title && <TextField
                  margin="none"
                  name="name"
                  value={board.name}
                  onChange={handleChange('name')}
                />}
              {!edit_title && <Fab size="small" className={scss['small-trans-button']} onClick={handleEditTitle}>
                  <EditIcon className={scss['small-trans-icon']}/>
                </Fab>}
              {edit_title && <div><Button
                  color="primary"
                  variant="contained"
                  size="small"
                  className={scss['board-title-button']}
                  onClick={handleUpdateTitle}
                  >
                    Save
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  className={scss['board-title-button']}
                  onClick={handleDoneTitle}
                  >
                    Cancel
                </Button></div>}
                <div className={scss['small-trans-right-wapper']}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    className={scss['board-title-button']}
                    onClick={handleNewColumn}
                    >
                      New Column
                  </Button>
                  <Fab size="small" className={scss['small-trans-button']} onClick={handleOpenSiderbar}>
                    <SettingsIcon className={scss['small-trans-icon']}/>
                  </Fab>
                </div>
            </Grid>
          </FormControl>
        </Grid>
        <Grid item sm={12} xs={12}>
          <DragDropContext onDragEnd={handelDragEnd}>
            <Droppable droppableId="droppable" direction={drop_direction}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.columns.map((column, index) => (
                    <Draggable key={column._id} draggableId={column._id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <BoardColumn classes={classes} column={column} columnIndx={index}
                            enable_vote={enable_vote}
                            disable_votes={board.disable_votes}
                            hide_vote_count={board.hide_vote_count}
                            onUpdateColumnTitleEvent={handleUpdateColumnTitle}
                            onDelColumnEvent={handleDelColumn}
                            onUpdateItemContentEvent={handleUpdateItemContent}
                            onDelItemEvent={handleDelItem}
                            onVoteItemEvent={handleVoteItem}
                            onUnvoteItemEvent={handleUnvoteItem}
                            onAddCommentEvent={handleAddComment}
                            onDelCommentEvent={handleDelComment}                            
                            ></BoardColumn>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
        <BoardSidenav classes={classes} open={siderbar} data={board}
          onCloseEvent={handleCloseSiderbar}
          onChagneStatusEvent={handleChangeStatusSiderbar}
          onChagneValueEvent={handleChangeValueSiderbar}
          onResetAllVotesEvent={handleResetAllVotes}
          onDelAllCardsEvent={handleDelAllCards}
          onDelAllBoardEvent={handleDelAllBoard}/>
        <BoardNewColumnModal
          classes={classes}
          open={new_modal}
          onSumitEvent={handleNewBoard}
          onCloseEvent={handleCloseModal}
        />
      </Grid>
    );
  }
}

BoardEdit.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  res_errors: state.errors,
  res_data: state.res_data,
});

export default withRouter(compose(withWidth(), withStyles(themeStyles, { withTheme: true }), connect(mapStateToProps, { getBoardDetail, updateBoard, updateBoardItem, deleteBoardItem, deleteBoard, createBoardColumn }))(BoardEdit));
