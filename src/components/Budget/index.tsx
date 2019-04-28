import * as React from 'react';
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
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBudgetForm from './Input/AddBudget';

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
    }
})


export interface IProps extends WithStyles<typeof styles> {
  userInfo: any;
}
 interface IState {
  error: any;
 
 }

 function generate(element: any) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
class Budget extends React.Component<IProps, IState> {

  public state = {
    error: null,
    
  };

  public labelRef: HTMLElement | null | undefined;

  public render(){
    const { classes, userInfo } = this.props;
    
    // const { user } = userInfo
    console.log('==>', userInfo)
    return ( 
            <div className={classes.root}>
                 <Grid container={true} direction="row" justify="center" alignItems="center">
                <Grid item={true} xs={12} md={7}>
                  <h1>Creating Jan 2019 Bugdet </h1>
                  <List className={classes.listBody} dense={true}>
                    {generate(
                      <ListItem className={classes.budgetList}>
                        <ListItemAvatar>
                          <Avatar className={classes.budgetAvatar}>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          // primary="Single-line item"
                          secondary={true ? 'Secondary text' : null}
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
                      </ListItem>,
                    )} 
                    {/* <Fab size="small" color="primary" aria-label="Add">
                        <AddIcon />
                    </Fab> */}
                  </List>
                   <AddBudgetForm userInfo={userInfo} classes={classes}/>
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
    userInfo: store.userState,
  };
};

const mapDispatchToProps = (dispatch : any) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Budget));