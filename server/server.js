const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
const routeIndex = require('./routes/index');

app.use(cors('*'));

// general config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.render('index.ejs');
});

app.use('/api', routeIndex);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});