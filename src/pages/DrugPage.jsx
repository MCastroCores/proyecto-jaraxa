import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

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
    const getResults = async () => {
      try {
        const response = await fetch(URL);
        const dataAPI = await response.json();
        setDataDrug(dataAPI);
      } catch (error) {
        console.log(error);
      }
    };

    getResults();
  }, []);

  console.log(dataDrug);

  return (
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
      {dataDrug?.results ? (
        <Grid container spacing={2}>
          {dataDrug.results.map((drug) => (
            <Grid item xs={12} md={6} xl={4} key={drug.id}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {drug.openfda.generic_name}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {drug.sponsor_name}
                  </Typography>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>No results</Box>
      )}
    </Box>
  );
};
