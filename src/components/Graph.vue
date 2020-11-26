<template>
  <form id="form">
    <fieldset>
      <input id="parking" type="radio" name="column" value="Aantal parkeerplaatsen" checked>
      <input id="charging" type="radio" name="column" value="Aantal oplaadpunten">
      <legend>Legenda</legend>
      <label for="parking">
      </label>
      <label for="charging">
      </label>
    </fieldset>

    <fieldset>
      <input id="towns" type="radio" name="type" value="Dorpen">
      <input id="cities" type="radio" name="type" value="Steden" checked>
      <label for="cities">
        Steden
      </label>
      <label for="towns">
        Dorpen
      </label>
    </fieldset>
  </form>
  <svg id="d3-chart"></svg>

<!--  DOM needs to see an update in order for the graph to update-->
  <div style="display:none;">
    {{ currentColumn }}
    {{ currentType }}
  </div>

</template>

<script>

import { getPlaces } from '@/helpers/getPlaces'
import {
  select,
  max,
  scaleLinear,
  scaleBand,
  axisBottom,
  axisLeft
} from 'd3'

// Default d3 values
const margin = {top: 30, right: 60, bottom: 80, left: 120},
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom

const x = scaleLinear().rangeRound([0, width]).nice()
const y =  scaleBand().rangeRound([ 0, height])

