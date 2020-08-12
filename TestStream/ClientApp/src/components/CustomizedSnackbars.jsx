import React, { Component } from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

 function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {/* <Icon className={clsx(classes.icon, classes.iconVariant)} /> */}
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
          {message}
        </span>
      }
      action={[
        <Icon className={clsx(classes.icon, classes.iconVariant)} />
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

// const useStyles2 = makeStyles(theme => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
// }));

export default class CustomizedSnackbars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  componentWillReceiveProps(props) {
      if(props.open!==this.state.open){
          this.setState({open:props.open});
      }
  }
  handleClick() {
    this.setState({ open: true })
  }
  handleClose() {
    this.setState({ open: false })
  }
  render() {
    const { message, action } = this.props
    return (
      <div>
        {action === 'add' || action === 'submit' ?
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          className="rtl"
          open={this.state.open}
          autoHideDuration={1000}
          onClose={this.handleClose.bind(this) && this.props.handleClose}
        >
            <MySnackbarContentWrapper
             className="rtl"
              onClose={this.handleClose.bind(this)  && this.props.handleClose}
              variant="success"
              message={message}
            />
              </Snackbar>
            : (
              null
            )}       
          {action === 'edit' ?
            <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={this.state.open}
            autoHideDuration={2000}
            onClose={this.handleClose.bind(this) && this.props.handleClose}
          >
        <MySnackbarContentWrapper
        onClose={this.handleClose.bind(this) && this.props.handleClose}
        variant="info"
        message={message}      
        />
         </Snackbar>
         :(
          null
        )}
        {action === "error" ?
            <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={this.state.open}
            autoHideDuration={2000}
            onClose={this.handleClose.bind(this) && this.props.handleClose}
          >
        <MySnackbarContentWrapper
        onClose={this.handleClose.bind(this) && this.props.handleClose}
        variant="error"
        message={message}      
        />
         </Snackbar>

         :(
          null
        )}            
        {action === "delete" ?
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={this.state.open}
            autoHideDuration={5000}
            onClose={this.handleClose.bind(this) }
          >
        <MySnackbarContentWrapper
        onClose={this.handleClose.bind(this) }
        variant="warning"
        message={message} 
        action={[
          <Button key="ok" color="secondary" size="small" onClick={this.props.handleRequest}>
            بله
        </Button> ,
        <Button key="close" color="secondary" size="small" onClick={this.handleClose.bind(this)}>
        خیر
    </Button>
        ]}     
        />
         </Snackbar>
         :(
          null
        )}        
      </div>   
    );
  }
}

CustomizedSnackbars.propTypes = {
  action: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose:PropTypes.func.isRequired,
  handleRequest: PropTypes.func,
  
};

