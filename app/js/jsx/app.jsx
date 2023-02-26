import Navbar from "./navbar.js";
import Main from "./main.js";

class App extends React.Component {
  render() {
    let app = 
        (<div>
            <Navbar />
            <Main />
        </div>);
    return app;
  }
};

const domContainer = document.querySelector('#app');
const root = ReactDOM.createRoot(domContainer);
root.render(<App/>);