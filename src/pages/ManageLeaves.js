import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";
import { createLeave, deleteLeave, getLeaves, updateLeave } from "../actions/leavesAction";
import {tableIcons} from "../utils/tableIcons"
import Page from "../components/Page";
import { getLeavereasons } from "../actions/leavereasonsAction";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { getEmployees } from "../actions/employeesAction";
import { LeavesCalender } from "../components/LeavesCalender";

const ManageLeaves = () => {

  const {isLoading} = useSelector((state) => state.auth);
  const [leaveRows, setLeaveRows] = useState([]);

  const [leavereasons, setLeavereasons] = useState([]);
  const [employees, setEmployees] = useState([]);
  
  let leavereasonToUpdate;
  let employeeToUpdate;

  function setLeavereasonToUpdate(v) {
    leavereasonToUpdate = v;
  }
  function setEmployeeToUpdate(v) {
    employeeToUpdate = v;
  }

  async function initLeavereasons() {
    getLeavereasons()
      .then((leavereasonsRes) => {
        setLeavereasons(leavereasonsRes);
      });
  }
  async function initEmployees() {
    getEmployees()
      .then((employeesRes) => {
        setEmployees(employeesRes);
      });
  }

  useEffect(() => {
    initLeavereasons();
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
      title: "Leavereason",
      field: "leavereason",
      render: (rowData) => (
        <span>{rowData.leavereason.description}</span>
      ),
      editComponent: ({value}) => {
        return (
        <Autocomplete
          id="checkboxes-leavereason"
          options={leavereasons}
          defaultValue={value}
          onChange={(e, v) => {
            setLeavereasonToUpdate(v)
          }}
          getOptionLabel={(option) => option.description}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="leavereason" />
          )}
        />
      )},
    },
    {
      title: "Start Date",
      field: "startDate",
      type: 'datetime',
      validate: (rowData) => {
        const startDate = new Date(rowData.startDate);
        const endDate = new Date(rowData.endDate);
        return (
          endDate.getTime() > startDate.getTime() ||
          "Start date should be larger than current end date"
        );
      },
    },
    {
      title: "End Date",
      field: "endDate",
      type: 'datetime',
      validate: (rowData) => {
        const startDate = new Date(rowData.startDate);
        const endDate = new Date(rowData.endDate);
        return (
          endDate.getTime() > startDate.getTime() ||
          "End date should be larger than current start date"
        );
      }
    },
  ];

  async function initLeaves() {
    getLeaves()
      .then((leaves) => {
          console.log("leaves", leaves);
            const rows = leaves
                ? leaves.map((leave) => {
                    return {
                        id: leave.id,
                        employee: leave.employee,
                        leavereason: leave.leavereason,
                        startDate: leave.startDate,
                        endDate: leave.endDate,
                    };
                    })
                : [];
            setLeaveRows(rows);
      });
  }
  useEffect(() => {
    initLeaves();
  }, [isLoading]);

  const handleCreateLeave = async (newData) => {
    if(employeeToUpdate) {
      if(employeeToUpdate.isResigned) {alert("you are adding a leave for a resigned employee"); return; }
    }else {
      if(newData.employee.isResigned) {alert("you are adding a leave for a resigned employee"); return; }
    }
    const payload = {
        employee_id: employeeToUpdate ? employeeToUpdate.id : newData.employee.id,
        leavereason_id: leavereasonToUpdate ? leavereasonToUpdate.id : newData.leavereason.id,
        startDate: newData.startDate,
        endDate: newData.endDate,
    };
    try {
      const status = await createLeave(payload);
      if (status === 201) {
        alert("Leave added")
        initLeaves();
      }
    } catch (error) {
      if(error.response.data.message) alert(error.response.data.message)
      alert("Failed to add leave")
    }
  };

  const handleUpdateLeave = async (newData) => {
    console.log("newData", newData);
    const updateLeavePayload = {
      id: newData.id,
      employee_id: employeeToUpdate ? employeeToUpdate.id : newData.employee.id,
      leavereason_id: leavereasonToUpdate ? leavereasonToUpdate.id : newData.leavereason.id,
      startDate: newData.startDate,
      endDate: newData.endDate,
    };
    try {
      const status = await updateLeave(updateLeavePayload);
      if (status === 200) {
        alert("leave change")
        initLeaves();
      }
    } catch (error) {
      if(error.response.data.message) alert(error.response.data.message)
      alert("Failed to change leave")
    }
  };

  const handleDeleteleave = async (oldData) => {
    await deleteLeave(oldData.id);
    initLeaves();
  };

  return (
    <Page>
      <MaterialTable
          icons={tableIcons}
        title="Manage leaves"
        columns={columns}
        data={leaveRows}
        editable={{
          onRowAdd: (newData) => handleCreateLeave(newData),
          onRowUpdate: (newData) => handleUpdateLeave(newData),
          onRowDelete: (oldData) => handleDeleteleave(oldData),
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
      <LeavesCalender isMultiple leaves={leaveRows} />
    </Page>
  );
};

export default ManageLeaves;