import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';

import scss from '../register.module.scss';

const getQuestions = () => {
  return {
    usage: [
      { id: 1, name: 'Work' },
      { id: 2, name: 'Personal' },
      { id: 3, name: 'School' },
    ],
    describe: [
      { id: 1, name: 'I\'m a bussiness owner' },
      { id: 2, name: 'I\'m a team leader' },
      { id: 3, name: 'I\'m a team leader' },
      { id: 4, name: 'I\'m a team member' },
      { id: 5, name: 'I\'m a freelancer' },
      { id: 6, name: 'I\'m a director' },
    ],
    collaborate: [
      { id: 1, name: 'Only me' },
      { id: 2, name: '2-5' },
      { id: 3, name: '6-10' },
      { id: 4, name: '11-15' },
      { id: 5, name: '16-25' },
      { id: 6, name: '26-50' },
      { id: 7, name: '51-100' },
      { id: 8, name: '101-500' },
      { id: 9, name: '500+' },
    ],
    manage: [
      { id: 1, name: 'Projects for clients' },
      { id: 2, name: 'Internal projects' },
      { id: 3, name: 'To-do\'s & lists' },
      { id: 4, name: 'Sales & CRM' },
      { id: 5, name: 'Marketing & creative' },
      { id: 6, name: 'Product and R&D' },
      { id: 7, name: 'Orders & production' },
      { id: 8, name: 'HR & recuriting' },
      { id: 9, name: 'Other (please specify)' },
    ],
    team: [
      { id: 1, name: 'Administrative' },
      { id: 2, name: 'Accounting' },
      { id: 3, name: 'Architecture' },
      { id: 4, name: 'BI' },
      { id: 5, name: 'Bussiness Development' },
      { id: 6, name: 'Bussiness owner' },
      { id: 7, name: 'Consulting' },
      { id: 8, name: 'Construction' },
      { id: 9, name: 'Creative' },
      { id: 10, name: 'Customer Support' },
      { id: 11, name: 'Creative' },
      { id: 12, name: 'Data' },
      { id: 13, name: 'Design' },
      { id: 14, name: 'Education' },
      { id: 15, name: 'Events' },
      { id: 16, name: 'Finance' },
      { id: 17, name: 'Healthcare' },
      { id: 18, name: 'HR' },
      { id: 19, name: 'IT' },
      { id: 20, name: 'Manufacturing' },
      { id: 21, name: 'Marketing' },
      { id: 22, name: 'Operations' },
      { id: 23, name: 'Product Management' },
      { id: 24, name: 'Project Management' },
      { id: 25, name: 'Real Estate' },
      { id: 26, name: 'Research' },
      { id: 27, name: 'Sales' },
      { id: 28, name: 'Software Engineering' },
      { id: 29, name: 'Software Development' },
      { id: 30, name: 'Venture Capital' },
      { id: 31, name: 'Other' },
    ],
  };
}

class RegisterQuestion extends React.Component {
  state = {
    data: {
      usage: '',
      describe: '',
      collaborate: '',
      manage: '',
      team: ''
    },
    flag: {
      submit: true,
      loading: false,
    },
    css: {
      usage: scss['form_visible'],
      describe: scss['form_invisible'],
      collaborate: scss['form_invisible'],
      manage: scss['form_invisible'],
      team: scss['form_invisible'],
      process: scss['process_btn'],
      submit: scss['continue_btn'],
    },
    reg_info: {},
    reg_errors: {}
  }
  
  UNSAFE_componentWillMount = () => {
    if (this.props.reg_info) {
      if (!!Object.keys(this.props.reg_info).length) {
        this.setState({
          data: {
            usage: this.props.reg_info.usage,
            describe: this.props.reg_info.describe,
            collaborate: this.props.reg_info.collaborate,
            manage: this.props.reg_info.manage,
            team: this.props.reg_info.team,
          }
        });
        let css = this.state.css;
        if (this.props.reg_info.usage) {
          css.describe = scss['form_visible'];
        }
        if (this.props.reg_info.describe) {
          css.collaborate = scss['form_visible'];
        }
        if (this.props.reg_info.collaborate) {
          css.manage = scss['form_visible'];
        }
        if (this.props.reg_info.manage) {
          css.team = scss['form_visible'];
        }
        this.setState({
          css: css
        });
      }
    }
  };

