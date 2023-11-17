"use client";
import React from "react";
import dayjs from "dayjs";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Event } from "@/types";
import { Alert, AlertTitle, Button, Grid } from "@mui/material";

type Props = {
  events: Event[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Calendar = ({ events, setOpen }: Props) => {
  let yearly = dayjs().subtract(365, "days").format("YYYY-MM-DD");
  const formattedEvents = {events};


  return (
    <>
  
      <Grid
        direction="row"
        container
        item
        justifyContent="space-between"
        alignItems="center"
        justifyItems="center"
        sx={{ mb: 4 }}
      >
          <h2>Migraine events</h2>
          <Button className="info" variant="outlined" onClick={() => setOpen(true)}>New Migrane</Button>
      </Grid>
       <Grid container item sx={{px: 5, py:3}}> 

       <CalendarHeatmap
          startDate={yearly}
          showMonthLabels	
          values={events}
          classForValue={(value:object[])=> {
            if(!value) return "color-empty";
            return `primary opacity-${value.count}`
          }}
        />
        </Grid>
      <Alert severity="info">
        <AlertTitle>Beta</AlertTitle>
        <span>
          MigraneTracker is currently in beta mode, More updates are coming to improve the experience
          We thank you for understanding!
        </span>
      </Alert>

    </>
  );
};

export default Calendar;
