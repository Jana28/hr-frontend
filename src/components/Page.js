import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MiniDrawer from './Drawer';
import company from "../utils/company.jpg" 

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor:"#b3c2d1",
    },
  })
);

const Page = ({children}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
       <MiniDrawer>{children}</MiniDrawer>
        
    </div>
  );
}

export default Page;
