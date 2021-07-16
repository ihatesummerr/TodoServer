import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRouter from './routes/todos.js'

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = 'mongodb+srv://admin:M6HdsyaZIUmJlUXZ@todo.grgsi.mongodb.net/Todo?retryWrites=true&w=majority';


const app = express();

app.use('/todos', todoRouter);

app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Server is running</h1>');
});

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    })
    .catch((err) => {
        console.error(err);
    });

mongoose.set('useFindAndModify', false);
