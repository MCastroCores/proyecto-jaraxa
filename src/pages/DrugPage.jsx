import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Grid,
  ListItemButton,
  ListItemText,
  Typography,
  createTheme,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { useEffect, useState } from "react";
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

export const DrugPage = () => {
  // Extraemos de los params el nombre para realizar otra petición a la API con el producto deseado
  let { drugGenericName } = useParams();
  console.log(drugGenericName);

  if (drugGenericName.includes(" ")) {
    drugGenericName = drugGenericName.replace(/ /g, "+");
  }
  console.log(drugGenericName);
  // Estado para guardar la nueva data
  const [dataDrug, setDataDrug] = useState(null);

  // Establecemos la URL para la petición a la API
  const URL = `https://api.fda.gov/drug/drugsfda.json?search=openfda.generic_name.exact:"${drugGenericName}"&limit=500`;
  console.log(URL);

  useEffect(() => {
    const getResultsEspecific = async () => {
      try {
        const response = await fetch(URL);
        const dataAPI = await response.json();
        setDataDrug(dataAPI);
      } catch (error) {
        console.log(error);
      }
    };

    getResultsEspecific();
  }, []);

  console.log(dataDrug);

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
        {dataDrug?.results ? (
          <Grid container spacing={2}>
            {dataDrug.results.map((drug, index) => (
              <Grid item xs={12} md={6} xl={4} key={index}>
                <Card sx={{ minWidth: 300, borderColor: "text.primary" }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 28 }}
                      color="text.primary"
                      gutterBottom
                    >
                      {drug.openfda.generic_name}
                    </Typography>
                    {drug.products?.map((product, index) => (
                      <ListItemButton key={index} variant="h5" component="div">
                        <ListItemText>{product.brand_name}</ListItemText>
                        <ListItemText>{product.dossage_form}</ListItemText>
                        <ListItemText>{product.route}</ListItemText>
                      </ListItemButton>
                    ))}
                    <Typography variant="h5" component="div">
                      {drug.sponsor_name}
                    </Typography>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontSize: 12 }}
                    >
                      {drug.application_number}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ color: "text.primary", padding: 10 }}>
            <CachedIcon />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};
