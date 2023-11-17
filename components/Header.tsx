import React, { useContext } from "react";

import { Avatar, Grid, Button, Switch, FormControlLabel } from "@mui/material";
import Logo from "@/components/logofile.png";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthContext } from "@/app/context/page";
import CustomAvatar from "./CustomAvatar";

const Header = ({ switchTheme }: { switchTheme: any }) => {
  const { user } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();
  const getFirstLetter = () => {
    if (user === null) return "A";
    console.log(user, "user from authcontext");
    return user?.email[0];
  };
  return (
    <Grid sx={{ p: 2 }}>
      <Grid
        container
        direction="row"
        justifyContent={pathname === "/" ? "center" : "space-between"}
        alignItems="center"
      >
        <Grid item xs={6}>
          <Image src={Logo} alt="logo" width={60} height={60} />
        </Grid>
        <Grid
          xs={6}
  
          container
          direction="row"
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          

          {user && (
            <Grid
              xs={6}
              rowSpacing={2}
             
              container
              direction="row"
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <p> {user?.email}</p>
              <FormControlLabel
                control={
                  <Switch
                    onChange={switchTheme}
                    name="gilad"
                    color="primary"
                  ></Switch>
                }
  
                label=""
              ></FormControlLabel>
              <CustomAvatar email={user.email as string} avLink={''}/>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
