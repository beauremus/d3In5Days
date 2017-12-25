const margin = {
  top: 10,
  right: 10,
  bottom: 20,
  left: 50
}
const width = 600 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

const data = [{
    name: 'Alice',
    math: 93,
    science: 84
  },
  {
    name: 'Bobby',
    math: 81,
    science: 97
  },
  {
    name: 'Carol',
    math: 74,
    science: 88
  },
  {
    name: 'David',
    math: 64,
    science: 76
  },
  {
    name: 'Emily',
    math: 80,
    science: 94
  }
]

const xScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, width])

const yScale = d3.scaleBand()
  .domain(data.map((d) => d.name))
  .range([0, height])

const svg = d3.select('#chart')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .style('position', 'absolute')
  .style('top', 0)
  .style('left', 0)

function render(subject) {
  const bars = d3.select('#chart')
    .selectAll('div')
    .data(data, (d) => d.name)

  const newBars = bars.enter()
    .append('div')
    .attr('class', 'bar')
    .style('width', 0)
    .style('height', () => `${yScale.bandwidth() - 2}px`)

  newBars.merge(bars)
    .transition()
    .style('width', (d) => `${xScale(d[subject])}px`)
}

render('math')

const axisContainer = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

axisContainer.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale))

axisContainer.append('g')
  .call(d3.axisLeft(yScale))