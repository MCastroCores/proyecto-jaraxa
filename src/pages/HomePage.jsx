import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

// RECURSOS DE MATERIAL UI NECESARIOS PARA LA PÁGINA
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
import { ListItemText } from "@mui/material";

export const HomePage = () => {
  // ESTADOS PARA GUARDAR LA PALABRA A BUSCAR Y LA INFORMACIÓN DE LA API
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);

  const URL = `https://api.fda.gov/drug/drugsfda.json?search=${query}&count=openfda.generic_name.exact&limit=500`;
  // const URLPRUEBA = `https://api.fda.gov/drug/drugsfda.json?search=openfda.generic_name.exact:${query}&limit=500`;

  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await fetch(URL);
        const dataAPI = await response.json();
        setData(dataAPI);
      } catch (error) {
        console.log(error);
      }
    };

    getResults();
  }, [query, URL]);

  console.log(query);
  console.log(data);

  return (
    <>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ width: 250 }} variant="h4" component="h1" padding={3}>
          Proyect Jaraxa
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
            id="outlined"
            label="Search a drug..."
            onChange={(e) => {
              setQuery(e.target.value.toUpperCase());
            }}
          />
        </Box>
        {data ? (
          <Box sx={{ width: "75%" }}>
            <List>
              {data?.results ? (
                data.results.map((drug, index) => (
                  <Link
                    key={index}
                    className="linkDefault"
                    to={`${drug.term}`}
                    color="inherit"
                    underline="none"
                  >
                    <ListItemButton sx={{ border: 1, gap: 1, marginY: 1 }}>
                      <ListItemIcon>
                        <VaccinesIcon />
                      </ListItemIcon>

                      <ListItemText
                        sx={{ textDecoration: "none" }}
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
          <Box sx={{ color: "black", padding: 10 }}>
            <CachedIcon />
          </Box>
        )}
      </Box>
    </>
  );
};
