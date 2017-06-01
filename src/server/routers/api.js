
import express from 'express';

let apiRouter = express.Router();

apiRouter.get('/', function(req, res) {
  res.json({
    message: 'Welcome to the react-redux-express-less-babelify-template api.'
  })
});

export default apiRouter;
