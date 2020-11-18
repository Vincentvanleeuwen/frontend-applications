import { firstLetterToUpperCase } from "@/utils/firstLetterToUpperCase";

export const correctPlaceNames = (data) => {
  return data.map(entry => {
    return entry.map(column => {
      // console.log('entry=' ,column);

      if (column[0] === 'areadesc') {

        column[0] = 'location';

        // https://stackoverflow.com/questions/6208367/regex-to-match-stuff-between-parentheses
        // trim everything before first and after last parenthesis
        column[1] = column[1].replace(/^[^(]*\(/, "")
        .replace(/\)[^(]*$/, "");
        column[1] = firstLetterToUpperCase(column[1]);
        // console.log(column[1]);
        switch(column[1]) {
          case `'s-Hertogenbosch`:
            column[1] = 'Den Bosch';
            break;
          case 'Almere Buiten':
            column[1] = 'Almere';
            break;
          case 'Almere Stad':
            column[1] = 'Almere';
            break;
          case 'Garage Boschplein':
            column[1] = 'Sneek';
            break;
          case 'Parkeergarage Emmawijk - Dek':
            column[1] = 'Zwolle';
            break;
          case 'Garage Oostwal-Oost':
            column[1] = 'Oss';
            break;
          case 'Ziekenhuis) (Rotterdam':
            column[1] = 'Rotterdam';
            break;
          case 'Heerhugowaard Centrum':
            column[1] = 'Heerhugowaard';
            break;
          case 'Garage Maasburg':
            column[1] = 'Maasburg';
            break;
          case 'Parkeergarage Station':
            delete column[1];
            delete column[0];
            break;
          case 'Carpool Nuenen A270':
            delete column[1];
            delete column[0];
            break;
          default:
          // code block
        }
      }
      return column;
    })
    // Only filter entries that contain a location
  }).filter(entry => entry[3] && entry[3][0]);
};