import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Card,
  CardContent,
  Grid,
  Slider,
  Stack,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Event as Ev } from "@/types";
import { config } from "@/config";
/* May need a loadingButton component / MUI   */
import supabase from "@/supabase";
import { useAuthContext } from "@/app/context/page";


type Props = {
  setEvents: React.Dispatch<React.SetStateAction<Ev[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Form = ({ setOpen, setEvents }: Props) => {
  const [treatments, setTreatments] = useState<number[]>([]);
  const [locations, setLocations] = useState<number[]>([]);
  const [symptoms, setSymptoms] = useState<number[]>([]);
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [length, setLength] = React.useState<number | number[]>(0);
  const [pain, setPain] = React.useState<number | number[]>(0);
  const [tempData, setTempdata] = useState<object>({});
  const { user } = useAuthContext();


  React.useEffect( () => {
     setTempdata({
      Treatments: [...treatments],
      Locations: [...locations],
      Symptoms: [...symptoms],
      date: date,
      duration: length,
      count: pain,
     })
  }, [treatments, locations, symptoms, date, length, pain])
  const saveEvent = async () => {
    setTempdata({
      ...tempData,
      error: undefined,
    });
    console.log(tempData)
      if ( !dayjs(date).isValid() ) {
        setTempdata({ ...tempData, error: "A date is obligatory" });
        console.log("DATE COMPARISON IS", tempData);
        return;
      }
    try {
      setTempdata({
        ...tempData,
        loading: true,
      });
        const { data, error } = await supabase
        .from('Event')
        .insert({
          Treatments: [...treatments],
          Locations: [...locations],
          Symptoms: [...symptoms],
          date: date,
          duration: length,
          count: pain,
        })
        .select()
        if(data){
          setEvents((prevEvent) => [
            ...prevEvent,
            {
              ...tempData,
              user_id: user.id,
            },
          ]);
          console.log("Success!")
          setOpen(false);
        }
        else if(error){
          console.warn(error);
        }

    } catch (err) {
      console.log(err, "Error made!");
      return null;
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOfValue: number
  ) => {
    if (event.target.name === "Symptoms") {
      setSymptoms([...symptoms, indexOfValue]);
      return;
    } else if (event.target.name === "Locations") {
      setLocations([...locations, indexOfValue]);
      return;
    }
    setTreatments([...treatments, indexOfValue]);
  };
  const handleSliders = (event: Event, newValue: number | number[]) => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (target.name === "length") {
      setLength(newValue);
      return;
    }
    setPain(newValue);
  };
 
  return (

    <Card
      variant="outlined"
      sx={{ minWidth: 275, maxWidth: 600, mx: "auto", px: 2, pb: 4, pt:2, my: 2 }}
    >
      <CardContent>
        <Grid sx={{ mb: 3 }} container   justifyContent="space-between" direction="row" >
          <h2>Add a new crisis</h2>
          <Button variant="text" onClick={() => setOpen(false)}>Back</Button>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <p>When was the migrane?</p>
            <DateTimePicker
              disableFuture
              defaultValue={dayjs()}
              value={date}
              onChange={(newVal) => setDate(newVal)}
            />
          </Grid>
          <Grid item xs={12}>
            <p>How long did it last?</p>
            <Stack direction="row" spacing={2}>
              <p>0h</p>
              <Slider
                name="length"
                defaultValue={1}
                min={0}
                max={72}
                step={1}
                valueLabelDisplay="auto"
                value={length}
                onChange={handleSliders}
              />
              <p>72h</p>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <p>Evaluate your pain on a scale 1 - 10</p>
            <Slider
              defaultValue={1}
              min={1}
              max={10}
              step={1}
              marks
              valueLabelDisplay="auto"
              value={pain}
              onChange={handleSliders}
            />
          </Grid>
          <Grid item xs={12}>
            {" "}
            {/*Symptoms Handling */}
            <p>Symptoms</p>
            <Grid>
              {config.Symptoms.map((symptom: any, indexOfSymptom: any) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Symptoms"
                      onChange={(e) => handleChange(e, indexOfSymptom)}
                    />
                  }
                  label={`${symptom}`}
                />
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {/*Location Handling */}
            <p>Location</p>
            <Grid>
              {config.Locations.map((location: any, indexOfLocation: any) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Locations"
                      onChange={(e) => handleChange(e, indexOfLocation)}
                    />
                  }
                  label={`${location}`}
                />
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {" "}
            {/*Medication Handling */}
            <p>Medications</p>
            <Grid>
              {config.Treatments.map(
                (treatment: any, indexOfTreatment: any) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="Treatments"
                        onChange={(e) => handleChange(e, indexOfTreatment)}
                      />
                    }
                    label={`${treatment}`}
                  />
                )
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={saveEvent}>
              {" "}
              Save{" "}
            </Button>
            <Button variant="text" onClick={() => setOpen(false)}>
              {" "}
              Cancel{" "}
            </Button>
          </Grid>
        </Grid>
        
      </CardContent>
    </Card>
  );
};
/*done */
export default Form;
