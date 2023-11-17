"use client";

import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

import { lightTheme, darkTheme } from "./theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import ReactCSSTransitionGroup from "react-transition-group";
import Header from "@/components/Header";
import Landing from "@/components/Landing";
import AuthContextProvider from "./context/page";
import "./theme.css";
const inter = IBM_Plex_Sans({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const switchTheme = () => {
    setIsDark(!isDark);
  };
  return (
    <html lang="en">
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <body className={inter.className}>
            <AuthContextProvider switchTheme={switchTheme}>
              <TransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                { children }
              </TransitionGroup>
            </AuthContextProvider>
          </body>
        </LocalizationProvider>
      </ThemeProvider>
    </html>
  );
}
