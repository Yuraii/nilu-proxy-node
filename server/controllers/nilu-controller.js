import {lookupAreas, lookupStations, lookupComponents, lookupAqis} from '../services/nilu-service';
import {
    COLLECTION_AREAS,
    COLLECTION_STATIONS,
    COLLECTION_COMPONENTS,
    COLLECTION_AQIS,
    ID_AREAS,
    ID_STATIONS,
    ID_COMPONENTS,
    ID_AQIS,
    retrieveFromCache,
    cacheData
} from '../services/mongo-service';
import Brakes from 'brakes';

const CIRCUIT_BREAKER_TIMEOUT = process.env.CIRCUIT_BREAKER_TIMEOUT;

export const fetchAreas = async () => {
    const brake = new Brakes(lookupAreas, {timeout: CIRCUIT_BREAKER_TIMEOUT});
    brake.fallback(() => retrieveFromCache(COLLECTION_AREAS));
    return brake.exec()
        .then((result) => handleSuccess(result, COLLECTION_AREAS, ID_AREAS))
        .catch((err) => {
            throw err;
        });
};

export const fetchStations = async (qs) => {
    const brake = new Brakes(lookupStations, {timeout: CIRCUIT_BREAKER_TIMEOUT});
    brake.fallback(() => retrieveFromCache(COLLECTION_STATIONS, qs));
    return brake.exec(qs)
        .then((result) => handleSuccess(result, COLLECTION_STATIONS, ID_STATIONS))
        .catch((err) => {
            throw err;
        });
};

export const fetchComponents = async () => {
    const brake = new Brakes(lookupComponents, {timeout: CIRCUIT_BREAKER_TIMEOUT});
    brake.fallback(() => retrieveFromCache(COLLECTION_COMPONENTS));
    return brake.exec()
        .then((result) => handleSuccess(result, COLLECTION_COMPONENTS, ID_COMPONENTS))
        .catch((err) => {
            throw err;
        });
};

export const fetchAqis = async (qs) => {
    const brake = new Brakes(lookupAqis, {timeout: CIRCUIT_BREAKER_TIMEOUT});
    brake.fallback(() => retrieveFromCache(COLLECTION_AQIS, qs));
    return brake.exec(qs)
        .then((result) => handleSuccess(result, COLLECTION_AQIS, ID_AQIS))
        .catch((err) => {
            throw err;
        });
};

const handleSuccess = (result, collection, id) => {
    if (result.body) {
        cacheData(result.body, collection, id);
    }
    return result.body ? result.body : result;
};

