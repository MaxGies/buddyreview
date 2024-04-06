import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  base: "0px",
  xs: "320px",
  sm: "375px",
  md: "600px",
  lg: "1240px",
  xl: "1440px",
};
// <Box width={{ xs: "100%", lg: "50%", xl: "25%" }} />;

export const theme = extendTheme({
  colors: {
    primary: {
      100: "#006241",
      200: "#00754a",
      300: "#1e3932",
      400: "#d4e9e2",
    },
    wood: {
      100: "#604025",
      200: "#6d5038",
      300: "#c38d60",
      400: "#c79d69",
    },
    grayScale: {
      100: "#FAFAFA",
      200: "#F5F5F5",
      300: "#EEEEEE",
      400: "#E0E0E0",
      500: "#BDBDBD",
      600: "#9E9E9E",
      700: "#757575",
      800: "#616161",
      900: "#424242",
      1000: "#212121",
    },
    error: {
      100: "#FA4D56",
      200: "#FFF2F3",
    },
    info: { 100: "#4589FF", 200: "#F2F7FF" },
    correct: { 100: "#42BE65", 200: "#F1FAF4" },
    alert: { 100: "#F29900", 200: "#FEF7E0" },
  },
  breakpoints,
});
