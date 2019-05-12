import * as React from 'react';
import * as PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';



  
   interface IIState {
    entity: string,
    entityBudget: number | null,
   }
   export interface IProps { 
    userInfo: any;
    classes: any;
    handleEntries: (entries: IIState) => void
  }
   interface IState {
    entries: IIState
   }
   export interface NumberFormatCustomProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { value: string } }) => void;
  }
  
  function NumberFormatCustom(props: NumberFormatCustomProps) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        thousandSeparator={true}
        prefix="$"
      />
    );
  }
  
class AddBudget extends React.Component<IProps, IState> {
    public state = {
        entries: { entity: '',
        entityBudget: null}
    }
    

  public render() {
    const { classes } = this.props;

    return (
        <Grid container={true} direction="row" justify="space-between" alignItems="center">
          <TextField
            label="Budget"
            id="margin-dense"
            onChange={this.handleChange('entity')}
            className={classes.textField}
            margin="dense"
          />

          <TextField
            label="Budget"
            id="margin-dense"
            className={classes.textField}
            margin="dense"
          />

          <TextField
            className={classes.formControl}
            label="budget amount"
            onChange={this.handleChange('entityBudget')}
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
          />
          <Fab size="medium" onClick={this.addEntry}  aria-label="Add" className={classes.addMoreButton}>
            <AddIcon />
          </Fab>
        </Grid>
        
    );
  }

  private handleChange = (name: keyof IIState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { entries } = this.state;
    const newEntries : IIState = { ...entries }
    newEntries[name]= event.target.value
    this.setState({
      entries: newEntries,
    } as Pick<IState, keyof IState>);
  };

  private addEntry = (event: any) => {
    event.preventDefault()
    const { handleEntries } = this.props;
    const { entries } = this.state;
    handleEntries(entries)
  }
  
  
}

(AddBudget as React.ComponentClass<IProps>).propTypes = {
    classes: PropTypes.object.isRequired,
  } as any;

export default AddBudget;

                