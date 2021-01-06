import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";
import { createHoliday, deleteHoliday, getHolidays, updateHoliday } from "../actions/holidaysAction";
import {tableIcons} from "../utils/tableIcons"
import Page from "../components/Page";

const ManageHolidays = () => {

  const {isLoading} = useSelector((state) => state.auth);
  const [holidayRows, setHolidayRows] = useState([]);

  const columns = [
    {
      title: "Name",
      field: "name",
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

  async function initHolidays() {
    getHolidays()
      .then((holidays) => {
          console.log("holidays", holidays);
            const rows = holidays
                ? holidays.map((holiday) => {
                    return {
                        id: holiday.id,
                        name: holiday.name,
                        startDate: holiday.startDate,
                        endDate: holiday.endDate,
                    };
                    })
                : [];
            setHolidayRows(rows);
      });
  }
  useEffect(() => {
    initHolidays();
  }, [isLoading]);

  const handleCreateHoliday = async (newData) => {
    const payload = {
        name: newData.name,
        startDate: newData.startDate,
        endDate: newData.endDate,
    };
    try {
      const status = await createHoliday(payload);
      console.log("statusstatusstatus", status)
      if (status === 201) {
        alert("Holiday added")
        initHolidays();
      }
    } catch (error) {
      if(error.response.data.message) alert(error.response.data.message)
      alert("Failed to add holiday")
    }
  }; 

  const handleUpdateHoliday = async (newData) => {
    console.log("newData", newData);
    const updateHolidayPayload = {
      id: newData.id,
      name: newData.name,
      startDate: newData.startDate,
      endDate: newData.endDate,
    };
    try {
      const status = await updateHoliday(updateHolidayPayload);
      if (status === 200) {
        alert("holiday change")
        initHolidays();
      }
    } catch (error) {
      if(error.response.data.message) alert(error.response.data.message)
      alert("Failed to change holiday")
    }    
  };

  const handleDeleteholiday = async (oldData) => {
    await deleteHoliday(oldData.id);
    initHolidays();
  };

  return (
    <Page>
      <MaterialTable
          icons={tableIcons}
        title="Manage holidays"
        columns={columns}
        data={holidayRows}
        editable={{
          onRowAdd: (newData) => handleCreateHoliday(newData),
          onRowUpdate: (newData) => handleUpdateHoliday(newData),
          onRowDelete: (oldData) => handleDeleteholiday(oldData),
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

export default ManageHolidays;