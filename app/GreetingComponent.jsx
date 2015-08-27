var React = require('react');


module.exports = React.createClass({
  displayName:'GreetingComponent',
  render: function(){
    console.log('Before render App')
    var msg = 'Hello, how are you?';
    return <div>{msg}</div>
  }
})
