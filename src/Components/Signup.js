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
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { database, storage } from '../firebase';

export default function Signup() {
    // const store = useContext(AuthContext);
    // console.log(store);
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
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [file, setFile] = React.useState(null);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const {signup} = useContext(AuthContext);

    const handleSubmit = async () => {
        if(file == null) {
            setError('Please upload profile image first');
            setTimeout(()=> {
                setError('')
            }, 2000)
            return;
        }
        try{
            setError('')
            setLoading(true)
            let userObj = await signup(email, password);
            let uid = userObj.user.uid;
            // console.log(uid);
            const uploadTask = storage.ref(`/users/${uid}/profileimage`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3);
            
            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(`Upload is ${progress} done`)
            }

            function fn2(err) {
                setError(err);
                setTimeout(()=> {
                    setError('')
                }, 2000)
                setLoading(false);
                return;
            }

            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url);
                    database.users.doc(uid).set({
                        email:email,
                        name: name,
                        url: url,
                        userId: uid,
                        createdAt: database.getTimeStamp()
                
                    })
                })
                setLoading(false);
                navigate('/')

            }
        } catch(err) {
            setError(err);
            setTimeout(()=> {
                setError('')
            }, 2000)
        }
    }
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
                    {error != '' && <Alert severity="error">{error}</Alert>}
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense'size='small' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense'size='small' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin='dense'size='small' value={name} onChange={(e)=>setName(e.target.value)}/>
                    <Button color='secondary' fullWidth={true} variant='outlined' margin='dense' startIcon={<CloudUploadIcon/>} component='label'>
                        <input type='file' accept='image/'hidden onChange={(e) => setFile(e.target.files[0])}/>
                        Upload Profile Image</Button>
                </CardContent>
                <CardActions>
                    <Button color='primary' fullWidth={true} variant='contained' margin='dense' disabled={loading} onClick={handleSubmit}>Sign up</Button>
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
