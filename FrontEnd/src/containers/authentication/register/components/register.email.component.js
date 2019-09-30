import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { spacing } from '@material-ui/system';

import isEmpty from '../../../../validation/is-empty';
import isEmail from '../../../../validation/is-email';

import scss from '../register.module.scss';

class RegisterEmail extends React.Component {
  state = {
    email: '',
    errors: {
      email: ''
    },
    submit_flag: false,
    reg_info: {},
    reg_errors: {}
  }

  UNSAFE_componentWillMount = () => {
    let email_info = '';
    let email_error = '';
    let submit_flag = false;
    if (this.props.reg_info) {
      if (!!Object.keys(this.props.reg_info).length) {
        email_info = this.props.reg_info.email;
      }
    }
    if (this.props.reg_errors) {
      if (!!Object.keys(this.props.reg_errors).length) {
        email_error = this.props.reg_errors.email;
        submit_flag = true;
      }
    }
    this.setState({
      email: email_info,
      errors: { email: email_error },
      submit_flag: submit_flag
    });
  };

  render() {
    const panelDirection = this.props.width === 'xs' ? 'column' : 'row';
    const { email, errors, submit_flag } = this.state;
    const { classes } = this.props;

    const checkValidate = () => {
      const check_errors = {
        email: ''
      };
      if (isEmpty(this.state.email)) {
        check_errors.email = 'Please insert the value';
      } else {
        if (!isEmail(this.state.email)) {
          check_errors.email = 'Please insert the valid email';
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

    const handleChange = prop => event => {
      const data = event.target.value;
      this.setState({
        [prop]: data
      });
      if (submit_flag) {
        setTimeout(()=>checkValidate(), 300);
      }
    };
  
    const handleSubmit = (event) => {
      this.setState({
        submit_flag: true
      });
      if (checkValidate()) {
        this.props.onClickNext(this.state.email);
      }
    };

    return (
      <Grid item sm={3} xs={12} className={scss['panel']}>
        <Grid container spacing={0}>
          <Grid
            item
            sm={12}
            xs={12}
          >
            <Card className={scss['card']} justify="center"
                  alignitems="center" sm={9} xs={9}>
              <CardContent className={scss['card-content']} justify="center"
                  alignitems="center">
                <Grid
                  container 
                  justify="center"
                  alignitems="center"                  
                  spacing={0}>
                  <Typography variant="h4" gutterBottom className={scss['robot-thin']}>
                    <span className={scss['robot-bold-label']}>New</span> Account
                  </Typography>
                  <Typography gutterBottom className={scss['robot-thin-secondary']}>
                    Sign up with your work email address
                  </Typography>
                </Grid>
                <Grid container justify="center" alignitems="center">
                  <Grid item sm={9} xs={9}>
                    <TextField
                      fullWidth={true}
                      margin="dense"
                      name="email"
                      value={email}
                      onChange={handleChange('email')}
                      className={((errors.email) ? scss['is-invalid'] : '')}
                      variant="outlined"
                    />
                    {errors.email && <div className={scss['invalid-feedback']}>{errors.email}</div>}
                  </Grid>
                </Grid>
                <Grid
                  container
                  justify="center"
                  alignitems="center">
                  <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    size="large"
                    className={scss['submit_btn']}>Sign Up</Button>
                </Grid>
              </CardContent>
              <CardActions className={scss['card-actions']} justify="center"
                  alignitems="center">
                <Grid 
                  container
                  container justify="center"
                  alignitems="center"
                  >
                  <Typography variant="subtitle1">If you already Signed Up</Typography>
                  <Link href="/login" className={classes.link, scss['lnk']}>
                  &nbsp;&nbsp;Log-in Here
                  </Link>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    )
  }
};

RegisterEmail.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  onClickNext: PropTypes.func.isRequired,
  reg_info: PropTypes.object.isRequired,
  reg_errors: PropTypes.object.isRequired,
};

export default RegisterEmail;