import {Router} from 'express';
import bodyParser from 'body-parser';
import {fetchAreas, fetchStations, fetchComponents, fetchAqis} from './controllers/nilu-controller';

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

api.get('/lookup/areas', asyncHandler(fetchAreas));

api.get('/lookup/stations', asyncHandler(fetchStations, (req) => [req.query]));

api.get('/lookup/components', asyncHandler(fetchComponents));

api.get('/lookup/aqis', asyncHandler(fetchAqis, (req) => [req.query]));

export {api};
