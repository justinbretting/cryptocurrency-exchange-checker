

import _ from 'lodash';
import express from 'express';
import config from '../../resources/config';
import path from 'path';
import apiRouter from './routers/api';

var app = express();

app.get(['/img/*', '/fonts/*'], function(req, res, next) {
  res.header({ 'Cache-Control': 'public, max-age=86400' });
  next();
});

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../../public'), { maxAge: 3600000 }));
app.use('/api', apiRouter);

// route everything else to the front end, which will handle 404s etc
// app.get('*', function(req, res) {
//   var is_production = (config.NODE_ENV === 'production');
//   res.header({ 'Cache-Control': 'public, max-age=3600' });
//   res.render('../views/index.html', _.assign({}, config, {
//     is_production: is_production,
//   }));
// });

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
