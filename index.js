const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const db = require('./models');

app.use(express.json());

db.sequelize.sync();


const yourModelRoutes = require('./routes/user_model.js');
app.use('/v1', yourModelRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port \${PORT}.`);
});
