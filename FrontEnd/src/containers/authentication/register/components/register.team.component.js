import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

import { FaRegQuestionCircle } from 'react-icons/fa';

import scss from '../register.module.scss';

class RegisterTeam extends React.Component {
  state = {
    email1: '',
    email2: '',
    email3: '',
    checked1: true,
    checked2: true,
    checked3: true,
    loading: false,
    reg_info: {},
  }

  render() {
    const panelDirection = this.props.width === 'xs' ? 'column' : 'row';
    const { email1, checked1, email2, checked2, email3, checked3, loading } = this.state;
    const { classes } = this.props;

    const handleChange = prop => event => {
      if (prop === 'checked1' || prop === 'checked2' || prop === 'checked3') {
        if (event.target.value === 'false') {
          this.setState({
            [prop]: true
          });
        } else {
          this.setState({
            [prop]: false
          });
        }
      } else {
        this.setState({
          [prop]: event.target.value
        });
      }
    };
  
    const handleSubmit = (event) => {
      this.setState({
        submit: true,
        loading: true,
      });
      const team_data = [
        {
          email: this.state.email1,
          admin: this.state.checked1
        },
        {
          email: this.state.email2,
          admin: this.state.checked2
        },
        {
          email: this.state.email3,
          admin: this.state.checked3
        },
      ];
      this.props.onClickNext(team_data);
    };

    const handleSkip = (event) => {
      this.setState({
        submit: true,
        loading: true,
      });
      this.props.onClickSkip();
    }

    return (
      <Grid item sm={4} xs={12} className={scss['panel']}>
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
                  <Typography variant="h4" component="h4" gutterBottom>
                    Who's on your team?
                  </Typography>
                  <Typography component="p" gutterBottom>
                    Invite teammates you'd like to explore the kogal app with
                  </Typography>
                </Grid>
                <Grid
                  container 
                  justify="center"
                  alignItems="center"
                  spacing={0}>
                  <Grid item xs={8}>
                    <TextField
                      label="Add mail"
                      fullWidth={true}
                      margin="normal"
                      name="email1"
                      value={email1}
                      onChange={handleChange('email1')}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      className={scss['inline-element']}
                      control={
                        <Checkbox
                          checked={checked1}
                          value={checked1}
                          onChange={handleChange('checked1')}
                          color="primary"
                        />
                      }
                      label="Make Admin"
                    />
                    <FaRegQuestionCircle></FaRegQuestionCircle>
                  </Grid>
                </Grid>
                <Grid
                  container 
                  justify="center"
                  alignItems="center"
                  spacing={0}>
                  <Grid item xs={8}>
                    <TextField
                      label="Add mail"
                      fullWidth={true}
                      margin="normal"
                      name="email2"
                      value={email2}
                      onChange={handleChange('email2')}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      className={scss['inline-element']}
                      control={
                        <Checkbox
                          checked={checked2}
                          value={checked2}
                          onChange={handleChange('checked2')}
                          color="primary"
                        />
                      }
                      label="Make Admin"
                    />
                    <FaRegQuestionCircle></FaRegQuestionCircle>
                  </Grid>
                </Grid>
                <Grid
                  container 
                  justify="center"
                  alignItems="center"
                  spacing={0}>
                  <Grid item xs={8}>
                    <TextField
                      label="Add mail"
                      fullWidth={true}
                      margin="normal"
                      name="email3"
                      value={email3}
                      onChange={handleChange('email3')}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      className={scss['inline-element']}
                      control={
                        <Checkbox
                          checked={checked3}
                          value={checked3}
                          onChange={handleChange('checked3')}
                          color="primary"
                        />
                      }
                      label="Make Admin"
                    />
                    <FaRegQuestionCircle></FaRegQuestionCircle>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  className={scss['mt_20']}
                  >
                  <Grid item xs={8}>                    
                    <Button onClick={handleSkip} color="primary" className={classes.button} disabled={loading}>
                      I'll do it later
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      onClick={handleSubmit} 
                      className={scss['next_container']}
                      disabled={loading}
                      variant="contained"
                      size="medium"
                      color="primary"
                      >
                      Send
                      {loading && <CircularProgress size={24} className={scss['process_btn']} />}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    )
  }
};

RegisterTeam.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onClickSkip: PropTypes.func.isRequired,
  reg_info: PropTypes.object.isRequired,
};

export default RegisterTeam;