export default {
  name: 'Graph',
  props: {
    cleanedData: {
      type: Array
    }
  },
  data() {
    return {
      currentColumn: 'capacity',
      currentType: 'city'
    }
  },
  mounted() {
    // Create the graph container
    select('#d3-chart').attr(`viewBox`, `0, 0, ${(width + margin.left + margin.right)}, ${(height + margin.top +
        margin.bottom)}`)
        .append('g')
        .attr('transform', `translate( ${margin.left} , ${margin.top} )`)
        .classed('graph-content', true)

    // First init of graph
    this.initiateData()

    // Eventlistener for column change
    select('body').selectAll((`input[name='column']`)).on('change', (e) => {
      e.preventDefault();
      e.currentTarget.value === 'Aantal oplaadpunten' ?
          this.currentColumn = 'chargingPointCapacity' :
          this.currentColumn = 'capacity'
    });

    // Eventlistener for type change
    select('body').selectAll((`input[name='type']`)).on('change', (e) => {
      e.preventDefault();
      e.currentTarget.value === 'Dorpen' ?
          this.currentType = 'town' :
          this.currentType = 'city'
    });
  },
  // Run this code after the component has updated.
  updated() {
    // Update axis data & lollipop data
    this.xAxis()
    this.yAxis()

    this.updatePops()

    // Select axis elements
    const yAxisElement = select('.graph-content').select('#y-axis');
    const xAxisElement = select('.graph-content').select('#x-axis');

    // Update Axis
    yAxisElement
      .transition()
      .duration(500)
      .call(axisLeft(y))

    xAxisElement
      .transition()
      .duration(500)
      .call(axisBottom(x))
      .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-35)')
        .style('text-anchor', 'end')

    select('.type').text(this.currentType === 'city' ? 'Steden' : "Dorpen");
    select('.column').text(`Aantal ${this.currentColumn === 'capacity' ? 'parkeerplaatsen' : 'oplaadpunten'}`);

    select('.graph-content')
      .selectAll('.lollistick')
      .attr('stroke', this.newColor());

    select('.graph-content')
      .selectAll('.lollipop')
        .attr('fill', this.newColor())
        .attr('stroke', this.newColor())
        .attr('opacity', 0.9);

  },
  methods: {
    // Initiate first visualisation of the d3 graph
    initiateData() {
      this.xAxis()
      this.yAxis()
      // Add Values to Axis
      this.addAxisToContainer()
      this.drawPops()
    },
    // Set X Axis data
    xAxis() {
      // Set max number for X Axis
      let xMax = max(this.cleanedData, ( d => d[this.currentColumn]))
      // Add X Axis domain
      x.domain([0, xMax])
    },
    // Set Y Axis data
    yAxis() {
      // Set values for Y Axis
      let yMax = getPlaces(this.cleanedData, this.currentType).map(d => d.location).sort()
      // Add Y Axis domain
      y.domain(yMax)
    },
    // Create both Axis'
    addAxisToContainer() {
      // Add X axis to the graph
      select('.graph-content')
        .append('g').transition()
        .attr('transform', `translate(0, ${height} )`)
        .attr('id', 'x-axis')
        .call(axisBottom(x))
        .selectAll('text')
          .attr('transform', 'translate(-10,0)rotate(-35)')
          .style('text-anchor', 'end');

      // Add Y axis to the graph
      select('.graph-content')
        .append('g').transition()
        .attr('id', 'y-axis')
        .call(axisLeft(y));

      // Add labels to axis
      // source: https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
      select('.graph-content')
        .append('text')
        .attr('transform', `translate(${width / 2}, ${height + 60})`)
        .style('text-anchor', 'middle')
        .attr('class', 'label-text column')
        .text('Aantal parkeerplaatsen');

      // Add Cities label
      select('.graph-content')
        .append('text')
        // .attr('transform', 'rotate(360)')
        .attr('y', 0 - 30 )
        .attr('x', 25)
        .attr('dy', '1em')
        .style("text-anchor", 'middle')
        .attr('class', 'label-text type')
        .text('Steden');

      // Add tooltip to the body instead of the container
      select('#app')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);
    },
    // Draw the lollipops
    drawPops() {
      // Select lolly group element
      const lollipopGroup = select('.graph-content')
                          .selectAll('.lolly')
                          .data(getPlaces(this.cleanedData, this.currentType))
                            .enter().append('g')
                              .attr('class', 'lolly')

      // Update Stick
      lollipopGroup
        .selectAll('.lollistick')
        .data(d => [d])
        .enter()
          .append('line')
            .attr('class', 'lollistick')
            .attr('y1', d => y(d.location) + y.bandwidth() / 2)
            .attr('y2', d => y(d.location) + y.bandwidth() / 2)
            .transition().duration(500)
              .attr('x1', d => x(d[this.currentColumn]))
              .attr('x2', x(0))
              .attr('stroke', this.newColor())
              .attr('opacity', 0.5);

      // Update Pop
      lollipopGroup
        .selectAll('.lollipop')
        .data(d => [d])
        .enter()
          .append('circle')
            .attr('class', 'lollipop')
            .attr('fill', this.newColor())
            .attr('stroke', this.newColor())
            .attr('opacity', 1)
            .attr('cy', d => y(d.location) + y.bandwidth() / 2)
            // Add Event listener on the pop for tooltip
            .on("mouseover", (event, d) => {
              select('.tooltip').transition().duration(200).style('opacity', .9);
              select('.tooltip').html(`${
                  d[this.currentColumn]} ${this.currentColumn === 'capacity' ?
                  'Parkeerplaatsen' :
                  'Oplaadpunten'
              } `)
              .style('left', `${event.pageX}px`)
              .style('top', `${event.pageY - 28}px`);
            })
            .on('mouseout', () => {
              select('.tooltip').transition().duration(500).style('opacity', 0);
            })
            .transition().duration(500)
              .attr('cx', d => x(d[this.currentColumn]))
              .attr('r', 3);
    },
    updatePops() {
      console.log('hello')
      // Update the lollipops
      const lollipopGroup = select('.graph-content')
                          .selectAll('.lolly')
                            .data(getPlaces(this.cleanedData, this.currentType))
                            .join('g')
                              .attr('class','lolly')

      // Update the pop
      lollipopGroup
        .selectAll('.lollipop')
          .data(d => [d]).join('circle')
          .attr('class', 'lollipop')
            .attr('cy', d => y(d.location) + y.bandwidth() / 2)

          // Add tooltip
          .on("mouseover", (event, d) => {

            select('.tooltip').transition().duration(200).style('opacity', .9);

            select('.tooltip').html(`${
                d[this.currentColumn]} ${this.currentColumn === 'capacity' ?
                'Parkeerplaatsen' :
                'Oplaadpunten'
            } `)
            .style('left', `${event.pageX}px`)
            .style('top', `${event.pageY - 28}px`);
          })
          .on('mouseout', () => {
            select('.tooltip').transition().duration(500).style('opacity', 0);

          })
          .transition().duration(500)
            .attr('cx', d => x(d[this.currentColumn]))
            .attr('r', 3);

      //  Update the stick
      lollipopGroup
        .selectAll('.lollistick')
          .data(d => [d])
          .join('line')
            .attr('class', 'lollistick')
            .attr('y1', d => y(d.location) + y.bandwidth() / 2)
            .attr('y2', d => y(d.location) + y.bandwidth() / 2)
            .transition().duration(500)
              .attr('x1', d => x(d[this.currentColumn]))
              .attr('x2', x(0))

    },

    newColor() {
      return this.currentColumn === 'capacity' ? '#5a61ff' : '#ffca68'
    },
  },

}
</script>

