import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CircularProgress from '@material-ui/core/CircularProgress';

import TreeSelect from 'rc-tree-select';
import 'rc-tree-select/assets/index.css';

import themeStyles from './teams.theme.style';
import scss from './teams.module.scss';

import isEmpty from '../../../validation/is-empty';

import { getTeamTreeList, createTeam } from '../../../actions/teams.action';
import { getBoardList } from '../../../actions/boards.action';

class TeamsCreate extends React.Component {
  state = {
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Description', field: 'description' },
      { title: 'Board', field: 'board' },
      { title: 'Date', field: 'date' },
    ],
    data: {
      id: '',
      name: '',
      description: '',
      parentId: '',
      board: '',
    },
    errors: {
      name: '',
      description: '',
      parentId: '',
      board: '',
    },
    loading_flag: false,
    submit_flag: false,
    boards_data: [],
    teams_data: []
  }

  componentDidMount = () => {
    this.props.getTeamTreeList();
    this.props.getBoardList();
  };

  getTeamsTree = (teams) => {
    const teams_tree = [];
    function _getTeamsTree(team, team_deep = []) {
      if (team) {
        let teams_tree_children = teams_tree;
        if (team_deep.length) {
          for (let team_deep_indx = 0; team_deep_indx < team_deep.length; team_deep_indx++) {
            teams_tree_children = teams_tree_children[team_deep[team_deep_indx]].children;
          }
        }
        if (team.children.length) {
          team.children.map((team_child_loop, team_child_indx) => {
            teams_tree_children.push({
              title: team_child_loop.name,
              value: team_child_loop.id,
              key: team_child_loop.id,
              children: [],
            });
            team_deep.push(team_child_indx);
            _getTeamsTree(team_child_loop, team_deep);
            team_deep.pop();
          });
        }
      }
    }

    if (teams) {
      if (teams.length) {
        const team_deep = [];
        teams.map((team_loop, team_indx) => {
          const team_data = this.state.data;
          team_data.parentId = team_loop.id;
          this.setState({
            data: team_data
          });
          teams_tree.push({
            title: team_loop.name,
            value: team_loop.id,
            key: team_loop.id,
            children: []
          });
          team_deep.push(team_indx);
          _getTeamsTree(team_loop, team_deep);
          team_deep.pop();
        });
      }
    }
    
    return teams_tree;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.res_errors) {
      if (this.state.loading_flag) {
        if (typeof nextProps.res_errors.name != 'undefined') {
          const res_errors = this.state.errors;
          res_errors.name = nextProps.res_errors.name;
          this.setState({
            errors: res_errors
          });
          this.setState({
            loading_flag: false,
          });
        }
      }
    }

    if (nextProps.res_data.api === 'teamtree') {
      const teams_data = this.getTeamsTree(nextProps.res_data.data);
      this.setState({
        teams_data: teams_data
      });
    }

    if (nextProps.res_data.api === 'boardlist') {
      this.setState({
        boards_data: nextProps.res_data.data
      })
    }

    if (nextProps.res_data.api === 'createteam') {
      this.props.history.push('/teams');
    }
  }

  render() {
    const { classes } = this.props;
    const { data, submit_flag, loading_flag, teams_data, boards_data, errors } = this.state;

    const checkNoError = () => {
      const state_errors = this.state.errors;
      if (!state_errors.name && !state_errors.description && !state_errors.board) {
        return true;
      }
      return false;
    }

    const checkValidate = () => {
      const errors = {
        name: '',
        description: '',
        parentId: '',
        board: '',
      };
      const team_data = this.state.data;
      if (isEmpty(team_data.name)) {
        errors.name = 'Please insert the value';
      }
      if (isEmpty(team_data.description)) {
        errors.description = 'Please insert the value';
      }
      if (isEmpty(team_data.board)) {
        errors.board = 'Please check the value';
      }
      this.setState({
        errors: errors
      });
    }

    const handleChange = prop => event => {
      data[prop] = event.target.value;
      this.setState({
        data: data
      });
      if (submit_flag) {
        setTimeout(()=> checkValidate(), 300);
      }
    }

    const handleSubmit = (event) => {
      const data = this.state.data;
      this.setState({
        submit_flag: true
      });
      checkValidate();
      setTimeout(()=> {
        if (checkNoError()) {
          this.setState({
            loading_flag: true
          });
          const submit_data = {
            id: data.id,
            name: data.name,
            parentId: data.parentId,
            board: data.board,
            description: data.description,
          }
          this.props.createTeam(submit_data);
        }
      }, 300);
    };
    
    const handleCancel = (event) => {
      this.props.history.push('/teams');
    };

    return (
      <Grid
        spacing={0}
        container
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Grid item sm={3} xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                <label className={scss['label-spacing']}>Team Name</label>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  name="name"
                  value={data.name}
                  onChange={handleChange('name')}
                  className={((errors.name) ? scss['is-invalid'] : '')}
                  variant="outlined"
                  />
                  {errors.name && <div className={scss['invalid-feedback']}>{errors.name}</div>}
                <label className={scss['label-spacing']}>Description</label>
                <TextareaAutosize
                  margin="dense"
                  name="description"
                  value={data.description}
                  rows={5}
                  onChange={handleChange('description')}
                  className={((errors.description) ? scss['is-invalid'] + scss['normal-font'] : scss['normal-font'])}
                  variant="outlined"
                  />
                  {errors.description && <div className={scss['invalid-feedback']}>{errors.description}</div>}
                <label className={scss['label-spacing']}>Parent</label>
                <TreeSelect
                  transitionName="rc-tree-select-dropdown-slide-up"
                  choiceTransitionName="rc-tree-select-selection__choice-zoom"
                  dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                  placeholder={<span>Please select</span>}
                  searchPlaceholder="Input the search value"
                  treeData={teams_data}
                  treeLine
                  treeNodeFilterProp="title"
                  value={data.parentId}
                  onChange={(val, ...args) => {
                    data.parentId = args[1].triggerValue;
                    this.setState({
                      data: data
                    });
                  }}
                />
                <label className={scss['label-spacing']}>Board</label>
                <Select
                  native
                  value={data.board}
                  onChange={handleChange('board')}
                  input={
                    <OutlinedInput name="board"/>
                  }
                >
                  <option value="" disabled>Select One</option>
                  {boards_data.map(function(item, index) {
                    return <option value={item.id} key={index}>{item.name}</option>
                  })};
                </Select>
                {errors.board && <div className={scss['invalid-feedback']}>{errors.board}</div>}
              </FormControl>
              <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                <Grid
                  spacing={5}
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={6} sm={6} className={scss['center_container']}>
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      onClick={handleSubmit}
                      disabled={loading_flag}
                      className={scss['submit_btn']}
                      >
                      Create
                      {loading_flag && <CircularProgress size={24} className={scss['process_btn']} />}
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} className={scss['center_container']}>
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      onClick={handleCancel}
                      className={scss['cancel_btn']}>Cancel</Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

TeamsCreate.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  res_errors: state.errors,
  res_data: state.res_data,
});

export default withRouter(compose(withWidth(), withStyles(themeStyles, { withTheme: true }), connect(mapStateToProps, { getTeamTreeList, getBoardList, createTeam }))(TeamsCreate));
