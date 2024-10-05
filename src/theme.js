import { createTheme } from "@mui/material/styles";

const yesevaFont = "Yeseva One, sans-serif";
const montserratFont = "Montserrat, sans-serif";

// Function to create a theme based on the mode
const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#3670ff", // Blue
        light: "#4FC3F7", // Light Blue
        dark: "#003865", // Dark Blue
        contrastText: "#c4deff",
      },
      secondary: {
        main: "#ebebeb", // Light grey
        light: "#FFD700",
        dark: "#8c8a88",
        contrastText: "#FFFFFF", // White text on secondary color
      },
      light: {
        main: "#F5F3EF", // Main light background color (white background color)
        light: "#FFFFFF",
        dark: "#EDE7E0",
      },
      dark: {
        main: "#18100e", // Main dark background color
        light: "#0b0706",
        dark: "#00000",
      },
      error: {
        main: "#f44336", // Red for errors
        light: "#e57373",
        dark: "#d32f2f",
      },
      warning: {
        main: "#ff9800", // Orange for warnings
        light: "#ffb74d",
        dark: "#f57c00",
      },
      info: {
        main: mode === "light" ? "#2196f3" : "#BBDEFB", // Light blue for information in light mode, softer in dark mode
        light: "#64b5f6",
        dark: "#1976d2",
      },
      success: {
        main: "#4caf50", // Green for successes
        light: "#81c784",
        dark: "#388e3c",
      },
    },
    typography: {
      fontFamily: montserratFont,
      h1: { fontFamily: yesevaFont },
      h2: { fontFamily: yesevaFont },
      h3: { fontFamily: yesevaFont },
      h4: { fontFamily: yesevaFont },
      h5: { fontFamily: yesevaFont },
      h6: { fontFamily: yesevaFont },
      subtitle1: { fontFamily: yesevaFont },
      button: { fontFamily: montserratFont },
    },
    components: {
      MuiPaper: {
        defaultProps: {
          elevation: 2,
        },
        styleOverrides: {
          root: {
            backgroundColor: "#ffcdaa", // Light grey background
            "&.table-paper": {
              boxShadow: "none",
              borderRadius: 0,
            },
          },
          rounded: {
            borderRadius: "20px",
          },
          outlined: {
            borderColor: "#bdbdbd", // Light grey border
          },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            border: "1px solid #444",
            borderRadius: "4px",
            background: "linear-gradient(45deg, #434343 0%, #000 100%)",
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            color: "#FFFFFF",
            backgroundColor: "transparent",
            border: "1px solid #FFD700",
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: "#ebebeb",
              color: "#FFFFFF",
            },
            "&:hover": {
              backgroundColor: "#FFD700",
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
        styleOverrides: {
          contained: {
            background: "#3670ff",
            color: "#F5F3EF",
            fontWeight: "bold",
            borderRadius: "8px",
            "&:hover": {
              background: "#2654cc",
            },
            "&:focus": {
              background: "#003399",
            },
          },
          outlined: {
            borderColor: "#000",
            color: "#000",
            "&:focus": {
              borderColor: "#ebebeb",
              color: "#ebebeb",
              boxShadow: `0 0 0 1px #ebebeb`,
            },
            "&:hover": {
              borderColor: "#c17d39",
              color: "#ebebeb",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "#f7f3f0",
            padding: "24px",
            borderRadius: "16px",
            height: "100%",
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            backgroundColor: "#333", // Set table background
          },
          head: {
            backgroundColor: "#444", // Set header background
            "& .MuiTableCell-root": {
              color: "#fff", // Header text color
              fontWeight: "bold", // Bold font for headers
            },
          },
          body: {
            "& .MuiTableCell-root": {
              color: "#fff", // Body text color
              borderColor: "#444", // Border color for cells
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: "#444", // Default border color
            padding: "8px", // Padding for table cells
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "#fff",
          },
        },
      },
    },
  });

export default getTheme;
