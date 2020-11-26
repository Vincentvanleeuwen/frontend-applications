# frontend-applications

## What does this project do?

The newspaper "De Volkskrant" asked us to look at data from the RDW and create a concept that will be interesting enough for a data journalist to write an article about.
I've come up with an interesting research question about the RDW data.

*"How many charging points do parking garages have in comparison to parking spots in different towns and cities in The Netherlands?"*

My expectations for this research question are that there'll be much fewer charging points than parking spots. 
For a more detailed overview, check [Research Questions](https://github.com/Vincentvanleeuwen/functional-programming/wiki/The-Research-of-the-Data)

## Which Features?

I've implemented interactivity by giving the user the possibility to change the axis. On the Y-axis you can change from cities to towns. On the X-axis you can change from parking spots to charging points.
There are also tooltips when you hover over each lollipop. Here you can see the exact amount of parking spots/charging points per city/town

### Volkskrant

- Fetch all data
- Convert data to JSON
- Map data, delete unnecesarry columns.
- Merge two datasets based on AreaId using Reduce
- Filter empty entries

## Which Data am I using?

To find out how many charging points there are in Amsterdam I'm using RDW's dataset: [Specifications Parking Area](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s)

Needed columns:
- AreaId
- chargingPointCapacity
- capacity

However this data set does not tell us where each charging point is located.
To find out where these charging points are I'm using RDW's dataset: [GEO PARKEER GARAGES](https://opendata.rdw.nl/Parkeren/GEO-Parkeer-Garages/t5pc-eb34)

Needed columns:
- AreaID
- AreaDesc

In these two data sets I can compare the AreaID row, so I can find out where each charging point is located.
The AreaDesc shows the name of the parking area and the city.

## Packages used
- D3@6.2.0
- Vue.js@3.0.0
- Vue Router@4.0.0
- AOS@3.0.0

## Installation Guide

Navigate to the desired directory in your terminal. Once you've reached the directory, place the following code in your terminal.

```terminal
  > git clone https://github.com/Vincentvanleeuwen/frontend-applications.git
  
  > cd frontend-applications
  
  // Watch for changes
  > npm run serve
  // Build the app and minify project for production
  > npm run build
  // Run the linter
  > npm run lint
  
```

You can now preview the datastory at localhost:8080/

## Live Preview

//

## Sources

People that helped: 
- Jonah Meijers (Reduce, Tuples, find)
- Robert Spier (Windows/Git problems & Map)

https://www.d3-graph-gallery.com/graph/lollipop_horizontal.html

License: [MIT]