<style scoped>
  body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg {
    display: inline-block;
    position: relative;
    width: 600px;
    vertical-align: top;
    overflow: hidden;
    margin: 0 20px 0 0;
  }

  .btn {
    background-color: red;
    padding: .5em 1em;
    color: white;
    border-radius: 3px;
    margin-top: 10px;
    cursor:pointer;
  }

  form {
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    padding: 2em;
  }
  fieldset {
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    padding: 0;
    margin: .5em .5em;
    position: relative;
    border:none;
  }
  fieldset label {
    flex:1;
    font-weight: bold;
    font-size: .8em;
    line-height: 10px;
    color: white;
  }
  label {
    position: relative;
    height: 3em;
    width:5em;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    background-color: #222020;
    line-height: 39px!important;
  }
  input[type="radio"] {
    position: absolute;
    top:0;
    right:0;
    opacity: 0;
  }
  label[for="charging"]:before, label[for="parking"]:before {
    content: "";
    position: absolute;
    left: 37%;
    top: 0;
    bottom: 0;
    width: 20px;
    background-repeat: no-repeat;
    background-size: contain;
  }
  label[for="parking"]:before {
    top: 6px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20.29' height='30' viewBox='0 0 20.29 30'%3E%3Cpath id='Path_1' data-name='Path 1' d='M26.583-85.263A7.481,7.481,0,0,0,25.3-89.848,4.463,4.463,0,0,0,21.48-91.57q-.83,0-1.535.062t-1.162.145V-80.2a5.372,5.372,0,0,0,1.515.622,7.3,7.3,0,0,0,1.888.249Q26.583-79.33,26.583-85.263Zm6.307-.166a15.992,15.992,0,0,1-.622,4.606,10.364,10.364,0,0,1-1.826,3.568,8.242,8.242,0,0,1-2.988,2.324,9.64,9.64,0,0,1-4.108.83,11.081,11.081,0,0,1-2.407-.249,11.583,11.583,0,0,1-2.158-.705v8.216H12.6V-95.6q.83-.249,1.909-.477t2.261-.394q1.183-.166,2.407-.27t2.344-.1a13.405,13.405,0,0,1,4.813.809A9.892,9.892,0,0,1,29.9-93.749a9.784,9.784,0,0,1,2.22,3.589A13.8,13.8,0,0,1,32.89-85.429Z' transform='translate(-12.6 96.84)' fill='%23fff'/%3E%3C/svg%3E%0A");
  }
  label[for="charging"]:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13.422' height='35' viewBox='0 0 13.422 35'%3E%3Cpath id='Path_2' data-name='Path 2' d='M476.551,314.116l-4.945,18.431,6.445,1.284-.794,15.284,7.771-18.881-7.385-.963Z' transform='translate(-471.606 -314.116)' fill='%23fff'/%3E%3C/svg%3E%0A");
  }
  label:hover{
    opacity: .9;
    transition: .5s;
  }
  input[value="Aantal parkeerplaatsen"]:checked ~ label[for="parking"] {
    border: none;

    background-color: #5a61ff;
  }
  input[value="Aantal oplaadpunten"]:checked ~ label[for="charging"] {
    border: none;
    background-color: #ffca68;
  }
  input[value="Steden"]:checked ~ label[for="cities"] {
    border: none;
    background-color: #5a61ff;
  }
  input[value="Dorpen"]:checked ~ label[for="towns"] {
    border: none;
    background-color: #ffca68;
  }
 legend {
   margin-bottom: 2em;
 }

</style>