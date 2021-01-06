import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable, { Column } from "material-table";

import CreateadminBox from "../components/modals/CreateAdminBox";
import { getAdmins, setError, updateAdmin, deleteAdmin } from "../actions/adminsAction";
import { AddBox } from "@material-ui/icons";
import {tableIcons} from "../utils/tableIcons"
import { Avatar, makeStyles, Typography } from "@material-ui/core";
import Page from "../components/Page";
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

const ManageAdmins = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {isLoading, errors: errors_res, user} = useSelector((state) => state.auth);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [adminRows, setAdminRows] = useState([]);
  const [createAdminOpen, setCreateAdminOpen] = useState(false);
  const [uploadedImageError, setUploadedImageError] = useState("");

  let imageToUpdate = null;

  function setImageToUpdate(v) {
    imageToUpdate = v;
  }

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
  
  const columns = [
    {
      title: "FirstName",
      field: "firstName",
      editable: "onUpdate",
    },
    {
      title: "LastName",
      field: "lastName",
      editable: "onUpdate",
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
  ];

  async function initAdmins() {
    getAdmins()
      .then((admins) => {
        console.log("admins", admins);
          const rows = admins
            ? admins.map((admin) => {
                return {
                  id: admin.id,
                  firstName: admin.firstName,
                  lastName: admin.lastName,
                  email: admin.email,
                  imageName: admin.imageName,
                };
                })
            : [];
          setAdminRows(rows);
      });
  }
  useEffect(() => {
    initAdmins();
  }, [isLoading]);

  const handleCreateAdminOpen = () => {
    setCreateAdminOpen(true);
  };

  const handleCreateAdminClose = () => {
    setCreateAdminOpen(false);
  };

  const handleUpdateAdmin = async (newData) => {
    if(!newData.firstName || !newData.lastName) {alert("first and lst name not null")}
    else {
      console.log("newData", newData);
      const updateAdminPayload = {
          id: newData.id,
          firstName: newData.firstName,
          lastName: newData.lastName,
          image: imageToUpdate,
      };

      dispatch(updateAdmin({admin: updateAdminPayload, initAdmins}));
    }
      
  };

  const handleDeleteAdmin = async (oldData) => {
    if(user.id !== oldData.id){
      await deleteAdmin(oldData.id);
      initAdmins();
    } else alert ("you are not allowed to delete yourself")
  };

  return (
    <Page>
      {!createAdminOpen && (
        <MaterialTable
          icons={tableIcons}
          title="Manage admins"
          columns={columns}
          data={adminRows}
          actions={
            [
              {
                icon: () => <AddBox />,
                tooltip: "add new admin",
                position: "toolbar",
                onClick: () => {
                  handleCreateAdminOpen();
                },
              },
            ]
          }
          editable={{
            onRowUpdate: (newData) => handleUpdateAdmin(newData),
            onRowDelete: (oldData) => handleDeleteAdmin(oldData),
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
      {createAdminOpen && (
        <CreateadminBox
          initAdmins={initAdmins}
          open={createAdminOpen}
          onClose={handleCreateAdminClose}
          aria-labelledby="create-user-modal"
          aria-describedby="create-user-modal"
        />
      )}
    </Page>
  );
};

export default ManageAdmins;