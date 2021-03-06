import _ from 'lodash';
import React from 'react';
import { renderRoutes } from 'react-router-config';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const reset = (e) => {
      e.target.className = '';
      setTimeout(() => e.target.className = 'meteor', 0);
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
        <div className='meteor-container'>
          {
            _.map(_.range(150), (num) => {
              return (<span className="meteor" key={num}></span>);
            })
          }
        </div>
      </div>
    );
  }
};

export default App;
