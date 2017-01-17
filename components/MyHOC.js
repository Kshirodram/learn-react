import React from 'react';

var MyHOC = ComposedComponent => class extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         data: "from HOC constructor"
      }
   }
   componentDidMount() {
      this.setState({
         data: "from HOC componentDidMount"
      });
   }

   render() {
      return <ComposedComponent {...this.props} {...this.state} />;
   }
};


const MyComponent = (props) => (
   <div>
      <h1>{props.data}</h1>
   </div>
);

export default MyHOC(MyComponent);