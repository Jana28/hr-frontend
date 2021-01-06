import React, {memo, useState} from 'react';
import { Grid, InputLabel } from '@material-ui/core';
import {useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const UpdateEmployeeProfileForm = memo((props) => {
  const {errors: errors_res} = useSelector((state) => state.auth);
  const { state, setState } = props;

  const [uploadedImageError, setUploadedImageError] = useState("");

  const handleChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

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
        setState({ ...state, image: uploadedFile });
    }
  }

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography color="error">
          {errors_res.find((x) => x.name.localeCompare('firstName') === 0)?.message}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="firstName"
          name="firstName"
          defaultValue={state.firstName}
          title="firstName"
          label="firstName"
          type="text"
          fullWidth
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography color="error">
          {errors_res.find((x) => x.name.localeCompare('lastName') === 0)?.message}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="lastName"
          name="lastName"
          defaultValue={state.lastName}
          title="lastName"
          label="lastName"
          type="text"
          fullWidth
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography color="error">
          {errors_res.find((x) => x.name.localeCompare('phoneNumber') === 0)?.message}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="phoneNumber"
          name="phoneNumber"
          defaultValue={state.phoneNumber}
          title="phoneNumber"
          label="phoneNumber"
          type="text"
          fullWidth
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography color="error">
          {errors_res.find((x) => x.name.localeCompare('image') === 0)?.message}
        </Typography>
        <InputLabel id="label">Image</InputLabel>
        <input
          id="upload-image-file"
          name="upload-image-file"
          type="file"
          onChange={handleUploadFile}
        />
        <Typography color="error">{uploadedImageError}</Typography>
      </Grid>
    </Grid>
  );
})

export default UpdateEmployeeProfileForm;
