import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

function triggerTransition() {
  // reset the width to 200
  d3.select('#rect').attr('width', 200);

  // This code demonstrates D3's transition system:
  // 1. First, we instantly reset the rectangle's width to 200px using .attr()
  // 2. Then we select the same rectangle and create a transition using .transition()
  // 3. The .duration(2000) sets how long the animation takes (2000ms = 2 seconds)
  // 4. Finally, .attr('width', '500') tells D3 the end state we want
  // D3 will automatically animate (tween) the width from 200px to 400px over 2 seconds
  // This creates a smooth animation rather than an abrupt change
  d3.select('#rect').transition().duration(2000).attr('width', '500');
}

// Add click handler to replay button
d3.select('#replayButton').on('click', triggerTransition);
