import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";
import { createWorkreason, deleteWorkreason, getWorkreasons, updateWorkreason } from "../actions/workreasonsAction";
import {tableIcons} from "../utils/tableIcons"
import Page from "../components/Page";

const ManageWorkreasons = () => {

  const {isLoading} = useSelector((state) => state.auth);
  const [workreasonRows, setWorkreasonRows] = useState([]);

  const columns = [
    {
      title: "Description",
      field: "description",
    },
  ];

  async function initWorkreasons() {
    getWorkreasons()
      .then((workreasons) => {
          console.log("workreasons", workreasons);
            const rows = workreasons
                ? workreasons.map((workreason) => {
                    return {
                        id: workreason.id,
                        description: workreason.description,
                    };
                    })
                : [];
            setWorkreasonRows(rows);
      });
  }
  useEffect(() => {
    initWorkreasons();
  }, [isLoading]);

  const handleCreateWorkreason = async (newData) => {
    const payload = {
        description: newData.description,
    };
    try {
      const status = await createWorkreason(payload);
      if (status === 201) {
        alert( "Workreason added")
        initWorkreasons();
      }
    } catch (error) {
      if(error.response.data.message) alert(error.response.data.message)
      alert("Failed to add workreason")
    }
  };

  const handleUpdateWorkreason = async (newData) => {
    console.log("newData", newData);
    const updateWorkreasonPayload = {
      id: newData.id,
      description: newData.description,
    };
    try {
      const status = await updateWorkreason(updateWorkreasonPayload);
      if (status === 200) {
        alert("Workreason change")
        initWorkreasons();
      }
    } catch (error) {
      if(error.response.data.message) alert(error.response.data.message)
      alert("Failed to change workreason")
    }
  };

  const handleDeleteworkreason = async (oldData) => {
    await deleteWorkreason(oldData.id);
    initWorkreasons();
  };

  return (
    <Page>
      <MaterialTable
          icons={tableIcons}
        title="Manage workreasons"
        columns={columns}
        data={workreasonRows}
        editable={{
          onRowAdd: (newData) => handleCreateWorkreason(newData),
          onRowUpdate: (newData) => handleUpdateWorkreason(newData),
          onRowDelete: (oldData) => handleDeleteworkreason(oldData),
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

export default ManageWorkreasons;