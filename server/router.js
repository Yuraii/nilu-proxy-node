import {Router} from 'express';
import bodyParser from 'body-parser';
import {lookupAreas, lookupStations, lookupComponents, lookupAqis} from './services/nilu-service';

const api = Router();

const time = () => (new Date()).toISOString();

// Middleware for handling JSON, Raw, Text and URL encoded form data
api.use(bodyParser.urlencoded({extended: true}));
api.use(bodyParser.json());

const asyncHandler = (promise, qs) => async (req, res, next) => {
    const boundQs = qs ? qs(req, res, next) : [];
    try {
        const result = await promise(...boundQs);
        return res.json(result);
    } catch (error) {
        return res.status(500) && next(error);
    }
};

api.get('/', (req, res) => res.type('json').json({
    content: {
        status: 200,
        api: '/api',
        time: time(),
    }
}));

api.get('/lookup/areas', asyncHandler(lookupAreas));

api.get('/lookup/stations', asyncHandler(lookupStations, (req) => [req.query]));

api.get('/lookup/components', asyncHandler(lookupComponents));

api.get('/lookup/aqis', asyncHandler(lookupAqis, (req) => [req.query]));

export {api};
