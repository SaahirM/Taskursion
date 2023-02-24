class Main extends React.Component {
  render() {
    return <h1>Test</h1>;
  }
}


const domContainer = document.querySelector('#app');
const root = ReactDOM.createRoot(domContainer);
root.render(<Main/>);