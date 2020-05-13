import React from 'react'
import ReactWordcloud from 'react-wordcloud'

import { useSelector } from "react-redux";


export default function Visualizer() {

  const wordCloud = useSelector(state => state.analytics.cloudData)

  const clusteredDictionary = []

  const parseClusteredData = () => {
    if(Object.keys(wordCloud).length > 0)
      for (var key in wordCloud) {
        // check if the property/key is defined in the object itself, not in parent
        wordCloud[key].map(title => clusteredDictionary.push({
          "text": title,
          value: 1
        }))
      }
  }

  const dataList = [];

  const clusteredData = {
    "10": 1,
    "15": 1,
    "architecture": 1,
    "attentive": 1,
    "attitude": 1,
    "bad": 1,
    "bed": 1,
    "bet": 1,
    "better": 1,
    "boutique": 1,
    "breakfast": 1,
    "bumpy": 1,
    "chain": 1,
    "charge": 1,
    "cheap": 1
}
  
  const dataStuff = () => {
    if(Object.keys(clusteredData).length > 0)
      for (var key in clusteredData) {
        dataList.push({
          "text": key,
          value: clusteredData[key]
        })
      }
  }
  

  const data = [
    {
      value: 39,
      "text": "These are random",
      "id": 1
    },
    {
      value: 15,
      "text": "Words are mashed",
      "id": 2
    },
    {
      value: 62,
      "text": "Together forming",
      "id": 3
    },
    {
      value: 8,
      "text": "A non complete sentence",
      "id": 4
    },
    {
      value: 19,
      "text": "Bla bla",
      "id": 5
    },
    {
      value: 2,
      "text": "I need a job",
      "id": 6
    },
    {
      value: 5,
      "text": "Helpful",
      "id": 7
    },
    {
      value: 9,
      "text": "Random words",
      "id": 8
    },
    {
      value: 78,
      "text": "A common phrase",
      "id": 9
    },
    {
      value: 52,
      "text": "a LESS common phrase",
      "id": 10
    }
  ]

  let print = (e) => {
    console.log(e.text)
  }

  return (
    <div> 
      <ReactWordcloud 
      options={{
        colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#40e0d0", "#32cd32", "#000000", "#990000"],
        enableTooltip: true,
        deterministic: true,
        fontFamily: "impact",
        fontSizes: [5, 60],
        fontStyle: "normal",
        fontWeight: "normal",
        padding: 1,
        rotations: 1,
        rotationAngles: [0, 90],
        scale: 'log',
        spiral: 'archimedean',
        transitionDuration: 1000,
      }}
        words={dataList}
        callbacks={{
          onWordClick: e => print(e)
        }} />
      {dataStuff()}
    </div>
  );
}