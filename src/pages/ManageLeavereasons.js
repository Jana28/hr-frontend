import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";

import { createLeavereason, deleteLeavereason, getLeavereasons, updateLeavereason } from "../actions/leavereasonsAction";
import {tableIcons} from "../utils/tableIcons"
import Page from "../components/Page";

const ManageLeavereasons = () => {

  const {isLoading} = useSelector((state) => state.auth);
  const [leavereasonRows, setLeavereasonRows] = useState([]);


  const columns = [
    {
      title: "Description",
      field: "description",
    },
  ];

  async function initLeavereasons() {
    getLeavereasons()
      .then((leavereasons) => {
          console.log("leavereasons", leavereasons);
            const rows = leavereasons
                ? leavereasons.map((leavereason) => {
                    return {
                        id: leavereason.id,
                        description: leavereason.description,
                    };
                    })
                : [];
            setLeavereasonRows(rows);
      });
  }
  useEffect(() => {
    initLeavereasons();
  }, [isLoading]);

  const handleCreateLeavereason = async (newData) => {
    const payload = {
        description: newData.description,
    };
    try {
      const status = await createLeavereason(payload);
      if (status === 201) {
        alert("Leavereason added")
        initLeavereasons();
      }
    } catch (error) {
      if(error.response.data.message) alert(error.response.data.message)
      alert("Failed to add leavereason",)
    }
  };

  const handleUpdateLeavereason = async (newData) => {
    console.log("newData", newData);
    const updateLeavereasonPayload = {
      id: newData.id,
      description: newData.description,
    };
    try {
      const status = await updateLeavereason(updateLeavereasonPayload);
      if (status === 200) {
        alert("leavereason change")
        initLeavereasons();
      }
    } catch (error) {
      if(error.response.data.message) alert(error.response.data.message)
      alert("Failed to change leavereason")
    }
  };

  const handleDeleteleavereason = async (oldData) => {
    await deleteLeavereason(oldData.id);
    initLeavereasons();
  };

  return (
    <Page>
      <MaterialTable
          icons={tableIcons}
        title="Manage leavereasons"
        columns={columns}
        data={leavereasonRows}
        editable={{
          onRowAdd: (newData) => handleCreateLeavereason(newData),
          onRowUpdate: (newData) => handleUpdateLeavereason(newData),
          onRowDelete: (oldData) => handleDeleteleavereason(oldData),
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

export default ManageLeavereasons;