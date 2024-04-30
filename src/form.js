import React, { useState } from 'react';
import axios from 'axios';

const countries=[
  'Albania',
'Australia',                'Austria',            'Azerbaijan', 'Bahamas',     'Bahrain',
'Bangladesh',               'Belarus',            'Belgium',    'Botswana',    'Brazil',
'Bulgaria',                 'Burkina Faso',       'Burundi',    'Cameroon',    'Canada',
'Central African Republic', 'Chile',              'Colombia',   'Croatia',     'Netherlands',
'Denmark',                  'Dominican Republic', 'Ecuador',    'Egypt',       'El Salvador',
'Eritrea',                  'Estonia',            'Finland',    'France',      'Germany',
 'Ghana',                   'Greece',             'Guatemala',  'Guinea',      'Guyana',
 'Haiti',                   'Honduras',           'Hungary',    'India',       'Indonesia',
 'Iraq',                    'Ireland',            'Italy',      'Jamaica',     'Japan',
 'Kazakhstan',              'Kenya',              'Latvia',     'Lebanon',     'Lesotho',
 'Libya',                   'Lithuania',          'Madagascar', 'Malawi',      'Malaysia',
 'Mali',                    'Mauritania',         'Mauritius',  'Mexico',      'Montenegro',
'Morocco',                  'Mozambique',         'Namibia',    'Nepal',       'Zambia',
'New Zealand',              'Nicaragua',          'Niger',      'Norway',      'Zimbabwe',
'Pakistan',                 'Papua New Guinea',   'Peru',       'Poland',      'Portugal',
'Qatar',                    'Romania',            'Rwanda',     'Saudi Arabia','Senegal',
'Slovenia',                 'South Africa',       'Spain',      'Sri Lanka',   'Sudan',
'Suriname',                 'Sweden',             'Switzerland','Tajikistan',  'Thailand',
'Tunisia',                  'Turkey',             'Uganda',     'Ukraine',     'United Kingdom',
'Uruguay']

const Items = [
  'Maize', 'Potatoes', 'Rice', 'Sorghum', 'Soybeans', 'Wheat',
     'Sweet potatoes', 'Yams'
]


export default function PredictionForm() {
  const [rainfall, setRainfall]=useState()
  const [pesticides, setPesticides]=useState()
  const [temperature, setTemperature]=useState()
  const [item, setItem]=useState()
  const [area, setArea]=useState('')
  const [prediction, setPrediction]= useState(false)
  const [Yield, setYield]=useState(0)

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  }
  const handleRainfallChange = (event) => {
    setRainfall(event.target.value);
  }
  const handlePesticidesChange = (event) => {
    setPesticides(event.target.value);
  }
  const handleItemChange = (event) => {
    setItem(event.target.value);
  }
  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/CropYieldPredictor', {
          rainfall: rainfall,
          pesticides: pesticides,
          temperature: temperature,
          area: area,
          item: item
        });

        if(response.data){
          const Yield = response.data.Yield;
          setYield(Yield)
          setPrediction(true)
        }
        
        console.log(response);
      }catch(error) {
        console.error('Error:', error);
      }
  };

  const CountryOption=[
    (countries.map((country) => (
        <option key={country} value={country}>{country}</option>
    )))
];

const ItemOptions=[
    (Items.map((item) => (
        <option key={item} value={item}>{item}</option>
    )))
];

  return (
    <div>
      <h1>Crop Yield Predictor</h1>
      <form onSubmit={handleFormSubmit}>

      <label>
        Area:
          <select required name="area" onChange={handleAreaChange}>
            <option key="Area" >Select</option>
           {CountryOption}
          </select>
        </label>

        <br/>

        <label>
          Item:
          <select required name="item" onChange={handleItemChange}>
            <option key='Item' >Select</option>
            {ItemOptions}
          </select>
        </label>

        <br/>

        <label>
        Rainfall:(in mm)
        <input type="text" required name="rainfall" placeholder='in mm' onChange={handleRainfallChange} />
        </label>

        <br/>

        <label>
        Pesticides:(in tonnes)
        <input type="text" required name="pesticides" placeholder='in tonnes' onChange={handlePesticidesChange} />
        </label>

        <br/>

        <label>
         Temperature:(in degree celsius)
         <input type="text" required name="temperature" placeholder='in degree celsius' onChange={handleTemperatureChange} />
       </label>

       <br/>

        <button type="submit">Predict</button>
      </form>
      {prediction && (
        <div>
          <h2>Predicted yield:(hg/ha)</h2>
          <p>{Yield}(hg/ha)</p>
        </div>
      )}
    </div>
  );
};