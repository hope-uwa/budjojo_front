import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const styles = createStyles({
    root: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        flexGrow: 1,
        backgroundColor: '#584e4c7d',
        zIndex: 30,
    },
    container: {
      minHeight: '100vh'
    },
    amountTitle: {
      fontSize: 30,
      color: '#444',
      fontWeight: 700,
      display: 'block',
      position: 'relative',
      marginTop: 35
    },
    amountContainer: {
        width: 480,
        height: 'auto',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: 10,
        textAlign: 'center',
        display: 'block',
        padding: '50 20',
    },
    formFields: {
        margin: '0 auto',
        marginTop: 20,
        marginBottom: 40,
        width: '90%',
        fontSize: 15 
      },
    card: {
        minWidth: 275,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      amountButton: {
        outline: 0,
        boxShadow: 'none',
        MozBoxShadow: 'none',
        fontSize: 15,
        fontWeight: 500,
        color: '#fff',
        marginTop: 23,
        marginBottom: 23,
        padding: '10 30',
        textTransform: 'uppercase',
        border: 'none',
        borderRadius: 3,
        height: 53,
        width: '100%',
        textAlign: 'center'

      },
      amountField: {
        outline: 0,
        boxShadow: 'none',
        fontSize: 16,
        color: '#666',
        margin: '10 0',
        width: '100%',
        textAlign: 'left',
        padding: '13 10 14 20',
        WebkitBorderRadius:5,
        MozBorderRadius:5,
        borderRadius: 5,
        border: 'solid 2 #ccc',
        backgroundColor: '#fff',
        transition: '.3s',
      }
})


export interface IProps extends WithStyles<typeof styles> {
  userInfo: object;
  addIncome: (data: object) => {};
}
 interface IState {
  income: number
 
 }
class Setup extends React.Component<IProps, IState> {

  public state = {
    income: 0
  };

  public labelRef: HTMLElement | null | undefined;

  public render(){
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <Grid item={true} xs={12} 
          className={classes.container}
          container={true}
          direction="row"
          justify="center"
          alignItems="center"
        >
            <Card className={classes.amountContainer}>
            <CardContent className="board-animation">
              <div className={classes.amountTitle}>
                What is your monthly income?
              </div>
              <div className={classes.formFields}>
                <form>
                  <TextField
                    id="outlined-bare"
                    className={classes.amountField}
                    margin="normal"
                    onChange={this.handleOnChange}
                    variant="outlined"
                    name="income"
                    placeholder="Enter amount here"
                  />
                  <Button variant="contained" 
                    // disabled={isInvalid}
                    color="primary" 
                    onClick={this.onSubmit}
                    className={classes.amountButton}>
                    CONTINUE
                  </Button>

                </form> 
              </div>          
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }  

  private onSubmit = async(event: any) => {
    event.preventDefault();
    const { addIncome } = this.props
    const { income } = this.state;
    const data = {
      income
    }
    await addIncome(data)
    
}
  private handleOnChange = (event : any) => {
    const income = event.target.value
    this.setState({income})
  } 


  }



(Setup as React.ComponentClass<IProps>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;



export default withStyles(styles)(Setup);