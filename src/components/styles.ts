import { createStyles } from '@material-ui/core/styles';

export const homeStyle = createStyles({
    root: {
        flexGrow: 1,
        backgroundImage: "url('https://blogin.co/images/bg_login.png.pagespeed.ce.M3_OMdFKph.png')"
    },
    container: {
      minHeight: '100vh'
    },
    signupContainer:{
      width: 480,
      height: 'auto',
      margin: '0 auto',
      backgroundColor: '#fff',
      borderRadius: 10,
      textAlign: 'center',
      display: 'block',
      padding: '50 20',
      boxShadow: '0 0 10px 0 rgba(0,0,0,.75)',
      ':hover':{
        boxShadow:'none'
      },
      WebkitBoxShadow: '0 0 10px 0 rgba(0,0,0,.75)',
      MozBoxShadow: '0 0 10px 0 rgba(0,0,0,.75)'
    
    },
    
    logoContainer: {
      minHeight: 90,
      marginBottom: 20
    },
    card: {
      minWidth: 275,
      
    },
    title: {
      fontSize: 35,
      color: '#444',
      fontWeight: 700,
      display: 'block',
      position: 'relative'
    },
    pos: {
      marginBottom: 12,
    },
    formFields: {
      margin: '0 auto',
      marginTop: 40,
      marginBottom: 40,
      width: '90%',
      fontSize: 15 
    },
    textField: {
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
    
    },
    signupButton: {
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
    toogleLink: {
        paddingLeft: 10,
        cursor: 'pointer',
        fontWeight: 'lighter',
        color: 'red'
    }
  });