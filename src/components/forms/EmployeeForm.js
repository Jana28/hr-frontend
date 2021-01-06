import React, { memo, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { InputLabel, Select, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getDepartments } from "../../actions/departmentsAction";
import { getJobs } from "../../actions/jobsAction";
import moment from "moment";

const EmployeeForm = memo((props) => {
  const {isLoading, errors: errors_res} = useSelector((state) => state.auth);
  const { state, setState } = props;

  const [uploadedImageError, setUploadedImageError] = useState("");
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);

  async function initJobs() {
    getJobs()
      .then((jobsRes) => {
        setJobs(jobsRes);
      });
  }

  async function initDepartments() {
    getDepartments()
      .then((departmentsRes) => {
        setDepartments(departmentsRes);
      });
  }

  useEffect(() => {
    initJobs();
    initDepartments();
  }, [isLoading]);

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
  
  const SelectInput = ({options, value, name, id}) => {
    return (
      <>
        <InputLabel id="label">{name}</InputLabel>
        <Select
          required={name.localeCompare("departments") === 0 ? false : true}
          native
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
        >
          {name.localeCompare("departments") === 0 &&
            <option value="">
              None
            </option>
          }
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      </>
    );
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
        <Grid item xs={12} md={6}>
          <Typography color="error">
            {errors_res.find((x) => x.name.localeCompare('job_id') === 0)?.message}
          </Typography>
          <SelectInput name="job" value={state.job_id} id="job_id" options={jobs} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography color="error">
            {errors_res.find((x) => x.name.localeCompare('department_id') === 0)?.message}
          </Typography>
          <SelectInput name="department" value={state.department_id} id="department_id" options={departments} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography color="error">
            {errors_res.find((x) => x.name.localeCompare('salary') === 0)?.message}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="salary"
            name="salary"
            defaultValue={state.salary}
            title="salary"
            label="salary"
            type="number"
            InputProps={{
              inputProps: { 
                min: 0,
                max: 1000000,
                step: "0.01"
              }
            }}
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography color="error">
            {errors_res.find((x) => x.name.localeCompare('commission') === 0)?.message}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="commission"
            name="commission"
            defaultValue={state.commission}
            title="commission"
            label="commission"
            type="number"
            InputProps={{
              inputProps: { 
                min: 0,
                max: 1000000,
                step: "0.01"
              }
            }}
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography color="error">
            {errors_res.find((x) => x.name.localeCompare('hireDate') === 0)?.message}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="hireDate"
            name="hireDate"
            defaultValue={moment(state.hireDate).format("YYYY-MM-DD")}
            title="hireDate"
            label="hireDate"
            type="text"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography color="error">
            {errors_res.find((x) => x.name.localeCompare('image') === 0)?.message}
          </Typography>
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

export default EmployeeForm;