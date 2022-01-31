import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './signup.css'
import insta from '../Assets/Instagram.jpeg'
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link } from 'react-router-dom';

export default function Login() {
    const useStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },
        card2:{
            height:'6vh',
            marginTop:'2%'
        }
    })
    const classes = useStyles();
  return (
      <div className='signupwrapper'>
          <div className='signupcard'>
            <Card variant="outlined">
                <div className='instaLogo'>
                    <img src={insta}/>
                </div>
                <CardContent>
                    <Typography variant="subtitle1" className={classes.text1}>
                    Signup to see photos and videos from your friends
                    </Typography>
                    <Alert severity="error">This is an error alert — check it out!</Alert>
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense'size='small'/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense'size='small'/>
                    <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin='dense'size='small'/>
                    <Button color='secondary' fullWidth={true} variant='outlined' margin='dense' startIcon={<CloudUploadIcon/>} component='label'>
                        <input type='file' accept='image/'hidden/>
                        Upload Profile Image</Button>
                </CardContent>
                <CardActions>
                    <Button color='primary' fullWidth={true} variant='contained' margin='dense'>Sign up</Button>
                </CardActions>
                <CardContent>
                    <Typography className={classes.text1} variant="subtitle1">
                        By signing up, you agree to our Terms, Conditions and Cookies policy.
                    </Typography>
                </CardContent>
            </Card>
            <Card variant='outlined' className={classes.card2}>
                <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            Having an account ? <Link to='/login' style={{textDecoration:'none'}}>Login</Link>
                        </Typography>
                </CardContent>
            </Card>
          </div>
      </div>
    
  );
}
