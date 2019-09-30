import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

import themeStyles from './register.theme.style';
import logo from '../../../assets/images/kagoal-logo.png'
import RegisterEmail from './components/register.email.component';
import RegisterInfo from './components/register.info.component';
import RegisterQuestion from './components/register.question.component';
import RegisterTeam from './components/register.team.component';

import scss from './register.module.scss';

import { registerUser, inviteMember, gotoDashboard } from '../../../actions/authentication';

const getSteps = () => {
  return ['Input Email', 'Insert Information', 'Answer the Questions', 'Init Team'];
}

class Register extends React.Component {
  state = {
    activeStep: 0,
    user: {
      email: '',
      full_name: '',
      password: '',
      team_name: '',
      usage: '',
      describe: '',
      collaborate: '',
      manage: '',
      team: ''
    },
    submit: false,
    reg_info: {},
    reg_errors: {},
  }  

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.submit) {
      if (nextProps.reg_errors.email) {
        this.setState({
          reg_info: nextProps.reg_info,
          reg_errors: nextProps.reg_errors
        });
        this.setStep(0);
      }
      if (nextProps.res_data.api === 'register') {
        this.nextStep();
      }
    }
  }

  setStep = (step) => {
    this.setState({
      activeStep: step,
      submit: false
    });
  }

  nextStep = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
      submit: false
    });
  }

  render() {
    const { classes, width } = this.props;
    const steps = getSteps();
    const { activeStep, user, reg_info, reg_errors } = this.state;

    const handleEmailStore = (data) => {
      user.email = data;
      this.setState({
        user: user
      });
      this.nextStep();
    }

    const handleInfoStore = (data) => {
      user.full_name = data.full_name;
      user.password = data.password;
      user.team_name = data.team_name;
      this.setState({
        user: user
      });
      this.nextStep();
    }

    const handleQuestionStore = (data) => {
      user.usage = data.usage;
      user.describe = data.describe;
      user.collaborate = data.collaborate;
      user.manage = data.manage;
      user.team = data.team;
      this.setState({
        user: user,
        submit: true
      });
      this.props.registerUser(user);
    }
    
    const handleInitTeam = (data) => {
      this.props.inviteMember({email: this.state.user.email, password: this.state.user.password, members: data });
    }

    const handleGotoDashboard = () => {
      this.props.gotoDashboard({email: this.state.user.email, password: this.state.user.password });
    }

    return (
      <>
      <AppBar position="static" className={scss['appBar']}>
      <Toolbar variant={"dense"}>
         <img src={logo} className={scss['logo']} alt="kagoal"/>
      </Toolbar>
      </AppBar>
      <Grid
        container
        direction="row"
        spacing={0}
        justify="center"
        alignItems="center"
        className={classes.background}
      >
        {steps.map(function(label, level) {
          if (level === activeStep) {
            if (level === 0) {
              return <RegisterEmail key={level} classes={classes} width={width} onClickNext={handleEmailStore} reg_info={reg_info} reg_errors={reg_errors}></RegisterEmail>
            } else if (level === 1) {
              return <RegisterInfo key={level} classes={classes} width={width} onClickNext={handleInfoStore} reg_info={reg_info} reg_errors={reg_errors}></RegisterInfo>
            } else if (level === 2) {
              return <RegisterQuestion key={level} classes={classes} width={width} onClickNext={handleQuestionStore} reg_info={reg_info} reg_errors={reg_errors}></RegisterQuestion>
            } else if (level === 3) {
              return <RegisterTeam key={level} classes={classes} width={width} onClickNext={handleInitTeam} onClickSkip={handleGotoDashboard} reg_info={reg_info} reg_errors={reg_errors}></RegisterTeam>
            } else {
              return <span key={level}></span>
            }
          } else {
            return <span key={level}></span>
          }
        })}
      </Grid>
      </>
    );    
  }
};

Register.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  reg_info: state.req_info,
  reg_errors: state.errors,
  res_data: state.res_data,
});

export default compose(withWidth(), withStyles(themeStyles, { withTheme: true }), connect(mapStateToProps, { registerUser, inviteMember, gotoDashboard }))(Register);