import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IAppState } from '../../redux/reducers';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Setup from '../Setup';
import { incomeRequest } from '../../redux/actions/IncomeAction';
import Header from '../Layout/Header';
import Budget from '../Budget'

const styles = createStyles({
    root: {
        flexGrow: 1,
    },
    container: {
      minHeight: '100vh'
    },
    leftSideBAr: {
        backgroundColor: 'white'
    },
    main: {
        backgroundColor: '#f5f5f5'
    },
    avatar: {
      margin: 10,
      border: '1.3px solid #eaebf1',
      backgroundColor: 'white',
      color: '#bdbdbd'
    },
    header: {
      paddingTop: '15px',
      paddingBottom: '15px',
      paddingLeft: '20px',
      paddingRight: '20px'
    },
    headerProfile: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      boxSizing: 'border-box',
      alignItems: 'center',
      color: '#bdbdbd'
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
    }
})


export interface IProps extends WithStyles<typeof styles> {
  userInfo: any;
  history: () => {};
  addIncome: () => {};
}
 interface IState {
  income: number;
  error: any;
 
 }
class Dashboard extends React.Component<IProps, IState> {

  public state = {
    income: 0,
    error: null,
    editIncome: false
    
  };

  public labelRef: HTMLElement | null | undefined;

  public render(){
    const { classes, userInfo, addIncome } = this.props;
    const { editIncome } = this.state;
    
    // const { user } = userInfo
    return (
      <div className={classes.root}>
        {
          (userInfo && !userInfo.income! || editIncome)  &&  <Setup  userInfo={userInfo} addIncome={addIncome} /> 
        }
          <Grid item={true} xs={12} 
            className={classes.container}
            container={true}
            direction="row"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item={true} className={classes.leftSideBAr} xs={12} sm={3}>
              sup
            </Grid>
            
            <Grid item={true} className={classes.main} xs={12} sm={9}>
              <Header classes={classes} userInfo={userInfo}/>
              <div>
              <Grid className={classes.mainBody} item={true} xs={12} md={12}>
                
                <Grid container={true} direction="row" justify="center" alignItems="center">
                  <Budget />
                </Grid>
              </Grid>
              </div>
            </Grid>
          </Grid>
      </div>
    );
  }  
}



(Dashboard as React.ComponentClass<IProps>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;


const mapStateToProps = (store: IAppState) => {
  return {
    userInfo: store.userState.user,
  };
};

const mapDispatchToProps = (dispatch : any) => ({
  addBudget: (income: object) => dispatch(incomeRequest(income))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));