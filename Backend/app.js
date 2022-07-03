const express = require('express');
const cors = require('cors');
require('./models/dbConnect');
const userRoute = require('./routers/userRoute')
const lessonRoute = require('./routers/lessonRoute');
const testRoute = require('./routers/testRoute');
const notesRoute = require('./routers/notesRoute');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('<h1>HELLO WORLD</h1>');
});

app.use('/user',userRoute);
app.use('/lesson',lessonRoute);
app.use('/test',testRoute);
app.use('/note',notesRoute)
const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=>console.log(`Server ${PORT} de calisiyor...`));