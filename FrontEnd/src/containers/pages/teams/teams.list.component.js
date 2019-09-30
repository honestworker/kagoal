import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import TreeTable from '../../elements/tables/tree.component';

import themeStyles from './teams.theme.style';
import scss from './teams.module.scss';

import { getTeamList, deleteTeam } from '../../../actions/teams.action';
import { getBoardList } from '../../../actions/boards.action';

class TeamsList extends React.Component {
  state = {
    columns: [
      { title: 'Name', name: 'name' },
      { title: 'Description', name: 'description' },
      { title: 'Board', name: 'board' },
      { title: 'User', name: 'user' },
      { title: 'Created At', name: 'created_at' },
    ],
    boards_data: [],
    res_data: [],
    res_errors: []
  }

  componentDidMount = () => {
    this.props.getBoardList();
    this.props.getTeamList();
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.res_errors) {
      this.setState({
        res_errors: nextProps.res_errors
      });
    }
    if (nextProps.res_data.api === 'teamlist') {
      const teams_data = [];
      const boards_data = this.state.boards_data;
      nextProps.res_data.data.map((team, index1) => {
        let boad_name = '';
        boards_data.map((board, index2) => {
          if (board.id === team.board) {
            boad_name = board.name;
          }
        });
        teams_data.push({
          id: team.id,
          rowid: index1,
          board: boad_name,
          created_at: moment(team.created_at).format('DD MMMM, YYYY'),
          description: team.description,
          name: team.name,
          parentId: team.parentId,
          user: team.user,
        })
      });
      this.setState({
        res_data: teams_data
      });
    }
    if (nextProps.res_data.api === 'boardlist') {
      this.setState({
        boards_data: nextProps.res_data.data
      })
    }
  }

  render() {
    const { classes } = this.props;

    const handleDeleteTeam = (deleteId) => {
      this.props.deleteTeam(deleteId);
    }

    return (
      <TreeTable
        columns={this.state.columns}
        rows={this.state.res_data}
        link="/team/"
        delHandle={handleDeleteTeam}
      />
    );
  }
}

TeamsList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  res_errors: state.errors,
  res_data: state.res_data,
});

export default compose(withWidth(), withStyles(themeStyles, { withTheme: true }), connect(mapStateToProps, { getTeamList, getBoardList, deleteTeam }))(TeamsList);
