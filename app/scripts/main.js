import React from 'react';
import Router from 'react-router';
import routes from './routes';

// var injectTapEventPlugin = require("react-tap-event-plugin");
// injectTapEventPlugin();

Router.run(routes, Handler => React.render(<Handler />, document.body));