import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import isEmpty from '../../../../validation/is-empty';
import pssswordStrength from '../../../../validation/password-strength';

import scss from '../register.module.scss';

class RegisterInfo extends React.Component {
  state = {
    full_name: '',
    password: '',
    team_name: '',
    checked: false,
    showPassword: false,
    errors: {
      full_name: '',
      password: '',
      team_name: '',
      checked: '',
    },
    submit_flag: false,
    reg_info: {},
    reg_errors: {}
  }

  UNSAFE_componentWillMount = () => {
    if (this.props.reg_info) {
      if (!!Object.keys(this.props.reg_info).length) {
        this.setState({
          full_name: this.props.reg_info.full_name,
          password: this.props.reg_info.password,
          team_name: this.props.reg_info.team_name,
        });
      }
    }
    if (this.props.reg_errors) {
      if (!!Object.keys(this.props.reg_errors).length) {
        this.setState({
          checked: true
        });
      }
    }
  };

  render() {
    // Flip container to column on mobile screens.
    const panelDirection = this.props.width === 'xs' ? 'column' : 'row';
    const { full_name, password, team_name, checked, showPassword, errors, submit_flag } = this.state;

    const checkNoError = () => {
      const state_errors = this.state.errors;
      if (!state_errors.full_name && !state_errors.password && !state_errors.team_name && !state_errors.checked) {
        return true;
      }
      return false;
    }

    const checkValidate = () => {
      const errors = {
        full_name: '',
        password: '',
        team_name: '',
        checked: '',
      };
      if (isEmpty(this.state.full_name)) {
        errors.full_name = 'Please insert the value';
      }
      if (isEmpty(this.state.password)) {
        errors.password = 'Please insert the value';
      } else {
        const strength = pssswordStrength(this.state.password);
        if (strength === 'no_input') {
          errors.password = 'Please insert the value';
        } else if (strength === 'weak') {
          errors.password = 'Password needs to be longer than 8 letters';
        }
      }
      if (isEmpty(this.state.team_name)) {
        errors.team_name = 'Please insert the value';
      }
      if (!this.state.checked) {
        errors.checked = 'Please check the value';
      }
      this.setState({
        errors: errors
      });
    }

    const handleChange = prop => event => {
      if (prop === 'checked') {
        this.setState({
          checked: !checked
        });
      } else {
        this.setState({
          [prop]: event.target.value
        });
      }
      if (submit_flag) {
        setTimeout(()=> checkValidate(), 300);
      }
    }

    const handleClickShowPassword = () => {
      this.setState({
        showPassword: !showPassword
      });
    };
  
    const handleSubmit = (event) => {
      const data = {
        full_name: this.state.full_name,
        password: this.state.password,
        team_name: this.state.team_name,
      }
      this.setState({
        submit_flag: true
      });
      checkValidate();
      setTimeout(()=> {
        if (checkNoError()) {
          this.props.onClickNext(data);
        }
      }, 300);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    
    return (
      <Grid item sm={3} xs={12} className={scss['panel']}>
        <Grid direction={panelDirection} container spacing={0}>
          <Grid
            item
            sm={12}
            xs={12}
          >
            <Card className={scss['card']}>
              <CardContent>
                <Grid
                  container 
                  justify="center"
                  alignItems="center"
                  spacing={0}>
                  <Typography variant="h4" component="h4" gutterBottom className={scss['robot-bold-info']}>
                    Welcome to Kagoal
                  </Typography>
                  <Typography component="p" gutterBottom className={scss['robot-thin-sec-info']}>
                    Complete your account in three simple steps
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid item xs={12} className={scss['info-spacing']}>
                    <label className={scss['label-spacing']}>Full Name</label>
                    <TextField
                      fullWidth={true}
                      margin="dense"
                      value={full_name}
                      onChange={handleChange('full_name')}
                      className={((errors.full_name) ? scss['is-invalid'] + ' ' : '') + scss['card-element']}
                      variant="outlined"
                    />
                    {errors.full_name && <div className={scss['invalid-feedback']}>{errors.full_name}</div>}
                    <label className={scss['label-spacing']}>Password</label>
                    <TextField
                      fullWidth={true}
                      margin="dense"
                      variant="outlined"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
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
                      className={((errors.password) ? scss['is-invalid'] + ' ' : '') + scss['card-element']}
                    />
                    {errors.password && <div className={scss['invalid-feedback']}>{errors.password}</div>}
                    <label className={scss['label-spacing']}>Team</label>
                    <TextField
                      fullWidth={true}
                      margin="dense"
                      
                      value={team_name}
                      onChange={handleChange('team_name')}
                      className={((errors.team_name) ? scss['is-invalid'] + ' ' : '') + scss['card-element']}
                      variant="outlined"
                    />
                    {errors.team_name && <div className={scss['invalid-feedback']}>{errors.team_name}</div>}
                    <FormControlLabel
                      className={((errors.checked) ? scss['is-invalid'] + ' ' : '') + scss['inline-element']}
                      control={
                        <Checkbox
                          checked={checked}
                          value={checked}
                          onChange={handleChange('checked')}
                          color="primary"
                        />
                      }
                      label="I agree to the&nbsp;"
                    />
                    <Link href="/terms" className={scss['lnk']}>Terms of Use</Link>
                    <Typography variant="subtitle1" className={scss['lnk']}>&nbsp;and&nbsp;</Typography>
                    <Link href="/privacy" className={scss['lnk']}>Privacy Policy</Link>
                  </Grid>
                </Grid>
                <Grid
                  container 
                  justify="flex-end"
                  alignItems="flex-end">
                  <Button onClick={handleSubmit} variant="contained" size="medium" color="primary" className={scss['continue_btn']}>
                    Continue
                  </Button>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    )
  }
};

RegisterInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  onClickNext: PropTypes.func.isRequired,
  reg_info: PropTypes.object.isRequired,
  reg_errors: PropTypes.object.isRequired,
};

export default RegisterInfo;