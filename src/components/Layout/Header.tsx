import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';


export interface IProps {
    userInfo: any;
    classes: any;
  }
   interface IState {
    open: boolean
   }
class Header extends React.Component<IProps, IState> {
    public state = {
        open: true
    }

  public render() {
    const { classes, userInfo } = this.props;

    return (
        <Grid container={true} className={classes.header} direction="row"
            justify="space-between" alignItems="center"
        >
            <Grid item={true} >
                <Avatar className={classes.avatar}>H</Avatar>
                {userInfo.username}
                </Grid>
                <Grid item={true} className={classes.headerProfile}>
                <Avatar className={classes.avatar}>H</Avatar>
                {userInfo.username}
            </Grid>
        </Grid>
        
    );
  }
}

(Header as React.ComponentClass<IProps>).propTypes = {
    classes: PropTypes.object.isRequired,
  } as any;

export default Header;

                