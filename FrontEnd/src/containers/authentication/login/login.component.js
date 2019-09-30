import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import { borders } from '@material-ui/system';
import logo from '../../../assets/images/kagoal-logo.png'
import { withStyles } from '@material-ui/core/styles';
import isEmpty from '../../../validation/is-empty';
import isEmail from '../../../validation/is-email';
import pssswordStrength from '../../../validation/password-strength';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import themeStyles from './login.theme.style';
import scss from './login.module.scss';

import { loginUser } from '../../../actions/authentication';

const getSteps = () => {
  return ['Input Email', 'Insert Password'];
}

class Login extends React.Component {
  state = {
    activeStep: 0,
    user: {
      email: '',
      password: '',
    },
    errors: {
      email: '',
      password: ''
    },
    showPassword: false,
    req_flag: false,
    next_flag: false,
    submit_flag: false,
    submit_css: scss['submit_btn']
  }  

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.submit_flag) {
      if (nextProps.req_errors.email || nextProps.req_errors.password) {
        this.setState({
          user: nextProps.req_info,
          errors: nextProps.req_errors
        });
        if (nextProps.req_errors.email) {
          this.setStep(0);
        } else {
          this.setStep(1);
        }
      }
      if (nextProps.res_type === 'login') {
        this.props.history.push('/');
      }
    }
  }

  setStep = (step) => {
    this.setState({
      activeStep: step,
      req_flag: false,
      showPassword: false,
      submit_css: scss['submit_btn'],
      submit_flag: false
    });
  }

  nextStep = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
      req_flag: false,
      showPassword: false,
      submit_flag: false
    });
  }

  render() {
    const panelDirection = this.props.width === 'xs' ? 'column' : 'row';
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, user, errors, showPassword, next_flag, submit_flag, req_flag, submit_css } = this.state;

    const checkValidate = () => {
      const check_errors = {
        email: '',
        password: ''
      };
      if (this.state.next_flag) {
        if (isEmpty(this.state.user.email)) {
          check_errors.email = 'Please insert the value';
        } else {
          if (!isEmail(this.state.user.email)) {
            check_errors.email = 'Please insert the valid email';
          }
        }
      }
      if (this.state.submit_flag) {
        if (isEmpty(this.state.user.password)) {
          check_errors.password = 'Please insert the value';
        } else {
          const strength = pssswordStrength(this.state.user.password);
          if (strength === 'no_input') {
            check_errors.password = 'Please insert the value';
          } else if (strength === 'weak') {
            check_errors.password = 'Password needs to be longer than 8 letters';
          }
        }
      }
      this.setState({
        errors: check_errors
      });
      if (!check_errors.email) {
        return true;
      }
      return false;
    }

    const handleClickShowPassword = () => {
      this.setState({
        showPassword: !showPassword
      });
    };
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleChange = prop => event => {
      const data = event.target.value;
      if (prop === 'email') {
        user.email = data;
        this.setState({
          user: user
        });
        if (next_flag) {
          setTimeout(()=>checkValidate(), 300);
        }
      }
      if (prop === 'password') {
        user.password = data;
        this.setState({
          user: user
        });
        if (submit_flag) {
          setTimeout(()=>checkValidate(), 300);
        }
      }
    };

    const checkEmail = () => {
      if (checkValidate()) {
        this.nextStep();
      }
    }

    const handleNext = (event) => {
      this.setState({
        next_flag: true
      });
      setTimeout(()=>checkEmail(), 300);
    };

    const checkPassword = () => {
      if (checkValidate()) {
        this.props.loginUser(this.state.user, this.props.history);
      }
    }

    const handleSubmit = (event) => {
      this.setState({
        submit_flag: true,
        req_flag: true,
      });      
      setTimeout(()=>checkPassword(), 300);
    };

    return (
    <>
      <AppBar position="static" className={scss['appBar']}>
      <Toolbar variant={"dense"}>
         <img src={logo} className={scss['logo']}/>
      </Toolbar>
      </AppBar>
    
      <Grid
        container
        direction="row"
        spacing={0}
        justify="center"
        alignitems="center"
        className={classes.background}
      >
      
        <Grid item sm={3} xs={12} className={scss['panel']} >
        
          <Grid justify="center" alignitems="center" container spacing={0}>
            <Grid item xs={9}>
                  <Grid 
                    container
                    spacing={0}>
                    <Typography variant="h4" component="h4" gutterBottom className={scss['robot-thin']}>
                    Login to your account
                    </Typography>
                    <label className={scss['robot-bold']}>
                    Enter your work email address
                    </label>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      {steps.map(function(label, level) {
                        if (level === activeStep) {
                          if (level === 0) {
                            return <Grid container key={level}>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth={true}
                                  margin="dense"
                                  name="email"
                                  value={user.email}
                                  onChange={handleChange('email')}
                                  className={((errors.email) ? scss['is-invalid'] : ''), scss['feild-border']}
                                  variant="outlined"
                                />
                                {errors.email && <div className={scss['invalid-feedback']}>{errors.email}</div>}
                              </Grid>
                              <Grid item xs={12}>
                                <Button
                                fullWidth={true}
                                onClick={handleNext}
                                color="primary"
                                variant="contained"
                                size="large"
                                justify="center"
                                alignitems="center"
                                className={scss['submit_btn']}>Next <ArrowForwardIosIcon style={{fontSize: 20, fontWeight: 'bold'}}/></Button>
                              </Grid>
                            </Grid>
                          } else if (level === 1) {
                            return <Grid container key={level}>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth={true}
                                  margin="normal"
                                  label="Password"
                                  variant="outlined"
                                  type={showPassword ? 'text' : 'password'}
                                  value={user.password}
                                  onChange={handleChange('password')}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          edge="end"
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          onMouseDown={handleMouseDownPassword}
                                        >
                                          {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                  className={((errors.password) ? scss['is-invalid'] + ' ' : '')}
                                />
                                {errors.password && <div className={scss['invalid-feedback']}>{errors.password}</div>}
                              </Grid>
                              <Grid item xs={12}>
                                <Button className={submit_css} disabled={req_flag} fullWidth={true} onClick={handleSubmit} color="primary" variant="contained" size="large">
                                  Sign In{req_flag && <CircularProgress size={24} className={scss['btn-arrow']} />}
                                </Button>
                              </Grid>
                            </Grid>
                          } else {
                            return <span key={level}></span>
                          }
                        } else {
                          return <span key={level}></span>
                        }
                      })}
                    </Grid>
                  </Grid>
                <CardActions className={scss['card-actions']}>
                  <Grid 
                    container 
                    justify="center"
                    alignitems="center">
                    <Typography variant="subtitle1">Don't have an account yet?</Typography>
                    <Link href="/register" className={classes.link, scss['sign-up']}>
                    &nbsp;&nbsp;Sign Up
                    </Link>
                  </Grid>
                </CardActions>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </>
    );    
  }
};

Login.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  req_info: state.req_info,
  req_errors: state.errors,
  res_type: state.res_type,
});

export default compose(withWidth(), withStyles(themeStyles, { withTheme: true }), connect(mapStateToProps, { loginUser }))(Login);