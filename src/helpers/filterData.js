// Filter allowed columns from data sets
import { filterAllUndefined } from "@/utils/filterAllUndefined";

// Filter all data sets by these columns
const allowedColumns = [
  'areaid',
  'chargingpointcapacity',
  'areageometryastext',
  'capacity',
  'areadesc'
];

export const filterDataSets = (endPoints) => {

  // Loop through the available data sets
  return endPoints.map(endPoint => {
    // Loop through each entry of the data set
    return endPoint.map(entry => {

      // Loop over each object from an endPoint
      return Object.entries(entry).map(column => {

        // Check if the key doesn't match one of the allowed columns
        if(!allowedColumns.includes(column[0])) {
          delete column[0];
          delete column[1];
        } else {
          return column;
        }
      })
      // Return all entries that are not undefined
      .filter(filterAllUndefined);
    });
  });
};