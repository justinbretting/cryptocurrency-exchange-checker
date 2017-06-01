

import _ from 'lodash';
import express from 'express';
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

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
