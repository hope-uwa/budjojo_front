import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IAppState } from '../redux/reducers';
import { signupRequest, loginRequest } from '../redux/actions/UserAction';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { homeStyle as styles } from './styles';
import SignUp from './SignUp';

export interface IProps extends WithStyles<typeof styles> {
  signupUser: any;
  loginUser: () => {};
  userInfo: object;
  history: () => {};
}
 interface IState {
  email: string;
  error: any;
  password: string;
  username: string;
  displayText: object;
 
 }
class Home extends React.Component<IProps, IState> {

  public state = {
    username: '',
    email: '',
    password: '',
    error: null,
    displayText: {
      title: 'Create your account',
      buttonText:'Create your account',
      display: '',
      bottomText: 'Already have an account?',
      login: false
    }
  };

  public labelRef: HTMLElement | null | undefined;

  public toggleSignUpAndLogin = (login: boolean) => {
    login ? this.setState({
      displayText: {
        title: 'Login',
        buttonText:'Login',
        display: 'none',
        bottomText: 'Don’t have an account?',
        login: true
      }}) : 
      this.setState({
        displayText: {
          title: 'Create your account',
          buttonText:'Create your account',
          display: '',
          bottomText: 'Already have an account?',
          login: false
        }});
  }
  public render(){
    const { classes } = this.props;
    const { signupUser, loginUser, userInfo, history } = this.props
    // const isInvalid =
    //   password === '' ||
    //   email === '' ||
    //   username === '';
    return (
      <div className={classes.root}>
        <Grid item={true} xs={12} 
          className={classes.container}
          container={true}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <SignUp signupUser={signupUser} userInfo={userInfo} history={history} loginUser={loginUser} />
        </Grid>
      </div>
    );
  }  
}

(Home as React.ComponentClass<IProps>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

const mapStateToProps = (store: IAppState) => {
  return {
    userInfo: store.userState,
  };
};

const mapDispatchToProps = (dispatch : any) => ({
  signupUser: (user: object) => dispatch(signupRequest(user)),
  loginUser: (user: object) => dispatch(loginRequest(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));