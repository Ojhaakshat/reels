import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './signup.css'
import './Forgotpass.css'
import Lock from '../Assets/Lock.png'
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Divider } from '@mui/material';

export default function Signup() {
    // const store = useContext(AuthContext);
    // console.log(store);
    const useStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },
        text2: {
            color: 'black',
            textAlign: 'center'
        },
        text3: {
            color: 'black',
            textAlign: 'center',
            marginTop: '2vh'
        },
        card2:{
            height:'6vh',
            marginTop:'2%'
        }
    })
    const classes = useStyles();
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const {resetpassword} = useContext(AuthContext);

    const handleSubmit = async () => {
        
        try{
            setError('')
            setLoading(true)
            resetpassword(email)
            // .then(() => Alert.alert('','Your password reset mail has been sent'))
            // .catch(error => Alert.alert('Error', error.message));
            setLoading(false);
            navigate('/login');
            
        } catch(err) {
            setError(err);
            setTimeout(()=> {
                setError('')
            }, 2000)
        }
        setLoading(false);
    }
  return (
      <div className='signupwrapper'>
          <div className='signupcard'>
            <Card variant="outlined">
                <div className='instaLogo'>
                    <img src={Lock}/>
                </div>
                <CardContent>
                    <Typography variant="h5" className={classes.text2}>
                    Trouble with logging in?
                    </Typography>
                    <Typography variant="subtitle1" className={classes.text1}>
                    Enter your email address and we'll send you a link to get back into your account.
                    </Typography>
                    {error != '' && <Alert severity="error">{error}</Alert>}
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense'size='small' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    {/* <Button color='secondary' fullWidth={true} variant='outlined' margin='dense' startIcon={<CloudUploadIcon/>} component='label'>
                        Upload Profile Image</Button> */}
                </CardContent>
                <CardActions>
                    <Button color='primary' fullWidth={true} variant='contained' margin='dense' disabled={loading} onClick={handleSubmit}>Send Login Link</Button>
                </CardActions>
                <CardContent>
                    <div className=''>
                        {/* <Divider/> */}
                        <Typography className={classes.text1} variant="subtitle1" gutterBottom={true}>
                            OR
                        </Typography>
                        {/* <Divider flexItem={true}/> */}
                    </div>
                    <Typography  variant="subtitle1" className={classes.text3}>
                    <Link to='/signup' style={{textDecoration:'none'}} className={classes.text3}> Create New Account</Link>
                    </Typography>
                </CardContent>
            </Card>
            <Card variant='outlined' className={classes.card2}>
                <CardContent>
                        <Typography className={classes.text2} variant="subtitle1">
                        <Link to='/login' style={{textDecoration:'none'}} className={classes.text2}> Back to Login </Link>
                        </Typography>
                </CardContent>
            </Card>
          </div>
      </div>
    
  );
}
