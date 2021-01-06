import React from "react";
import { CardContent, Dialog, Grid, Typography } from "@material-ui/core";

const ErrorDialog = ({ errors, open, onClose }) => {
  
    const Record = ({ name, value }) => {
      return (
        <div>
          <Typography variant="body1"  color="error">{value}</Typography>
        </div>
      );
    };
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CardContent>
        <Grid container spacing={4}>
          {errors.map((error) => (
            <Grid item>
              {Object.entries(error).map(([key, value]) => (
                <Grid key={key} item xs={12} md={6}>
                  <Record name={key} value={JSON.stringify(value)} />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
          <Typography color="error">
            {errors.find((x) => x.name.localeCompare('firstName') === 0)?.message}
          </Typography>
        </CardContent>        
      </Dialog>
    );
};

export default ErrorDialog;