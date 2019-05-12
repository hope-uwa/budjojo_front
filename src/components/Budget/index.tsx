import * as React from 'react';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IAppState } from '../../redux/reducers';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBudgetForm from './Input/AddBudget';
import Button from '@material-ui/core/Button';
import { addBudgetRequest } from '../../redux/actions/BudgetAction'
import ListBudget from './List/ListBudget'
import BudgetProgressbar from './Loader';
import 'react-circular-progressbar/dist/styles.css';

const styles = createStyles({
    root: {
        flexGrow: 1,
        minHeight: '100vh'
    },
    container: {
      minHeight: '100vh'
    },
    main: {
        backgroundColor: '#f5f5f5'
    },
    listTitle: {

    },
    listBody: {
      width: '100%'
    },
    mainBody: {
    
    },
    budgetAvatar: {
     width: 25,
     height: 25
    },
    budgetList: {
      borderBottom: '1px solid #7070702b'
    },
    addMoreButton: {
        width: '35px',
        height: '35px'
    },
    budgetSubmitBtn: {

    }
})


export interface IProps extends WithStyles<typeof styles> {
  userInfo: any;
  addBudget: (data: object) => void
}
interface Submission {
entity : string,
entityBudget: number
} 
 interface IState {
  error: any;
  budgetSubmissions : Submission[],
  totalBudget: number,
  budgetPercent: number
 
 }

 
class Budget extends React.Component<IProps, IState> {

  public state = {
    error: null,
    budgetSubmissions: [],
    totalBudget: 0,
    budgetPercent: 0
  };

  public labelRef: HTMLElement | null | undefined;

  public handleEntries = async(entries : Submission) => {
      const { budgetSubmissions } = this.state;
      const { } = this.props
      const newSubmission: Submission[] = [entries, ...budgetSubmissions]
      const checkBudget: any = await this.calculateBudget(newSubmission);
      if(checkBudget.action){
        this.setState({
            budgetSubmissions: newSubmission,
            totalBudget: checkBudget.total,
            budgetPercent : checkBudget.budgetedPercent,
        })
      }
      else{
        this.setState({
            totalBudget: checkBudget.total
        })
      }   
  }

  public submitEntries = () => {
    const { budgetSubmissions } = this.state;
    const { addBudget } = this.props
    const data = { budget: budgetSubmissions, month: 1, year: 19 }
    addBudget(data)
  }

  public calculateBudget =(budgetSubmissions: Submission[]): object => {
      const { userInfo: { income } } = this.props
      let total = 0;
      budgetSubmissions.map((value: Submission) => {
        total = total + parseInt(`${value.entityBudget}`, 10);
      })
      const budgetedPercent = this.percentage(income, total)
      if(total > income) {
          return { action : false, total, budgetedPercent}
      } 
      return { action : true, total, budgetedPercent}
      
  }
  public percentage = (income: number, budget: number): number => {
    const percent = Math.round((budget / income) * 100);
    console.log({income}, {budget}, {percent})
    return (percent < 100) ? percent : (100 - percent);
  }

  public render(){
    const { classes, userInfo } = this.props;
    const { budgetSubmissions, totalBudget, budgetPercent } = this.state;
    
    // const { user } = userInfo
    console.log('==>', budgetSubmissions)
    return ( 
            <div className={classes.root}>
                <Grid container={true} direction="row" justify="center" alignItems="center">
                    <Grid item={true}  xs={12} md={9}>
                        <Grid container={true} direction="row" justify="center" alignItems="center">
                            <Grid item={true}  xs={12} md={9}>
                                <h1>Creating Jan 2019 Bugdet </h1>
                                <List className={classes.listBody} dense={true}>
                                    {
                                        budgetSubmissions.map((value : any, index) => {
                                            return (
                                                <ListBudget key={index} classes={classes} value={value} />
                                            )
                                        })
                                    }
                                    { totalBudget > 0 &&
                                        <ListItem className={classes.budgetList}>
                                            <ListItemAvatar>
                                            <Avatar className={classes.budgetAvatar}>
                                                <FolderIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                            // primary="Total Budget"
                                        
                                            />
                                            <ListItemText
                                            primary={`Total budget: ${totalBudget}`}
                                            // secondary={totalBudget}
                                            />
                                            <ListItemSecondaryAction>
                                            <IconButton aria-label="Delete">
                                                <DeleteIcon />
                                            </IconButton>
                                            <Checkbox
                                                // onChange={this.handleToggle(value)}
                                                // checked={this.state.checked.indexOf(value) !== -1}
                                            />
                                            </ListItemSecondaryAction>
                                        </ListItem>}
                                </List>
                                
                                <AddBudgetForm userInfo={userInfo} classes={classes} 
                                handleEntries={this.handleEntries}
                                />
                                
                                    <Button className={classes.budgetSubmitBtn} variant="contained" 
                                        // disabled={isInvalid}
                                        color="primary" onClick={this.submitEntries}
                                    >
                                        SAVE
                                    </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item={true} xs={12} md={3}>
                        <Grid container={true} direction="row" justify="center" alignItems="center">
                            <BudgetProgressbar percentage={budgetPercent} strokeWidth={10} sqSize={169} />
                            <h1>Total Budget {totalBudget}</h1>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
               

    );
  }  
}



(Budget as React.ComponentClass<IProps>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;


const mapStateToProps = (store: IAppState) => {
  return {
    userInfo: store.userState.user,
  };
};

const mapDispatchToProps = (dispatch : any) => ({
   addBudget: ( budget: object ) => dispatch(addBudgetRequest(budget))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Budget));