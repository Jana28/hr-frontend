import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import BusinessIcon from '@material-ui/icons/Business';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DescriptionIcon from '@material-ui/icons/Description';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../actions/logoutAction';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      backgroundColor: "#6199d3",
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      backgroundColor:"#b3c2d1",
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `black`
    },
  }),
);

export default function MiniDrawer({children}) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const {isAuthenticated, user} = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);

  console.log("userType", user.userType);

  const adminNavLinks = [
    { title: `admins`, path: `/manage-admins`, Icon: <SupervisorAccountIcon/> },
    { title: `employees`, path: `/manage-employees`, Icon: <PeopleOutlineIcon/> },
    { title: `departments`, path: `/manage-departments`, Icon: <BusinessIcon/> },
    { title: `jobs`, path: `/manage-jobs`, Icon: <WorkIcon/> },
    { title: `holidays`, path: `/manage-holidays`, Icon: <FlightTakeoffIcon/> },
    { title: `leave reasons`, path: `/manage-leavereasons`, Icon: <DescriptionIcon/> },
    { title: `work reasons`, path: `/manage-workreasons`, Icon: <DescriptionIcon/> },
    { title: `leaves`, path: `/manage-leaves`, Icon: <HomeIcon/> },
    { title: `holidays work`, path: `/manage-holidays-work`, Icon: <ScheduleIcon/> }
  ];
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{paddingLeft: '40vw'}}>
            WAYVZ
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {user.userType === "ADMIN" && isAuthenticated &&
            adminNavLinks.map(({ title, path, Icon }) => (
              <Link to={path} className={classes.linkText} key={title}>
                <ListItem title={title} button selected={path.localeCompare(history.location.pathname) === 0}>
                  <ListItemIcon>{Icon}</ListItemIcon>
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
          ))}
        </List>
        <Divider />
        <List>
          {isAuthenticated ? (
            <>    
              <Link to={"/"} className={classes.linkText}>
                <ListItem title="Home" button selected={"/".localeCompare(history.location.pathname) === 0}>
                  <ListItemIcon>Home</ListItemIcon>
                  <ListItemText primary={"home"} />
                </ListItem>
              </Link>            
              <Link to={"/profile"} className={classes.linkText}>
                <ListItem title="Profile" button selected={"/profile".localeCompare(history.location.pathname) === 0}>
                  <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                  <ListItemText primary={"my profile"} />
                </ListItem>
              </Link>
              
              <ListItem title="Logout" button>
                <ListItemIcon><ExitToAppIcon onClick={() => {dispatch(startLogout())}} /></ListItemIcon>
                <ListItemText primary="logout" />
              </ListItem>
            </>
          ) : (
            <>
              {history.location.pathname !== '/login' &&
                (
                  <Link to={"/login"} className={classes.linkText}>
                    <ListItem title="login" button>
                        <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                        <ListItemText primary="login" />
                    </ListItem>
                  </Link>
                )
              }
            </>
            ) 
          }
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            {children}
      </main>
    </div>
  );
}
