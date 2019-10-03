import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import Grid from '@material-ui/core/Grid';

import BoardAdd from './components/board.add.component';
import BoardWidget from './components/board.widget.component';
import BoardNewModal from './components/board.new.modal.component';

import themeStyles from './boards.theme.style';
import scss from './boards.module.scss';

import { createBoard, cloneBoard, getBoardList } from '../../../actions/boards.action';

class BoardsList extends React.Component {
  state = {
    boards: [],
    new_modal: false,
    data: [],
    refresh: false
  }

  componentDidMount = () => {
    this.props.getBoardList();
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.res_errors) {
      this.setState({
        res_errors: nextProps.res_errors
      });
    }
    if (nextProps.res_data.api === 'createboard') {
      this.setState({
        new_modal: false
      });
      if (this.state.refresh) {
        this.setState({
          refresh: false
        });
        this.props.getBoardList();
      }
    }
    if (nextProps.res_data.api === 'boardlist') {
      this.setState({
        boards: nextProps.res_data.data
      });
    }
    if (nextProps.res_data.api === 'cloneboard') {
      if (this.state.refresh) {
        this.setState({
          refresh: false
        });
        this.props.getBoardList();
      }
    }
  }

  render() {
    const { data, boards, new_modal } = this.state;
    const { classes } = this.props;
    
    const handleOpenNewBoardModal = (event) => {
      this.setState({
        new_modal: true,
        refresh: true
      })
    };

    const handleCloseModal = (event) => {
      this.setState({
        new_modal: false
      })
    };

    const handleNewBoard = (data) => {
      this.props.createBoard(data);
    };

    const handleCloneBoard = (data) => {
      this.setState({
        refresh: true
      })
      this.props.cloneBoard(data);
    };

    const handleViewBoard = (data) => {
      this.props.history.push(data);
    };

    return (
      <Grid
        spacing={0}
        container
        direction="row"
      >
        {boards.map(function(item, index) {
          return <Grid item key={index} sm={3} xs={12} className={scss['board-container']}><BoardWidget classes={classes} data={item} onCloneEvent={handleCloneBoard} onViewEvent={handleViewBoard}/></Grid>
        })}
        <Grid item sm={3} xs={12} className={scss['board-container']}>
          <BoardAdd
            classes={classes}
            onAddEvent={handleOpenNewBoardModal}
          />
        </Grid>
        <BoardNewModal
          classes={classes}
          data={data}
          open={new_modal}
          onSumitEvent={handleNewBoard}
          onCloseEvent={handleCloseModal}
        />
      </Grid>
    );
  }
}

BoardsList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  res_errors: state.errors,
  res_data: state.res_data,
});

export default compose(withWidth(), withStyles(themeStyles, { withTheme: true }), connect(mapStateToProps, { createBoard, cloneBoard, getBoardList }))(BoardsList);
