import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import BoardItem from './board.item.component';

import scss from '../boards.module.scss';

class BoardColumn extends React.Component {
  state = {
    column: {
    },
    edit: false,
  }

  componentDidMount = () => {
    this.setState({
      column: this.props.column
    })
  };
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      column: nextProps.column
    });
  }

  render() {
    const { classes, enable_vote, disable_votes, hide_vote_count, columnIndx } = this.props;
    const { column, edit } = this.state;
    
    let delete_enalbe = true;
    if (!columnIndx) {
      delete_enalbe = false;
    }

    const getColumnStyle = (color, colorpanStyle) => ({
      background: color,
      ...colorpanStyle
    });

    const handleChange = prop => event => {
      const column_data = this.state.column;
      column_data[prop] = event.target.value;
      this.setState({
        column: column_data
      });
    }

    const handleAddItem = () => {
      const column_data = this.state.column;
      this.setState({
        column: {
          _id: column_data._id,
          color: column_data.color,
          name: column_data.name,
          order: column_data.order,
          items: [
            {
              _id: null,
              content: '',
              stored: false,
              edit: true,
              votes: 0,
              comment: '',
              commenting: false,
              comments: []
            },
            ...column_data.items,
          ]
        }
      });
    };

    const handleUpdateItem = (index, content) => {
      const column_data = this.state.column;
      const item_id = column_data.items[index]._id;
      column_data.items[index].content = content;
      column_data.items[index].edit = false;
      column_data.items[index].stored = true;
      this.setState({
        column: column_data
      });
      this.props.onUpdateItemContentEvent(column_data._id, item_id, content);
    };
    
    const handleEditItem = (index) => {
      const column_data = this.state.column;
      column.items[index].edit = true;
      this.setState({
        column: column_data
      })
    };
    
    const handleDelItem = (index) => {
      const column_data = this.state.column;
      const item_id = column_data.items[index]._id;
      column.items.splice(index, 1);
      this.setState({
        column: column_data
      });
      this.props.onDelItemEvent(column_data._id, item_id);
    };
    
    const handleVoteItem = (index) => {
      const column_data = this.state.column;
      const item_id = column_data.items[index]._id;
      // column.items[index].votes = column.items[index].votes + 1;
      // this.setState({
      //   column: column_data
      // });
      this.props.onVoteItemEvent(column_data._id, item_id);
    };
    
    const handleUnvoteItem = (index) => {
      const column_data = this.state.column;
      const item_id = column_data.items[index]._id;
      if (column.items[index].votes) {
        column.items[index].votes = column.items[index].votes - 1;
        this.setState({
          column: column_data
        });
        this.props.onUnvoteItemEvent(column_data._id, item_id);
      }
    };
    
    const handleCommentItem = (index) => {
      const column_data = this.state.column;
      column.items[index].commenting = !column.items[index].commenting;
      this.setState({
        column: column_data
      });
    };

    const handleAddComment = (index, comment) => {
      const column_data = this.state.column;
      const item_id = column_data.items[index]._id;
      column.items[index].comments.push(comment);
      this.setState({
        column: column_data
      });
      this.props.onAddCommentEvent(column_data._id, item_id, comment);
    };

    const handleDelComment = (item_index, comment_index) => {
      const column_data = this.state.column;
      const item_id = column_data.items[item_index]._id;
      const comment_id = column_data.items[item_index].comments[comment_index]._id;
      column.items[item_index].comments.splice(comment_index, 1);
      this.setState({
        column: column_data
      });
      this.props.onDelCommentEvent(column_data._id, item_id, comment_id);
    };

    const handleEditTitle = () => {
      this.setState({
        edit: true
      });
    };

    const handleUpdateTitle = () => {
      const column_name = this.state.column.name;
      this.setState({
        edit: false
      });
      this.props.onUpdateColumnTitleEvent(this.state.column._id, column_name);
    };

    const handleDoneTitle = () => {
      this.setState({
        edit: false
      });
    };

    const handleDelColumn = () => {
      this.props.onDelColumnEvent(this.state.column._id);
    };
    
    return (
      <div>
      <Grid
        spacing={0}
        container
        direction="row"
        className={classes['board-column-panel']}
      >
        <Grid item sm={12} xs={12}>
          <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
            <Grid
              container 
              spacing={0}>
              <Typography
                className={scss['board-column-color']}
                style={getColumnStyle(
                  column.color
                )}
              ></Typography>
              {!edit && <Typography variant="subtitle2" fullwidth="true">
                  {column.name}
                </Typography>}
              {edit && <TextField
                  margin="none"
                  name="name"
                  value={column.name}
                  onChange={handleChange('name')}
                />}
              {!edit && <Fab size="small" className={scss['small-trans-button']} onClick={handleEditTitle}>
                  <EditIcon className={scss['small-trans-icon']}/>
                </Fab>}
              {(!edit && delete_enalbe) && <div className={scss['small-trans-right-wapper']}><Fab size="small" className={scss['small-trans-button']} onClick={handleDelColumn}>
                  <DeleteIcon className={scss['small-trans-right-red-button']}/>
                </Fab></div>}
            </Grid>
            <Grid
              container 
              spacing={0}>
              {edit && <div><Button
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
            </Grid>
          </FormControl>
        </Grid>
        {!edit && <Grid item sm={12} xs={12} className={scss['board-column-add']} onClick={handleAddItem}>
          <Fab size="small" className={scss['small-trans-button']}>
            <AddIcon className={scss['small-trans-icon']}/>
          </Fab>
        </Grid>}
      </Grid>
      {(!edit && this.state.column.items) && this.state.column.items.map(function(item, index) {
        return <BoardItem
          key={index} classes={classes} itemIndx={index} item={item} color={column.color}
          enable_vote={enable_vote} disable_votes={disable_votes} hide_vote_count={hide_vote_count}
          onDelItemEvent={handleDelItem}
          onUpdateItemEvent={handleUpdateItem}
          onEditItemEvent={handleEditItem}
          onVoteItemEvent={handleVoteItem}
          onUnvoteItemEvent={handleUnvoteItem}
          onCommentItemEvent={handleCommentItem}
          onAddCommentEvent={handleAddComment}
          onDelCommentEvent={handleDelComment}
          ></BoardItem>
      })}
      </div>
    );
  }
}

BoardColumn.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  column: PropTypes.object.isRequired,
  enable_vote: PropTypes.bool.isRequired,
  disable_votes: PropTypes.bool.isRequired,
  hide_vote_count: PropTypes.bool.isRequired,
  onUpdateColumnTitleEvent: PropTypes.func.isRequired,
  onDelColumnEvent: PropTypes.func.isRequired,  
  onUpdateItemContentEvent: PropTypes.func.isRequired,
  onDelItemEvent: PropTypes.func.isRequired,
  onVoteItemEvent: PropTypes.func.isRequired,
  onUnvoteItemEvent: PropTypes.func.isRequired,
  onAddCommentEvent: PropTypes.func.isRequired,
  onDelCommentEvent: PropTypes.func.isRequired,
};

export default BoardColumn;
