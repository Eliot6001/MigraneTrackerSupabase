"use client";

import {useState} from "react";
import { Button, TextField, Grid } from "@mui/material";
import Image from "next/image";
import doctor from "@/components/doctor.png";
import  supabase from '@/supabase';

const Landing = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const login = async () => {
    if(!email) {
      new Error("an Email is required!")
      alert("Please enter a valid email address")
    }
    try {
       let { data, error } = await supabase.auth.signInWithOtp({
          email: email as string,
        })
    } catch (error) {
      console.log(error, "has been faced")
    }
  }
  return (
    <Grid
      className="Landing"
      container
      direction="column"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item>
        <h1>Track your migraines, Find a cure!</h1>
        <p style={{ maxWidth: "800px", lineHeight: "1.35"}}>
          Our app helps you track your migranes events, provide the opportunity<br/>
          for your doctors to help you find the right treatment!
        </p>
      </Grid>
      <Grid item
        direction={"row"}
        justifyContent={"center"}
        alignContent={"center"}
        sx={{ py: 4 }}
      >
        <TextField
          sx={{ mr: 2 }}
          size="small"
          maxRows={1}
          label="email@email.com"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" onClick={login}>Sign up!</Button>
      </Grid>
      <Grid item>
        <Image
          style={{
            maxWidth: "700px",
            width: "100%",
            height: "auto",
            margin: "auto",
          }}
          src={doctor}
          alt="doctor"
          className="pointer"
        />
      </Grid>
    </Grid>
  );
};

export default Landing;
