import React, {useState} from 'react';
import {startLogin} from '../actions/loginAction';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import company from "../utils/company.jpg" 

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: '100vh',
      backgroundImage: `url(${company})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      margin: theme.spacing(16, 8),
    }
  })
);

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {errors: errors_res} = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    dispatch(startLogin({email, password}));
  }

  return (
    <div className={classes.root}>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Login App" />
          <CardContent>
            <div>
              <Typography color="error">
                  {errors_res.find((x) => x.name.localeCompare('emailPassword') === 0)?.message}
              </Typography>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardActions>
              <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  className={classes.loginBtn}
                  onClick={login}
              >
                  Login
              </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
}