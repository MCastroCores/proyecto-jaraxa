import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

// Recursos de material UI para la página
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import CachedIcon from "@mui/icons-material/Cached";
import { ListItemText, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    background: {
      paper: "#0C1B33",
    },
    text: {
      primary: "#fff",
      secondary: "#46505A",
    },
  },
});

export const HomePage = () => {
  // Estados para guardar la medicina a buscar y la información obtenida tras la búsqueda
  const [query, setQuery] = useState("");
  const [dataDrugCounter, setDataDrugCounter] = useState(null);

  // String con la URL para la petición, cambiando en función de la query buscada
  const URL = `https://api.fda.gov/drug/drugsfda.json?search=${query}&count=openfda.generic_name.exact&limit=500`;

  useEffect(() => {
    const getResultsByGroup = async () => {
      try {
        const response = await fetch(URL);
        const dataAPI = await response.json();
        setDataDrugCounter(dataAPI);
      } catch (error) {
        console.log(error);
      }
    };

    getResultsByGroup();
  }, [query, URL]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "background.paper",
          color: "text.primary",
          minHeight: "100vh",
        }}
      >
        <Typography sx={{ width: 300 }} variant="h4" component="h1" padding={3}>
          PROYECT JARAXA
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            sx={{ borderColor: "text.primary" }}
            id="outlined"
            label="Search a drug..."
            autoFocus={true}
            onChange={(e) => {
              setQuery(e.target.value.toUpperCase());
            }}
          />
        </Box>
        {dataDrugCounter ? (
          <Box sx={{ width: "75%" }}>
            <List sx={{ display: "flex", flexDirection: "column" }}>
              {dataDrugCounter?.results ? (
                dataDrugCounter.results.map((drug, index) => (
                  <Link
                    key={index}
                    className="linkDefault"
                    to={`${drug.term}`}
                    color="inherit"
                    underline="none"
                  >
                    <ListItemButton
                      sx={{
                        border: 1.5,
                        gap: 0.5,
                        marginY: 0.5,
                        borderRadius: "6px",
                        borderColor: "text.primary",
                      }}
                    >
                      <ListItemIcon sx={{ color: "text.primary" }}>
                        <VaccinesIcon />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ textDecoration: "none", color: "text.primary" }}
                        primary={drug.term}
                        secondary={`${drug.count} products`}
                      />
                    </ListItemButton>
                  </Link>
                ))
              ) : (
                <Box sx={{ color: "red", typography: "body1", padding: 5 }}>
                  No matches found
                </Box>
              )}
            </List>
          </Box>
        ) : (
          <Box sx={{ color: "text.primary", padding: 10 }}>
            <CachedIcon />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};
