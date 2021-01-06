import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";

import { createJob, deleteJob, getJobs, updateJob } from "../actions/jobsAction";
import {tableIcons} from "../utils/tableIcons"
import Page from "../components/Page";

const ManageJobs = () => {

  const {isLoading} = useSelector((state) => state.auth);
  const [jobRows, setJobRows] = useState([]);

  const columns = [
    {
      title: "Name",
      field: "name",
    },
  ];

  async function initJobs() {
    getJobs()
      .then((jobs) => {
          console.log("jobs", jobs);
            const rows = jobs
                ? jobs.map((job) => {
                    return {
                        id: job.id,
                        name: job.name,
                    };
                    })
                : [];
            setJobRows(rows);
      });
  }
  useEffect(() => {
    initJobs();
  }, [isLoading]);

  const handleCreateJob = async (newData) => {
    const payload = {
        name: newData.name,
    };
    try {
      const status = await createJob(payload);
      if (status === 201) {
        alert("Job added")
        initJobs();
      }
    } catch (error) {
      if(error.response.data.message) alert(error.response.data.message)
      alert("Failed to add job")
    }
  };

  const handleUpdateJob = async (newData) => {
    console.log("newData", newData);
    const updateJobPayload = {
      id: newData.id,
      name: newData.name,
    };
    try {
      const status = await updateJob(updateJobPayload);
      if (status === 200) {
        alert("job change")
        initJobs();
      }
    } catch (error) {
      if(error.response.data.message) alert(error.response.data.message)
      alert("Failed to change job")
    }    
  };

  const handleDeletejob = async (oldData) => {
    await deleteJob(oldData.id);
    initJobs();
  };

  return (
    <Page>
      <MaterialTable
          icons={tableIcons}
        title="Manage jobs"
        columns={columns}
        data={jobRows}
        editable={{
          onRowAdd: (newData) => handleCreateJob(newData),
          onRowUpdate: (newData) => handleUpdateJob(newData),
          onRowDelete: (oldData) => handleDeletejob(oldData),
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

export default ManageJobs;