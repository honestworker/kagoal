import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import Grid from '@material-ui/core/Grid';

import BoardAdd from './components/board.add.component';
import BoardWidget from './components/board.widget.component';
import BoardModal from './components/board.modal.component';

import themeStyles from './boards.theme.style';
import scss from './boards.module.scss';

import { createBoard, getBoardList } from '../../../actions/boards.action';

class BoardsList extends React.Component {
  state = {
    baords: [],
    open_modal: false,
    data: [],
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
        open_modal: false
      });
    }
    if (nextProps.res_data.api === 'boardlist') {
      this.setState({
        baords: nextProps.res_data.data
      });
    }
  }

  render() {
    const { data, baords, open_modal } = this.state;
    const { classes } = this.props;
    
    const onAddBoard = (event) => {
      this.setState({
        open_modal: true
      })
    };

    const onCloseModal = (event) => {
      this.setState({
        open_modal: false
      })
    };

    const onCreateBoard = (data) => {
      this.props.createBoard(data);
    };
    
    return (
      <Grid
        spacing={0}
        container
        direction="row"
      >
        {baords.map(function(item, index) {
          return  <Grid item key={index} sm={3} xs={12} className={scss['board-container']}><BoardWidget classes={classes} data={item}/></Grid>
        })}
        <Grid item sm={3} xs={12} className={scss['board-container']}>
          <BoardAdd
            classes={classes}
            handleEvent={onAddBoard}
          />
        </Grid>
        <BoardModal
          classes={classes}
          data={data}
          open={open_modal}
          handleSubmit={onCreateBoard}
          handleClose={onCloseModal}
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

export default compose(withWidth(), withStyles(themeStyles, { withTheme: true }), connect(mapStateToProps, { createBoard, getBoardList }))(BoardsList);
