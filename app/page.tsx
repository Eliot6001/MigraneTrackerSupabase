"use client";
import { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Container, Grid } from "@mui/material";
import Image from "next/image";
import UserHeader from "@/components/userHeader";
import Calendar from "@/components/Calendar";
import Form from "@/components/Form";
import dayjs from "dayjs";
import { Event } from "@/types";
import supabase from "@/supabase";
import { useAuthContext } from "./context/page";
import { CSSTransition } from "react-transition-group";
import "./theme.css";
export default function Home() {
  const [events, setEvents] = useState<Array<Event>>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useAuthContext();
  const updateEvents = (data: any) => {
    setEvents(data);
  };
  const fetchEvent = async () => {
    try {
      const { data, error }: { data: Event | null; error: Error | null } =
        await supabase.from("Event").select("*").eq("user_id", user.id);
      if (error) console.log(error, "was detected");
      if (data?.length !== 0) {
        updateEvents([...data]);
        setLoading(false);
      }
      console.log(data, user.id);
    } catch (error) {
      console.log(error, "There was an error.");
    }
  };
  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <Container>
      <Grid>
        <UserHeader />
      </Grid>
      <Grid spacing={3}>
        {!open && (
          <CSSTransition
            in={!open && !loading}
            timeout={500}
            classNames={"example"}
          >
            <CalendarHandler
              events={events}
              setOpen={setOpen}
              loading={loading}
            />
          </CSSTransition>
        )}

        {open && (
          <CSSTransition in={open} timeout={500} classNames={"example"}>
            <Form setEvents={updateEvents} setOpen={setOpen} />
          </CSSTransition>
        )}
      </Grid>
    </Container>
  );
}
/* NEED  */

function CalendarHandler({
  events,
  setOpen,
  loading,
}: {
  events: Event;
  setOpen: any;
  loading: boolean;
}) {
  return (
    <>
      {!loading && (
        <CSSTransition in={open} timeout={500} classNames={"example"}>
          <Calendar events={events} setOpen={setOpen} />
        </CSSTransition>
      )}
      {loading && (
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          justifyItems="center"
          xs={12}
        >
          <CircularProgress />
        </Grid>
      )}
    </>
  );
}
