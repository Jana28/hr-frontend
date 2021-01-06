import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";
import { createDepartment, deleteDepartment, getDepartments, updateDepartment } from "../actions/departmentsAction";
import {tableIcons} from "../utils/tableIcons"
import Page from "../components/Page";

const ManageDepartments = () => {

  const {isLoading} = useSelector((state) => state.auth);
  const [departmentRows, setDepartmentRows] = useState([]);
  
  const columns = [
    {
      title: "Name",
      field: "name",
    },
  ];

  async function initDepartments() {
    getDepartments()
      .then((departments) => {
          console.log("departments", departments);
            const rows = departments
                ? departments.map((department) => {
                    return {
                        id: department.id,
                        name: department.name,
                    };
                    })
                : [];
            setDepartmentRows(rows);
      });
  }
  useEffect(() => {
    initDepartments();
  }, [isLoading]);

  const handleCreateDepartment = async (newData) => {
    const payload = {
        name: newData.name,
    };
    try {
      const status = await createDepartment(payload);
      if (status === 201) {
        alert("Department added")
        initDepartments();
      }
    } catch (error) {
      if(error.response.data.message) alert(error.response.data.message)
      alert("Failed to add department")
    }
  };

  const handleUpdateDepartment = async (newData) => {
    console.log("newData", newData);
    const updateDepartmentPayload = {
      id: newData.id,
      name: newData.name,
    };
    try {
      const status = await updateDepartment(updateDepartmentPayload);
      if (status === 200) {
        alert("department change")
        initDepartments();
      }
    } catch (error) {
      if(error.response.data.message) alert(error.response.data.message)
      alert("Failed to change department")
    }    
  };

  const handleDeletedepartment = async (oldData) => {
    await deleteDepartment(oldData.id);
    initDepartments();
  };

  return (
    <Page>
      <MaterialTable
          icons={tableIcons}
        title="Manage departments"
        columns={columns}
        data={departmentRows}
        editable={{
          onRowAdd: (newData) => handleCreateDepartment(newData),
          onRowUpdate: (newData) => handleUpdateDepartment(newData),
          onRowDelete: (oldData) => handleDeletedepartment(oldData),
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
      />
    </Page>
  );
};

export default ManageDepartments;