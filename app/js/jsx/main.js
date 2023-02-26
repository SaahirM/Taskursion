import Navbar from "./navbar.js";

class Main extends React.Component {
  render() {
    let app = 
        (<div>
            <Navbar />
            <h1 className="text-center">Test</h1>
        </div>);
    return app;
  }
};

const domContainer = document.querySelector('#app');
const root = ReactDOM.createRoot(domContainer);
root.render(<Main/>);