import React, { memo, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { InputLabel, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const AdminForm = memo((props) => {
  const { state, setState } = props;
  const {errors: errors_res} = useSelector((state) => state.auth);
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
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <Typography color="error">
            {errors_res.find((x) => x.name.localeCompare('email') === 0)?.message}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography color="error">
            {errors_res.find((x) => x.name.localeCompare('password') === 0)?.message}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography color="error">
            {errors_res.find((x) => x.name.localeCompare('c_password') === 0)?.message}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="cPassword"
            label="Confirm Password"
            type="password"
            id="cPassword"
            autoComplete="current-password"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel id="label">Image</InputLabel>
          <input
            required
            id="upload-image-file"
            name="upload-image-file"
            type="file"
            onChange={handleUploadFile}
          />
          <Typography color="error">{uploadedImageError}</Typography>
        </Grid>
        
      </Grid>
    </div>
  );
});

export default AdminForm;