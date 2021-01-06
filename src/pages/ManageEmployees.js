import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable, { Column } from "material-table";

import CreateemployeeBox from "../components/modals/CreateEmployeeBox";
import { getEmployees, setError, updateEmployee } from "../actions/employeesAction";
import { AddBox } from "@material-ui/icons";
import {tableIcons} from "../utils/tableIcons"
import { Avatar, Divider, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import Page from "../components/Page";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import { getJobs } from "../actions/jobsAction";
import { getDepartments } from "../actions/departmentsAction";
import {EmployeeHolidaysCalender} from "../components/EmployeeHolidaysCalender";
import {LeavesCalender} from "../components/LeavesCalender";
import ErrorDialog from "../components/modals/ErrorDialog";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    width: 140
  },
});

const ManageEmployees = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {isLoading, errors: errors_res} = useSelector((state) => state.auth);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [employeeRows, setEmployeeRows] = useState([]);
  const [createEmployeeOpen, setCreateEmployeeOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [uploadedImageError, setUploadedImageError] = useState("");

  let isResignedToUpdate = null;
  let departmentToUpdate;
  let jobToUpdate;
  let imageToUpdate = null;

  function setIsResignedToUpdate(v) {
    isResignedToUpdate = v;
  }
  function setJobToUpdate(v) {
    jobToUpdate = v;
  }
  function setDepartmentToUpdate(v) {
    departmentToUpdate = v;
  }
  function setImageToUpdate(v) {
    imageToUpdate = v;
  }

  async function initJobs() {
    getJobs()
      .then((jobsRes) => {
        setJobs(jobsRes);
      });
  }
  async function initDepartments() {
    getDepartments()
      .then((departmentsRes) => {
        setDepartments(departmentsRes);
      });
  }
  useEffect(() => {
    initJobs();
    initDepartments();
  }, [isLoading]);

  useEffect(() => {
    console.log("errors_res", errors_res);
    if (errors_res.length > 0) {
      setIsErrorDialogOpen(true);
    }
  }, [errors_res]);

  function handleUploadFile(e) {
    const uploadedFile = e.target.files[0];

    const { type, size } = uploadedFile;
    const fileExtension = type.split("/").pop();
    let flag = true;
    switch (fileExtension) {
        case "png":
        case "jpeg":
        case "jpg":
        if (size > 20 * 1000 * 1000) {
            setUploadedImageError(
            "the file size of type image should be maximum of 20MB"
            );
            flag = false;
            e.target.value = null;
        }
        break;
        default:
            setUploadedImageError(
                "file type should be image(png/jpg/jpeg)"
            );
            flag = false;
            e.target.value = null;
    }
    if (uploadedFile && flag) {
        setUploadedImageError("");
        setImageToUpdate(uploadedFile);
    }
  }
	// employeeHolidays: Array<IEmployeeHoliday>;
	// leaves: Array<ILeave>;
  const columns = [
    {
      title: "FirstName",
      field: "firstName",
      editable: "onUpdate",
      validate: (rowData) =>
        (rowData.firstName && rowData.firstName.length > 1) ||
        "firstName should be be at least 2 characters",
    },
    {
      title: "LastName",
      field: "lastName",
      editable: "onUpdate",
      validate: (rowData) =>
        (rowData.lastName && rowData.lastName.length > 1) ||
        "lastName should be be at least 2 characters",
    },
    {
      title: "Image",
      field: "image",
      render: (rowData) => (
        <Avatar
          className={classes.media}
          alt={rowData.firstName}
          src={`${process.env.REACT_APP_BACKEND_BASEURL}images/${rowData.imageName}`}
          aria-label="recipe"
        />
      ),
      editComponent: ({value}) => {
        return (
          <>
            <input
              id="upload-image-file"
              name="upload-image-file"
              type="file"
              onChange={(e) => handleUploadFile(e)}
            />
            <Typography color="error">{uploadedImageError}</Typography>
          </>
        );
      }
    },
    {
      title: "Email",
      field: "email",
      editable: "never",
    },
    {
      title: "Phone Number",
      field: "phoneNumber",
      editable: "onUpdate",
      validate: (rowData) =>
        (rowData.phoneNumber && rowData.phoneNumber.length > 1) ||
        "phoneNumber should be be at least 2 characters",
    },
    {
      title: "Hire Date",
      field: "hireDate",
      editable: "onUpdate",
      type: 'datetime',
      validate: (rowData) => {
        if (rowData.resignationDate) {
          const hireDate = new Date(rowData.hireDate);
          const resignationDate = new Date(rowData.resignationDate);
          return (
            resignationDate.getTime() > hireDate.getTime() ||
            "Hire date should be larger than current resignation date"
          );
        }
        return true;
      },
    },
    {
      title: "Resignation Date",
      field: "resignationDate",
      editable: "onUpdate",
      type: 'datetime',
      validate: (rowData) => {
        if (rowData.resignationDate) {
          const hireDate = new Date(rowData.hireDate);
          const resignationDate = new Date(rowData.resignationDate);
          if(!(resignationDate.getTime() > hireDate.getTime()))
            return (
              resignationDate.getTime() > hireDate.getTime() ||
              "Resignation date  should be larger than current hire date"
            );
        }
        if(isResignedToUpdate !== null){
          if((isResignedToUpdate && rowData.resignationDate === null) || (!isResignedToUpdate && rowData.resignationDate !== null))
            return (
              "if employee is resigned resignation date should not be null"
            );
        } else {
          if((rowData.isResigned && rowData.resignationDate === null) || (!rowData.isResigned && rowData.resignationDate !== null))
            return (
              "if employee is resigned resignation date should not be null"
            );
        }
        return true;
      },
    },
    {
      title: "Salary",
      field: "salary",
      editable: "onUpdate",
      type: 'numeric',
      validate: (rowData) =>
        (rowData.salary <= 1000000 && rowData.salary >= 0) ||
        "Salary should be positive & less than or equal to 1,000,000"
    },
    {
      title: "Commission",
      field: "commission",
      editable: "onUpdate",
      type: 'numeric',
      validate: (rowData) =>
        (rowData.commission <= 1000000 && rowData.commission >= 0) ||
        "Commission should be positive & less than or equal to 1,000,000"
    },
    {
      title: "Resigned",
      field: "isResigned",
      editable: "onUpdate",
      render: (rowData) => (
        rowData.isResigned ? "True" : "False"
      ),
      editComponent: ({value}) => {
        return (
          <Autocomplete
            id="checkboxes-isResigned"
            options={[{id:1, name: "True", value: true},{id: 0, name: "False", value: false}]}
            defaultValue={value ? {id:1, name: "True", value: true} : {id: 0, name: "False", value: false}}
            onChange={(e, v) => {
              setIsResignedToUpdate(v?.value)
            }}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.id === value.id}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="isResigned" />
            )}
          />
        )
      }
    },
    {
      title: "Job",
      field: "job",
      editable: "onUpdate",
      render: (rowData) => (
        <span>{rowData.job.name}</span>
      ),
      editComponent: ({value}) => {
        return (
        <Autocomplete
          id="checkboxes-job"
          options={jobs}
          defaultValue={value}
          onChange={(e, v) => {
            setJobToUpdate(v)
          }}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="job" />
          )}
        />
      )},
    },
    {
      title: "Department",
      field: "department",
      editable: "onUpdate",
      render: (rowData) => (
        <span>{rowData.department.name}</span>
      ),
      editComponent: ({value}) => {
        return (
        <Autocomplete
          id="checkboxes-department"
          options={departments}
          defaultValue={value}
          onChange={(e, v) => {
            setDepartmentToUpdate(v)
          }}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="department" />
          )}
        />
      )},
    },
  ];

  async function initEmployees() {
    getEmployees()
      .then((employees) => {
        console.log("employees", employees);
          const rows = employees
            ? employees.map((employee) => {
                return {
                  id: employee.id,
                  firstName: employee.firstName,
                  lastName: employee.lastName,
                  email: employee.email,
                  imageName: employee.imageName,
                  phoneNumber: employee.phoneNumber,
                  hireDate: employee.hireDate,
                  salary: employee.salary,
                  commission: employee.commission,
                  isResigned: employee.isResigned,
                  resignationDate: employee.resignationDate,
                  job: employee.job,
                  department: employee.department,
                  employeeHolidays: employee.employeeHolidays,
                  leaves: employee.leaves,
                };
                })
            : [];
          setEmployeeRows(rows);
      });
  }
  useEffect(() => {
    initEmployees();
  }, [isLoading]);

  const handleCreateEmployeeOpen = () => {
    setCreateEmployeeOpen(true);
  };

  const handleCreateEmployeeClose = () => {
    setCreateEmployeeOpen(false);
  };

  const handleUpdateEmployee = async (newData) => {
    console.log("newData", newData);
    console.log("isResignedToUpdate", isResignedToUpdate);
    if(isResignedToUpdate !== null){
      if((isResignedToUpdate && newData.resignationDate === null) || (!isResignedToUpdate && newData.resignationDate !== null)){
        alert("if employee is resigned resignation date should not be null")
        return ;
      }
    } else {
      if((newData.isResigned && newData.resignationDate === null) || (!newData.isResigned && newData.resignationDate !== null)){
        alert("if employee is resigned resignation date should not be null")
        return ;
      }
    }
    const updateEmployeePayload = {
        id: newData.id,
        firstName: newData.firstName,
        lastName: newData.lastName,
        image: imageToUpdate,
        phoneNumber: newData.phoneNumber,
        hireDate: newData.hireDate,
        salary: newData.salary,
        commission: newData.commission,
        isResigned: isResignedToUpdate !== null ? isResignedToUpdate : newData.isResigned,
        resignationDate: newData.resignationDate,
        job_id: jobToUpdate ? jobToUpdate.id : newData.job.id,
        department_id: departmentToUpdate ? departmentToUpdate.id : newData.department.id,
    };

    dispatch(updateEmployee({employee: updateEmployeePayload, initEmployees}));
  };

  return (
    <Page>
      {!createEmployeeOpen && (
        <MaterialTable
          icons={tableIcons}
          title="Manage employees"
          columns={columns}
          data={employeeRows}
          actions={
            [
              {
                icon: () => <AddBox />,
                tooltip: "add new employee",
                position: "toolbar",
                onClick: () => {
                  handleCreateEmployeeOpen();
                },
              },
            ]
          }
          editable={{
            onRowUpdate: (newData) => handleUpdateEmployee(newData),
          }}
          options={{
            search: false,
            actionsColumnIndex: -1,
            pageSize: 20,
            pageSizeOptions: [20, 50],
            paging: false,
            maxBodyHeight: "70vh",
            minBodyHeight: "70vh",
          }}
          detailPanel={(rowData) => {
            return (
              <>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                  <Grid>
                    <Typography variant="h5">This selected employee has below leaves:</Typography>
                    <Divider/>
                    <LeavesCalender isMultiple={false} leaves={rowData.leaves} />
                  </Grid>
                  <Grid>
                    <Typography variant="h5">the selected employee work during below holidays:</Typography>
                    <Divider/>
                    <EmployeeHolidaysCalender isMultiple={false} employeeHolidays={rowData.employeeHolidays} />
                  </Grid>
                </Grid>
              </>
            );
          }}
        />
      )}
      <ErrorDialog
        open={isErrorDialogOpen}
        onClose={() => {
          setIsErrorDialogOpen(false);
          dispatch(setError([]))
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        errors={errors_res}
      /> 
      {createEmployeeOpen && (
        <CreateemployeeBox
          initEmployees={initEmployees}
          open={createEmployeeOpen}
          onClose={handleCreateEmployeeClose}
        />
      )}
    </Page>
  );
};

export default ManageEmployees;