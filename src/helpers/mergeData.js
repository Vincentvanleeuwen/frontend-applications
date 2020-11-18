// Merge both data sets into one data set.
import { filterAllUndefined } from "@/utils/filterAllUndefined";

export const mergeDataSets = (endPoints) => {

  const chargingPointData = endPoints[0];
  const locationData = endPoints[1];

  return chargingPointData.reduce((acc, cur) => {

    // Check if there is a match between the two entries
    const match = locationData.find(entry => entry[0][1].includes(cur[0][1]));

    if(match) {

      // Merge entry of chargingPointData with entry of geoLocationData
      let merged = [...cur, ...match];

      // Delete the double entry

      // If entry is areaid delete it.
      if (merged[0][0] === "areaid") {
        delete merged[0];
      }

      let filtered = merged.filter(filterAllUndefined);

      // Push to Accumulator
      acc.push(filtered);
    }

    return acc;
  }, []);
};