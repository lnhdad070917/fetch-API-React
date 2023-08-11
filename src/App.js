import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const App = () => {
  const [loading, setloading] = useState(true);
  const [Data, setData] = useState(["no data"]);
  useEffect(() => {
    fetch("https://countries.trevorblades.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
            {
            countries {
                code
                name
                native
                currency
                emoji
                capital
                languages {
                  code
                  name
                }
              }
            }
              `,
      }),
    })
      .then((response) => response.json())
      .then((data) => setData(data.data.countries), setloading(false))
      .catch((error) => {
        console.error(error);
        setloading(false);
      });
  }, []);
  if (loading) return <p>Loading...</p>;
  console.log(Data);
  return (
    <div className="App">
      <h2>DATA COUNTRIES</h2>
      <div className="container">
        {Data.map((data, index) => (
          <Card key={index} className="card">
            <CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="text.secondary"
                >
                  {data.emoji}
                </Typography>
                <Typography variant="body2" color="black">
                  <h2>{data.name}</h2>
                  <p>{data.capital}</p>
                  <p>{data.currency}</p>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default App;
