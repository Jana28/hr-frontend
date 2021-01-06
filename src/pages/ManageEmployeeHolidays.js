import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";

import { createEmployeeHoliday, deleteEmployeeHoliday, getEmployeeHolidays, updateEmployeeHoliday } from "../actions/employeeHolidaysAction";
import {tableIcons} from "../utils/tableIcons"
import Page from "../components/Page";
import { getWorkreasons } from "../actions/workreasonsAction";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { getEmployees } from "../actions/employeesAction";
import { getHolidays } from "../actions/holidaysAction";
import { EmployeeHolidaysCalender } from "../components/EmployeeHolidaysCalender";

const ManageEmployeeHolidays = () => {

  const {isLoading} = useSelector((state) => state.auth);
  const [employeeHolidayRows, setEmployeeHolidayRows] = useState([]);
  
  const [holidays, setHolidays] = useState([]);
  const [workreasons, setWorkreasons] = useState([]);
  const [employees, setEmployees] = useState([]);

  
  let holidayToUpdate;
  let workreasonToUpdate;
  let employeeToUpdate;

  function setHolidayToUpdate(v) {
    holidayToUpdate = v;
  }
  function setWorkreasonToUpdate(v) {
    workreasonToUpdate = v;
  }
  function setEmployeeToUpdate(v) {
    employeeToUpdate = v;
  }

  async function initHolidays() {
    getHolidays()
      .then((holidaysRes) => {
        setHolidays(holidaysRes);
      });
  }
  async function initWorkreasons() {
    getWorkreasons()
      .then((workreasonsRes) => {
        setWorkreasons(workreasonsRes);
      });
  }
  async function initEmployees() {
    getEmployees()
      .then((employeesRes) => {
        setEmployees(employeesRes);
      });
  }

  useEffect(() => {
    initHolidays();
    initWorkreasons();
    initEmployees();
  }, [isLoading]);

  const columns = [
    {
      title: "Employee",
      field: "employee",
      render: (rowData) => (
        <span>{rowData.employee.email}</span>
      ),
      editComponent: ({value}) => {
        return (
        <Autocomplete
          id="checkboxes-employee"
          options={employees}
          defaultValue={value}
          onChange={(e, v) => {
            setEmployeeToUpdate(v)
          }}
          getOptionLabel={(option) => option.email}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="employee" />
          )}
        />
      )},
    },
    {
      title: "Workreason",
      field: "workreason",
      render: (rowData) => (
        <span>{rowData.workreason.description}</span>
      ),
      editComponent: ({value}) => {
        return (
        <Autocomplete
          id="checkboxes-workreason"
          options={workreasons}
          defaultValue={value}
          onChange={(e, v) => {
            setWorkreasonToUpdate(v)
          }}
          getOptionLabel={(option) => option.description}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="workreason" />
          )}
        />
      )},
    },
    {
      title: "Holiday",
      field: "holiday",
      render: (rowData) => (
        <span>{rowData.holiday.name}</span>
      ),
      editComponent: ({value}) => {
        return (
        <Autocomplete
          id="checkboxes-holiday"
          options={holidays}
          defaultValue={value}
          onChange={(e, v) => {
            setHolidayToUpdate(v)
          }}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="holiday" />
          )}
        />
      )},
    },
    {
      title: "Holiday start date",
      field: "startDate",
      editable: "never",
      render: (rowData) => (
        <span>{rowData.holiday.startDate}</span>
      ),
    },
    {
      title: "Holiday end date",
      field: "endDate",
      editable: "never",
      render: (rowData) => (
        <span>{rowData.holiday.endDate}</span>
      ),
    },
  ];

  async function initEmployeeHolidays() {
    getEmployeeHolidays()
      .then((employeeHolidays) => {
            const rows = employeeHolidays
                ? employeeHolidays.map((employeeHoliday) => {
                    return {
                        id: employeeHoliday.id,
                        employee: employeeHoliday.employee,
                        workreason: employeeHoliday.workreason,
                        holiday: employeeHoliday.holiday,
                    };
                    })
                : [];
            setEmployeeHolidayRows(rows);
      });
  }
  useEffect(() => {
    initEmployeeHolidays();
  }, [isLoading]);

  const handleCreateEmployeeHoliday = async (newData) => {
    const payload = {
      employee_id: employeeToUpdate ? employeeToUpdate.id : newData.employee.id,
      workreason_id: workreasonToUpdate ? workreasonToUpdate.id : newData.workreason.id,
      holiday_id: holidayToUpdate ? holidayToUpdate.id : newData.holiday.id,
    };
    try {
      const status = await createEmployeeHoliday(payload);
      if (status === 201) {
        alert("EmployeeHoliday added")
        initEmployeeHolidays();
      }
    } catch (error) {
      if(error.response.data.message) alert(error.response.data.message)
      alert("Failed to add employeeHoliday")
    }
  };

  const handleUpdateEmployeeHoliday = async (newData) => {
    console.log("newData", newData);
    const updateEmployeeHolidayPayload = {
      id: newData.id,
      employee_id: employeeToUpdate ? employeeToUpdate.id : newData.employee.id,
      workreason_id: workreasonToUpdate ? workreasonToUpdate.id : newData.workreason.id,
      holiday_id: holidayToUpdate ? holidayToUpdate.id : newData.holiday.id,
    };
    try {
      const status = await updateEmployeeHoliday(updateEmployeeHolidayPayload);
      if (status === 201) {
        alert("work during change")
        initEmployeeHolidays();
      }
    } catch (error) {
      if(error.response.data.message) alert(error.response.data.message)
      alert("Failed to change work during")
    }
  };

  const handleDeleteemployeeHoliday = async (oldData) => {
    await deleteEmployeeHoliday(oldData.id);
    initEmployeeHolidays();
  };

  return (
    <Page>
      <MaterialTable
          icons={tableIcons}
        title="Manage employee work during Holidays"
        columns={columns}
        data={employeeHolidayRows}
        editable={{
          onRowAdd: (newData) => handleCreateEmployeeHoliday(newData),
          onRowUpdate: (newData) => handleUpdateEmployeeHoliday(newData),
          onRowDelete: (oldData) => handleDeleteemployeeHoliday(oldData),
        }}
        options={{
          search: false,
          actionsColumnIndex: -1,
          pageSize: 20,
          pageSizeOptions: [20, 50],
          paging: false,
          maxBodyHeight: "60vh",
          minBodyHeight: "60vh",
        }}
      />
      <EmployeeHolidaysCalender isMultiple employeeHolidays={employeeHolidayRows}/>
    </Page>
  );
};

export default ManageEmployeeHolidays;