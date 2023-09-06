import React, { useEffect, useState } from "react";

import * as d3 from "d3";
import { feature } from "topojson";
import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";
import { FeatureCollection } from "geojson";

const projection = geoNaturalEarth1();
const pathGenerator = geoPath(projection);
const graticule = geoGraticule();

const jsonUrl = 'https://unpkg.com/world-atlas@1.1.4/world/50m.json' // prettier-ignore

//console.log(countries);

const Map = () => {
  const [strokeWidthVar, setstrokeWidthVar] = useState(0.1);
  const [colorvar, setcolorvar] = useState("orange");
  const [opacityVar, setopacityVar] = useState(0.5);
  const [strokeColorVar, setstrokeColorVar] = useState("black");
  const [index, setIndex] = useState(0);
  const [data, setData] = React.useState<FeatureCollection | null>(null);
  React.useEffect(() => {
    d3.json(jsonUrl).then((topology) => {
      const data = feature(topology, topology.objects.countries);
      setData(data);
    });
  }, []);
  // console.log(data);
  ////////////////////////////
  const coralJsonUrl =
    "https://raw.githubusercontent.com/room302studio/wcs-coral-reef/main/public/50Reefs.json";
  const [coralData, setCoralData] = React.useState<FeatureCollection | null>(
    null
  );
  React.useEffect(() => {
    d3.json(coralJsonUrl).then((topology) => {
      const coralData = topology.features;
      console.log(topology);
      setCoralData(coralData);
    });
  }, []);
  //

  console.log(coralData);

  ////////////////////////////

  return (
    data &&
    coralData && (
      <svg width={1500} height={1500}>
        <text
          x={window.innerWidth / 4}
          y={100}
          fontSize={30}
          fontWeight={"bold"}
        >
          50 Coral Reefs Locations
        </text>
        <g transform="translate(200,200)">
          <path
            key={Math.random() * Math.random() + 5}
            d={pathGenerator(graticule())}
            stroke="black"
            fill="none"
            opacity={0.2}
          />
          <path
            key={Math.random() * Math.random() + 4}
            d={pathGenerator(graticule.outline())}
            stroke="black"
            fill="none"
            opacity={0.2}
          />
          {data.features.map((feature, i) => (
            <>
              <path
                key={Math.random() * Math.random() + 2}
                d={pathGenerator(feature) || ""}
                stroke="black"
                fill="lightgreen"
                opacity={0.2}
              />
            </>
          ))}
          ///////////////////////////
          {coralData.map((feature, i) => (
            <>
              <path
                key={Math.random() * Math.random() + 2}
                d={pathGenerator(feature) || ""}
                stroke="black"
                fill="orange"
                opacity={1}
                onMouseOver={() => {
                  setIndex(i);
                  setopacityVar(1);
                  setstrokeWidthVar(1);
                  setcolorvar("red");
                  setstrokeColorVar("green");
                  // setdisplay_text_mouseover(d["state"]);
                }}
                onMouseLeave={() => {
                  setIndex(i);
                  setopacityVar(1);
                  setstrokeWidthVar(1);
                }}
                // strokeOpacity={i == index ? 1 : 0}
                opacity={i == index ? opacityVar : 0.5}
                strokeWidth={i == index ? strokeWidthVar : 0.5}
                fill={i == index ? colorvar : "orange"}
                stroke={i == index ? strokeColorVar : "black"}
              />
              {/* <text
                //style={{ stroke: "black" }}
                key={Math.random() * Math.random() + 3}
                x={pathGenerator.centroid(feature)[0] - 50}
                y={pathGenerator.centroid(feature)[1] - 20}
              >
                {feature.properties?.name}
              </text> */}
              //////////////////////////////
              <g transform="translate(130,-300)">
                <circle
                  key={Math.random() + 10}
                  cx={innerWidth / 2}
                  cy={innerHeight / 6 + i * 15}
                  r={5}
                  fill={"orange"}
                  // fill="steelblue"
                  stroke={"black"}
                  onClick={() => {
                    setIndex(i);
                    setopacityVar(1);
                    setstrokeWidthVar(1);
                  }}
                  onMouseOver={() => {
                    setIndex(i);
                    setopacityVar(1);
                    setstrokeWidthVar(1);
                    // setdisplay_text_mouseover(d["state"]);
                  }}
                  // strokeOpacity={i == index ? 1 : 0}
                  opacity={i == index ? opacityVar : 0.5}
                  strokeWidth={i == index ? strokeWidthVar : 0.5}
                />
                <text
                  key={Math.random() + 11}
                  x={innerWidth / 2}
                  y={innerHeight / 6 + i * 15}
                  textAnchor="right"
                  dx={20}
                  dy={"0.3em"}
                  fill={"black"}
                  // fill="steelblue"
                  stroke={"black"}
                  onClick={() => {
                    setIndex(i);
                    setopacityVar(1);
                    setstrokeWidthVar(1);
                  }}
                  onMouseOver={() => {
                    setIndex(i);
                    setopacityVar(1);
                    setstrokeWidthVar(1);
                    // setdisplay_text_mouseover(d["state"]);
                  }}
                  // strokeOpacity={i == index ? 1 : 0}
                  opacity={i == index ? opacityVar : 0.5}
                  strokeWidth={i == index ? strokeWidthVar : 0.5}
                >
                  {feature.properties?.name}
                </text>
              </g>
            </>
          ))}
          /////////////////////////// /////////////////////////////////
          /////////////////////////////////////
        </g>
      </svg>
    )
  );
};

export default Map;
