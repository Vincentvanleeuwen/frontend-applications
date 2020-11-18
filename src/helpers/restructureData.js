const cities = [
  'Alkmaar', 'Almelo', 'Amersfoort',
  'Amsterdam', 'Arnhem', 'Assen',
  'Bergen op Zoom', 'Breda',
  'Deventer', 'Doetinchem', 'Dordrecht',
  'Eindhoven', 'Enschede',
  'Gouda', 'Groningen',
  'Haarlem', 'Harderwijk', 'Helmond',
  'Leeuwarden', 'Leiden',
  'Maastricht', 'Middelburg',
  'Nijmegen',
  'Oldenzaal', 'Oosterhout', 'Oss',
  'Purmerend',
  'Rijssen', 'Roermond', 'Rotterdam',
  'Schiedam', 'Den Bosch', 'Sittard',
  'Sneek', 'Terneuzen', 'Utrecht',
  'Venlo', 'Vlaardingen', 'Vlissingen',
  'Weert', 'Winschoten',
  'Zutphen', 'Zwolle'
];

export const restructureDataSets = (arr) => {

  return arr.reduce((acc, cur) => {

    let location = cur[3][1];
    let capacity = +cur[0][1];
    let chargingPoints = +cur[1][1];

    // Check if location matches another entries' location, return the index
    const itemIndex = acc.findIndex(item => item.location === location);

    // Check if index exists
    if(itemIndex > -1) {

      // Add capacity/chargingpointcapacity to this object
      acc[itemIndex].capacity += capacity;
      acc[itemIndex].chargingPointCapacity += chargingPoints;
    } else {

      // Otherwise create a new entry
      const newItem = {
        location: null,
        capacity: 0,
        chargingPointCapacity: 0,
        type: null
      };

      // Add capacity, chargingPointCapacity, and location to entry
      newItem.location = location;
      newItem.capacity += capacity;
      newItem.chargingPointCapacity += chargingPoints;

      // Set the type of the entry
      if (!newItem.type) {
        // Check if town or city
        if (cities.includes(location)) {
          newItem.type = 'city';
        } else {
          newItem.type = 'town';
        }
      }
      acc.push(newItem);
    }
    return acc;
  }, []);
};
