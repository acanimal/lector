var React = require('react');
var Locations = require('./components/Locations.jsx');

console.log("Before render App")
React.render(
  <Locations />,
  document.getElementById('ReactApp')
);
