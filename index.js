const express = require('express');

const app = express();
const initTracer = require('./tracing').initTracer;

const tracer = initTracer('hello world');

const port = 3000

app.get('/', (req, res) => {
    const span = tracer.startSpan("say-hello");
    res.send('Hello World!')
    span.log({event: "print", value: "hello world"});
    span.finish();
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));