const settings = require('./config/settings');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/MainAPI');
const path = require('path');
const port = settings.PORT || 5000;

require('./auth/Auth');

mongoose.connect(settings.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', error => console.log(error));
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

app.set('trust proxy', true);
app.use(bodyParser.json())
app.use(cors());
app.use('/api', routes);

app.get(/.*.(js|css|jpg|png|svg|gif)$/, async (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', req.path.replace('/', '')))
})

app.get('*', async (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(port, () => console.log(`App on ${port}`));