import React, {useEffect, useState} from 'react';
import { Divider, Grid } from '@material-ui/core';
import Page from '../../components/Page';
import {setUpdateProfileError, startUpdateEmployeeProfile} from '../../actions/loginAction';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import UpdateEmployeeProfileForm from './UpdateEmployeeProfileForm';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { getEmployee } from '../../actions/employeesAction';
import { LeavesCalender } from '../../components/LeavesCalender';
import { EmployeeHolidaysCalender } from '../../components/EmployeeHolidaysCalender';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }),
);

const EmployeeProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {isLoading, user} = useSelector((state) => state.auth);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const initialState = {
    id: user.id,
    firstName: "",
    lastName: "",
    image: null,
    phoneNumber: "",
  };
  
  const [state, setState] = useState(initialState);

  const { register, handleSubmit, errors } = useForm();

  async function initEmployee() {
    getEmployee(user.id)
      .then((employeeRes) => {
        setState({ 
          ...state, 
          firstName : employeeRes.firstName,
          lastName : employeeRes.lastName,
          phoneNumber : employeeRes.phoneNumber
        });
      });
  }
  useEffect(() => {
    initEmployee();
  }, [isLoading]);

  const handleFormClose = () => {
    //empty errors
    dispatch(setUpdateProfileError([]));
  };

  const saveClickHandler = async () => {
    console.log("statestarte", state)
    const payload = {
        id: state.id,
        firstName: state.firstName,
        lastName: state.lastName,
        image: state.image,
        phoneNumber: state.phoneNumber,
    };
    handleFormClose();
    dispatch(startUpdateEmployeeProfile({employeeProfile: payload}));
    
  };



  return (
    <Page>
      <div style={{ marginTop: 20, padding: 30, marginLeft: 500 }}>
        <Card className={classes.root}>
          <CardHeader
              title={`${user.firstName} ${user.lastName}`}
              subheader={`${user.email}`}
          />
          <CardMedia
              className={classes.media}
              image={`${process.env.REACT_APP_BACKEND_BASEURL}images/${user.imageName}`}
              title={`${user.firstName}`}
          />
          {user.userType.localeCompare("EMPLOYEE") === 0 && ("phoneNumber" in user) &&(
            <>
              <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Phone Number: {user.phoneNumber}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Commission: {user.commission}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Salary: {user.salary}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Hire Date: {user.hireDate}
                  </Typography>
                  {user.isResigned && (
                    <Typography variant="body2" color="textSecondary" component="p">
                      Resignation Date: {user.resignationDate}
                    </Typography>
                  )}
                  <Typography variant="body2" color="textSecondary" component="p">
                    Job: {user.job.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Department: {user.department.name}
                  </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="Edit Profile"
                >
                    <EditIcon />
                </IconButton>
              </CardActions>
            </>
          )}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <form onSubmit={handleSubmit(saveClickHandler)}>
                <CardHeader title="Edit Profile" />
                <CardContent>
                  <Grid
                      container
                      justify="space-evenly"
                      alignItems="center"
                  >
                  <UpdateEmployeeProfileForm
                      register={register}
                      errors={errors}
                      state={state}
                      setState={setState}
                  />
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      type="submit"
                  >
                      Update
                  </Button>
                </CardActions>
              </form>
            </CardContent>
          </Collapse>
      </Card>
      </div>
      <div style={{ marginTop: 20, padding: 30, marginLeft: 300 }}>
        {user.userType.localeCompare("EMPLOYEE") === 0 && ("phoneNumber" in user) &&(
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid>
              <Typography variant="h5">Your leaves:</Typography>
              <Divider/>
              <LeavesCalender isMultiple={false} leaves={user.leaves} />
            </Grid>
            <Grid>
              <Typography variant="h5">You work during below holidays:</Typography>
              <Divider/>
              <EmployeeHolidaysCalender isMultiple={false} employeeHolidays={user.employeeHolidays} />
            </Grid>
          </Grid>
        )}
      </div>
    </Page>
  );
}

export default EmployeeProfile;
