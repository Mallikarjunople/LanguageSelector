import fetch from "cross-fetch";
import React,{useState,useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Container } from "@material-ui/core";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
const LanguageSelector = () => {
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  let newlanguage = [];

  useEffect(() => {
    let active = true;
    setLoading(true);
    (async () => {
      let output = [];
      const response = await fetch(
        "https://restcountries.eu/rest/v2/all?fields=languages"
      );
      await sleep(1e3);
      const countries = await response.json();
      if (active) {
        countries.map((item) =>
          item.languages.map((data) => newlanguage.push(data.name))
        );
        output = [...new Set(newlanguage)];
        setOptions(output);
    setLoading(false);
      }
    })();
  }, []);
  return (
    <>
      {loading ? null : (
        <Container
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <Autocomplete
            multiple={true}
            filterSelectedOptions={true}
            id="Lanuguage"
            style={{ width: 300 }}
            value={selected}
            onChange={(event, value) => {
              setSelected(value);
            }}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  label="Language"
                  variant='outlined'
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              </>
            )}
          />
        </Container>
      )}
    </>
  );
};
export default LanguageSelector;
