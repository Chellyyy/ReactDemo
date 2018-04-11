import React from 'react';
import ReactDOM from 'react-dom';
//import {Router,Route} from 'react-router';
import { Button } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom'
import PCIndex from './components/pc_index';
import PCNewsDetails from './components/pc_news_details';
import PCNewsClass from './components/pc_news_class';
import MobileNewsDetails from './components/mobile_news_details';
import MobileIndex from './components/mobile_index';
import PCUserCenter from './components/pc_usercenter';
import MobileUserCenter from './components/mobile_usercenter';
import MediaQuery from 'react-responsive';

export default class Root extends React.Component {

	render() {
		return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <Router>
            <div>
              <Route exact path="/" exact component={PCIndex}></Route>
              <Route exact path="/details/:uniquekey" component={PCNewsDetails}></Route>
              <Route exact path="/class/:type/:count" component={PCNewsClass}></Route>
              <Route exact path="/usercenter" component={PCUserCenter}></Route>
            </div>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
        <Router>
          <div>
            <Route exact path="/" exact component={MobileIndex}></Route>
            <Route exact path="/details/:uniquekey" component={MobileNewsDetails}></Route>
            <Route exact path="/usercenter" component={MobileUserCenter}></Route>
          </div>
        </Router>
        </MediaQuery>
      </div>
		);
	};
}

ReactDOM.render(<Root />, document.getElementById('mainContainer'));
