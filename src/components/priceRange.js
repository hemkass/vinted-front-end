import { Range, getTrackBackground } from "react-range";
import React, { useState } from "react";

const PriceRange = ({ setPriceMax, priceMax, setPriceMin, priceMin }) => {
  const [values, setValues] = useState([10, 100]);

  let min = 0;
  let max = 500;

  return (
    <span className="PriceBetween">
      <span style={{ textAlign: "right", paddingRight: "20px" }}>
        prix entre :{" "}
      </span>
      <span>
        <Range
          step={5}
          min={min}
          max={max}
          values={values}
          onChange={(values) => setValues(values)}
          onFinalChange={(value) => {
            setPriceMin(Number(value[0]));
            console.log(priceMin);
            setPriceMax(value[1]);
          }}
          renderTrack={({ props, children }) => (
            <div
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "90%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: values,
                    colors: ["#ccc", " #2cb1ba", "#ccc"],
                    min: min,
                    max: max,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "15px",
                width: "15px",
                borderRadius: "50%",
                border: isDragged ? "" : "1px solid white",
                backgroundColor: "#2cb1ba",
                outline: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-28px",
                  color: "#fff",
                  fontSize: "12px",
                  fontFamily: "Maison Neue",
                  padding: "4px",
                  borderRadius: "4px",
                  backgroundColor: "#2cb1ba",
                }}
              >
                {values[index]}€
              </div>
            </div>
          )}
        />
      </span>
    </span>
  );
};

export default PriceRange;
