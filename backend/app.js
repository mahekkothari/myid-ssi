require('dotenv').config();
const express = require('express');
const app = express();
const identityRoutes = require('./routes/identity');

app.use(express.json());
app.use('/api', identityRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
