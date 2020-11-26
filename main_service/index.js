const settings = require('./config/settings');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/MainAPI');
var influx = require('./utils/influx');
const path = require('path');
const util = require('./utils/util');
const port = settings.PORT || 5000;
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

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
app.use('/profile_picture', express.static('./profile_picture'))
app.use('/api', routes);

const influxnstart = async () => {
  while (true) {
    try {
      var names = await influx.getDatabaseNames()
      if (!names.includes('visitor_db')) {
        influx.createDatabase('visitor_db');
      }
      break;
    }
    catch (err) {
      await sleep(1000);
    }
  }
  app.listen(port, () => console.log(`App on ${port}`));
}

influxnstart();