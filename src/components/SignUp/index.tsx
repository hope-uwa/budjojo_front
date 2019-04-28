import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { homeStyle as styles } from '../styles';
import './animation.scss';

export interface IProps extends WithStyles<typeof styles> {
  signupUser: any;
  loginUser: (data: object) => {};
  userInfo: any;
  history: any;
}
 interface IState {
  email: string;
  error: any;
  password: string;
  username: string;
  displayText: object;
 
 }
class SignUp extends React.Component<IProps, IState> {

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }
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
    const { displayText, username, email, password } = this.state;
    // const isInvalid =
    //   password === '' ||
    //   email === '' ||
    //   username === '';
    return (
          <Card className={classes.signupContainer}>
            <CardContent className="board-animation">
              <div className={classes.logoContainer}>
                Budjojo
              </div>
              <div className={classes.title}>
                {displayText.title}
              </div>
              <div className={classes.formFields}>
                <form>
                  <TextField
                    id="outlined-name"
                    label="Name"
                    style={{display: displayText.display}}
                    className={classes.textField}
                    name="username"
                    value={username}
                    onChange={event => this.setStateWithEvent(event, 'username')}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-email-input"
                    label="Email"
                    className={classes.textField}
                    type="email"
                    name="email"
                    value={email}
                    onChange={event => this.setStateWithEvent(event, 'email')}
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    name="password"
                    value={password}
                    onChange={event => this.setStateWithEvent(event, "password")}
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                  />
                  <Button variant="contained" 
                    // disabled={isInvalid}
                    color="primary" 
                    onClick={e => this.onSubmit(e)}
                    className={classes.signupButton}>
                    {displayText.buttonText}
                  </Button>

                </form>
                <Typography variant="caption" gutterBottom={true}>
                  {displayText.bottomText} 
                  <span className={classes.toogleLink} onClick={()=>this.toggleSignUpAndLogin(!displayText.login)}> 
                    {!displayText.login ? 'Log in': 'Sign up' }
                  </span>
                </Typography>  
              </div>          
            </CardContent>
          </Card>

    );
  }  

  private checkSuccess = () =>{
    const { userInfo: { user, error}, history } = this.props
      if(error === null){
        console.log(user)
        history.push(`/user/${user.username}`)
      }

  }
  private onSubmit = async(event: any) => {
    event.preventDefault();
    const { username, email, password, displayText: { login } } = this.state;
    const { signupUser, loginUser} = this.props;
    if (!login) {
      await signupUser({username, email, password});
      this.checkSuccess()
    }
    else{
      await loginUser({email, password});
      this.checkSuccess()
        
      
    }
  }
  private setStateWithEvent(event: any, columnType: string) {
    this.setState(SignUp.propKey(columnType, (event.target as any).value));
  }
}



(SignUp as React.ComponentClass<IProps>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;




export default withStyles(styles)(SignUp);