import React from 'react'
import ReactWordcloud from 'react-wordcloud'

export default function Visualizer() {

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
        words={data}
        callbacks={{
          onWordClick: e => print(e)
        }} />
    </div>
  );
}