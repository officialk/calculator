import React, { useState } from "react";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import "./app.css";

const stuff = [
  "1",
  "2",
  "3",
  "+",
  "4",
  "5",
  "6",
  "-",
  "7",
  "8",
  "9",
  "*",
  ".",
  "0",
  "=",
  "/",
];
var dotOk = false;

function App() {
  const [display, setDisplay] = useState("");
  const processDisplay = (e) => {
    var val = e.target.innerText;
    var newDisp = display;

    const sym = ["+", "-", "*", "/"];
    if (val === "=") {
      calculate(display);
      val = "";
    }
    if (["*", "/", "."].indexOf(val) !== -1 && display.length === 0) {
      val = "";
      dotOk = false;
    }
    if (sym.indexOf(val) !== -1) {
      if (sym.indexOf(display.slice(-1)) !== -1) {
        newDisp = display.slice(0, display.length - 1);
      }
      dotOk = true;
      setDisplay(newDisp + val);
    }
    if (val === "." && dotOk === true) {
      dotOk = false;
    } else if (val === "." && dotOk === false) {
      val = "";
    }
    setDisplay(newDisp + val);
  };

  const calculate = (val) => {
    try {
      const ans = eval(val);
      document.getElementById("answer").innerText = ans;
    } catch (e) {
      document.getElementById("answer").innerText = "NaN";
    }
  };

  return (
    <div>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Paper
            elevation={5}
            style={{
              height: "15vh",
            }}
          >
            <Typography variant="h4" align="right" id="display">
              {display}
            </Typography>
            <Typography variant="h4" align="right" id="answer"></Typography>
          </Paper>
        </Grid>

        {stuff.map((e, i) => {
          return (
            <Grid item xs={3} key={i}>
              <Button variant="contained" value={e} onClick={processDisplay}>
                <Typography variant="h4" align="center">
                  {e}
                </Typography>
              </Button>
            </Grid>
          );
        })}
        <Grid item xs={6}>
          <Button
            variant="contained"
            style={{ height: "10vh" }}
            onClick={() => {
              document.getElementById("display").innerText = "";
              document.getElementById("answer").innerText = "";
              setDisplay("");
            }}
          >
            <Typography variant="h4" align="center">
              Clear
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            style={{ height: "10vh" }}
            onClick={() => {
              setDisplay(document.getElementById("answer").innerText);
              document.getElementById("answer").innerText = "";
            }}
          >
            <Typography variant="h4" align="center">
              Carry
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
