import React, { useRef, useEffect } from "react";

const Map = ({ address }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          const center = results[0].geometry.location;
          const map = new window.google.maps.Map(mapRef.current, {
            zoom: 18,
            center: center,
          });

          new window.google.maps.Marker({
            position: center,
            map: map,
          });
        } else {
          console.error(`Geocode was not successful: ${status}`);
        }
      });
    };

    if (window.google && window.google.maps) {
      initMap();
    }
  }, [address]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default Map;
