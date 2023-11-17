"use client"
import {
  createTheme
} from "@mui/material/styles"

export const darkTheme = createTheme(
  {
    palette:{
      mode:'dark',
      primary:{
        main: '#1FFFFF'
      }
    }
  }
);
export const lightTheme = createTheme(
  {
    palette:{
      mode:'light',
      primary:{
        main: '#8c8c8c'
      }
    }
  }
);
