import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';



   export interface IProps { 
    classes: any
    value: any
  }
const ListBudget: React.SFC<IProps> = (props) =>{

    const { classes, value: { entity, entityBudget }} = props;
    return (
      <ListItem className={classes.budgetList}>
            <ListItemAvatar>
            <Avatar className={classes.budgetAvatar}>
                <FolderIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText
            // primary="Single-line item"
            secondary={true ? entity : null}
            />
            <ListItemText
            // primary="Single-line item"
            secondary={true ? entityBudget : null}
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
        </ListItem>
    )
   

}
ListBudget.defaultProps = {
  classes: {},
  value: {},
}

export default ListBudget;

                