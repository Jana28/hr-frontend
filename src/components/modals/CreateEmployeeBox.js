import React, { memo, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";

import { createEmployee, setError } from "../../actions/employeesAction";
import { CardContent } from "@material-ui/core";
import EmployeeForm from "../forms/EmployeeForm";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) =>
  createStyles({
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

const CreateEmployeeBox = memo(({ initEmployees, open, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialState = {
    firstName: "",
    lastName: "",
    image: null,
    email: "",
    password: "",
    cPassword: "",
    phoneNumber: "",
    commission: 0,
    salary: 0,
    hireDate: new Date(),
    job_id: 1,
    department_id: 1,
  };
  const [state, setState] = useState(initialState);

  const { register, handleSubmit, errors } = useForm();

  const handleFormClose = () => {
    setState(initialState);
    //empty errors
    dispatch(setError([]));
    onClose();
  };

  const saveClickHandler = async () => {
    if(state.password.length < 8) {alert("Password 8 characters")}
    else {
      if(state.cPassword.length < 8 || state.cPassword.localeCompare(state.password) !== 0 ) {
        alert("Confirm password 8 characters and match password ")
      } else {
        const payload = {
          firstName: state.firstName,
          lastName: state.lastName,
          image: state.image,
          email: state.email,
          password: state.password,
          cPassword: state.cPassword,
          phoneNumber: state.phoneNumber,
          commission: state.commission,
          salary: state.salary,
          hireDate: state.hireDate,
          job_id: state.job_id,
          department_id: state.department_id,
        };
        //handleFormClose();
        dispatch(createEmployee({employee: payload, initEmployees}));
      }
    }
    
    
  };

  return (
    <div>
      {open && (
        <CardContent>
          <div className={classes.root}>
            <h2 id="simple-modal-title">
                Add Employee
            </h2>
            <form onSubmit={handleSubmit(saveClickHandler)}>
              <EmployeeForm
                  register={register}
                  errors={errors}
                  state={state}
                  setState={setState}
              />
              <div className={classes.buttons}>
              <Button type="submit" variant="contained" color="secondary">
                  Save
              </Button>
              </div>
            </form>
          </div>
          <Button variant="contained" color="secondary" onClick={handleFormClose}>
              Close
          </Button>
        </CardContent>
      )}
    </div>
  );
});

export default CreateEmployeeBox;