import React ,{useState, useEffect} from "react";
import {MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import './App.css';
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
  }, []);
// https://disease.sh/v3/covid-19/countries


  useEffect(() => {
    // this code inside here will run once when the component loads and not again
    // async -> send a request, wait and  do something 

    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
          }));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countries);
      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = 
      countryCode === "worldwide" 
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountry(countryCode);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });
  };


    // console.log("Country Info >>>>>> ", countryInfo)
  
  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange = {onCountryChange} value={country} >
            <MenuItem value = "worldwide">Worldwide</MenuItem>

              {countries.map((country) => (
                  <MenuItem value = {country.value}>{country.name} </MenuItem>
                ))}

            </Select>
          </FormControl>

      </div>


      <div className= "app__stats" >
          <InfoBox title="Covid-19 Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>

          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
      </div>
     




      {/* Map */}
        <div>
          <Map 
            countries = {mapCountries}
            center = {mapCenter}
            zoom = {mapZoom}
          />
        </div>
  </div>


      <Card className="app__right">
          <CardContent>
            {/* Table */}
            <h3>Live CasesBy Country</h3>
            <Table countries= {tableData} />

            {/* Graph*/}
            <h3>WorldWide new Cases</h3>
            <LineGraph />
          </CardContent>

      
      
        </Card>
    </div>
  );
}

export default App;
