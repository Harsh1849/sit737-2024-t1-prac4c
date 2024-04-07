const express = require("express");
const res = require("express/lib/response");
const app = express();
const winston = require('winston');

const exclude_error = winston.format(info => info.level === "error" ? false : info);


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.splat(),
                exclude_error()
            ),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "public_html" });
});

app.get("/add", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            logger.error("Parameters are incorrectly defined");
            throw new Error("Parameters are incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');
        const result = n1 + n2;
        res.status(200).json({ statuscocde: 200, data: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ statuscocde: 500, msg: error.toString() })
    }
});

app.get("/sub", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            logger.error("Parameters are incorrectly defined");
            throw new Error("Parameters are incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');
        const result = n1 - n2;
        res.status(200).json({ statuscocde: 200, data: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ statuscocde: 500, msg: error.toString() })
    }
});

app.get("/mul", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            logger.error("Parameters are incorrectly defined");
            throw new Error("Parameters are incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');
        const result = n1 * n2;
        res.status(200).json({ statuscocde: 200, data: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ statuscocde: 500, msg: error.toString() })
    }
});

app.get("/div", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            logger.error("Parameters are incorrectly defined");
            throw new Error("Parameters are incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');
        const result = n1 / n2;
        res.status(200).json({ statuscocde: 200, data: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ statuscocde: 500, msg: error.toString() })
    }
});

app.get("/exp", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            logger.error("Parameters are incorrectly defined");
            throw new Error("Parameters are incorrectly defined");
        }

        logger.info(`Parameters ${n1} and ${n2} received for exponentiation`);
        const result = Math.pow(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

app.get("/sqrt", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        if (isNaN(n1)) {
            logger.error("Number is incorrectly defined");
            throw new Error("Number incorrectly defined");
        }

        logger.info(`Parameter ${n1} received for square root`);
        const result = Math.sqrt(n1);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

app.get("/mod", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            logger.error("Parameters are incorrectly defined");
            throw new Error("Parameters are incorrectly defined");
        }

        logger.info(`Parameters ${n1} and ${n2} received for modulo operation`);
        const result = n1 % n2;
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

var port = process.env.port || 3000;
app.listen(port, () => {
    console.log('App listening to ' + port + ' port.');
})