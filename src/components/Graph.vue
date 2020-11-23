<template>
  <div id="lolly-container">
    <svg id="d3-chart"></svg>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { getPlaces } from '@/helpers/getPlaces'
import {
  select,
  max,
  scaleLinear,
  scaleBand,
  axisBottom,
  axisLeft
} from 'd3'

const useD3States = () => {
  // Create states
  let state = reactive({
    currentColumn: 'capacity',
    currentType: 'city'
  })
  // make the states reactive
  return toRefs(state)
}

const margin = {top: 20, right: 20, bottom: 60, left: 120},
      width = 460 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom

const x = scaleLinear().rangeRound([0, width]).nice()
const y = scaleBand().rangeRound([ 0, height])

const graphContainer = select('#d3-chart')
                          .attr('width', width + margin.left + margin.right)
                          .attr('height', height + margin.top + margin.bottom)
                          .append('g')
                            .attr('transform', `translate( ${margin.left} , ${margin.top} )`)
                            .classed('graph-content', true)



export default {
  name: 'Graph',
  props: {
    cleanedData: {
      type: Array
    }
  },
  setup(cleanedData) {
    let {
      currentColumn,
      currentType
    } = useD3States()
    console.log(cleanedData);
    return { currentColumn, currentType}
  },
  mounted() {
    console.log(this.cleanedData)
    this.updateData()
  },
  methods: {
    updateData() {
      console.log(this.cleanedData)
      // Set max number for Y and X Axis
      let xMax = max(this.cleanedData, ( d => d[this.currentColumn]))
      let yMax = getPlaces(this.cleanedData, this.currentType).map(d => d.location).sort()

      // Create X Axis
      x.domain([0, xMax])

      // Create Y Axis
      y.domain(yMax)

      // Add Values to Axis
      this.addAxisToContainer()
    },
    addAxisToContainer() {
      // Add X axis to the graph
      console.log(graphContainer);
      graphContainer
        .append('g').transition()
        .attr('transform', `translate(0, ${height} )`)
        .attr('id', 'x-axis')
        .call(axisBottom(x))
        .selectAll('text')
          .attr('transform', 'translate(-10,0)rotate(-35)')
          .style('text-anchor', 'end');

      // Add Y axis to the graph
      graphContainer
        .append('g').transition()
        .attr('id', 'y-axis')
        .call(axisLeft(y));

      // Add labels to axis
      // source: https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
      graphContainer
        .append('text')
        .attr('transform', `translate(${width/2}, ${height + margin.top + 30})`)
        .style('text-anchor', 'middle')
        .attr('class', 'label-text column')
        .text('Amount of Parking spots');

      // Add Cities label
      graphContainer
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left + 10)
        .attr('x', 0 - (height / 2 - 20))
        .attr('dy', '1em')
        .style("text-anchor", 'middle')
        .attr('class', 'label-text type')
        .text('Cities');

      // Add tooltip to the body instead of the container
      select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);
    }

  }
}
</script>

<style scoped>
  .tooltip {
    position: absolute;
    text-align: center;
    width: 10em;
    height: 1.5em;
    padding: 2px;
    font: 12px sans-serif;
    background: lightsteelblue;
    border: 0;
    border-radius: 2px;
    color:white;
    font-weight: bold;
    padding-top:.5em;
    pointer-events: none;
  }
  .label-text {
    font-style: italic;
    font-weight: bold;
    font-size: .8em;
    fill: rgba(0, 0, 0, 0.3);
  }
  .title-text {
    font-weight: bold;
    font-size: .5em;
    fill: rgba(0, 0, 0, 1);
  }
</style>