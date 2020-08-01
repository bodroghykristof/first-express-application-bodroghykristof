import Express from "express";

const app =  Express();
const port = 8000;

app.get('/', (request, response) => {
    console.log('Get');
    response.json('Hello')
})

app.listen(port, () => console.log('Listening to port ' + port));