  render() {
    // Flip container to column on mobile screens.
    const panelDirection = this.props.width === 'xs' ? 'column' : 'row';
    const { data, flag, css } = this.state;
    const classes = this.props.classes;

    const questions = getQuestions();

    const handleChange = prop => event => {
      data[prop] = event.target.value;
      this.setState({
        data: data
      });
      if (prop === 'usage') {
        css.describe = scss['form_visible'];
      } else if (prop === 'describe') {
        css.collaborate = scss['form_visible'];
      } else if (prop === 'collaborate') {
        css.manage = scss['form_visible'];
      } else if (prop === 'manage') {
        css.team = scss['form_visible'];
      } else if (prop === 'team') {
      }
      this.setState({
        css: css
      });
    }

    const handleSubmit = (event) => {
      flag.loading = true;
      flag.submit = false;
      this.setState({
        flag: flag
      });
      this.props.onClickNext(this.state.data);
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
                  <Typography variant="h4" component="h4" gutterBottom>
                    You're almost there
                  </Typography>
                  <Typography component="p" gutterBottom>
                    Tell us a bit about yourself so we can customize the kagoal for your needs
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid item xs={12} className={css.usage}>
                    <Typography component="p">
                      What will you be using kagoal for?
                    </Typography>
                    <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                      <Select
                        native
                        value={data.usage}
                        onChange={handleChange('usage')}
                        input={
                          <OutlinedInput name="usage"/>
                        }
                      >
                        <option value="" disabled>Select One</option>
                        {questions.usage.map(function(item, index) {
                          return <option value={item.id} key={index}>{item.name}</option>
                        })};
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className={css.describe}>
                    <Typography component="p">
                      Which of the following describes you best?
                    </Typography>
                    <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                      <Select
                        native
                        value={data.describe}
                        onChange={handleChange('describe')}
                        input={
                          <OutlinedInput name="describe"/>
                        }
                      >
                        <option value="" disabled>Select One</option>
                        {questions.describe.map(function(item, index) {
                          return <option value={item.id} key={index}>{item.name}</option>
                        })};
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className={css.collaborate}>
                    <Typography component="p">
                      How many people do you want to collaborate with?
                    </Typography>
                    <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                      <Select
                        native
                        value={data.collaborate}
                        onChange={handleChange('collaborate')}
                        input={
                          <OutlinedInput name="collaborate" className={classes.formControl}/>
                        }
                      >
                        <option value="" disabled>Select One</option>
                        {questions.collaborate.map(function(item, index) {
                          return <option value={item.id} key={index}>{item.name}</option>
                        })};
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className={css.manage}>
                    <Typography component="p">
                      What is the main thing do you want to manage?
                    </Typography>
                    <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                      <Select
                        native
                        value={data.manage}
                        onChange={handleChange('manage')}
                        input={
                          <OutlinedInput name="manage" className={classes.formControl}/>
                        }
                      >
                        <option value="" disabled>Select One</option>
                        {questions.manage.map(function(item, index) {
                          return <option value={item.id} key={index}>{item.name}</option>
                        })};
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className={css.team}>
                    <Typography component="p">
                      What does your team do?
                    </Typography>
                    <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                      <Select
                        native
                        value={data.team}
                        onChange={handleChange('team')}
                        input={
                          <OutlinedInput name="team" className={classes.formControl}/>
                        }
                      >
                        <option value="" disabled>Select One</option>
                        {questions.team.map(function(item, index) {
                          return <option value={item.id} key={index}>{item.name}</option>
                        })};
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justify="flex-end"
                  alignItems="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    className={css.submit}
                    disabled={!flag.submit}
                    onClick={handleSubmit}
                  >
                    Continue
                    {flag.loading && <CircularProgress size={24} className={css.process} />}
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

RegisterQuestion.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  onClickNext: PropTypes.func.isRequired,
  reg_info: PropTypes.object.isRequired,
  reg_errors: PropTypes.object.isRequired,
};

export default RegisterQuestion;