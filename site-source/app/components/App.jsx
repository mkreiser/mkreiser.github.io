import _ from 'lodash';
import React from 'react';
import { renderRoutes } from 'react-router-config';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const reset = (e) => {
      e.target.style.webkitAnimation = 'none';
      setTimeout(() =>  e.target.style.webkitAnimation = '', 0);
    };

    const meteors = document.querySelectorAll('.meteor');
    _.forEach(meteors, (meteor) => {
      meteor.addEventListener('animationend', reset);
    });
  }

  render() {
    return (
      <div className="app-container">
        <div className="page-container">
          <div className="name">Mike Kreiser</div>
          <div className="links-container">
            <a
              className="icon github"
              href="https://github.com/mkreiser"
            ></a>
            <a
              className="icon linkedin"
              href="https://www.linkedin.com/in/mkreiser/"
            ></a>
            <a
              className="icon email"
              href="mailto:mikepkreiser@gmail.com"
            ></a>
          </div>
        </div>
        {
          _.map(_.range(150), (num) => {
            return (<div className="meteor" key={num}></div>);
          })
        }
      </div>
    );
  }
};

export default App;
