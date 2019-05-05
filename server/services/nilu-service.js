import rp from 'request-promise';
import {cacheData, retrieveFromCache} from './mongo-service';
import {COLLECTION_AREAS, COLLECTION_STATIONS, COLLECTION_COMPONENTS, COLLECTION_AQIS, ID_AREAS, ID_STATIONS, ID_COMPONENTS, ID_AQIS} from './mongo-service';
import Brakes from 'brakes';

const CIRCUIT_BREAKER_TIMEOUT = 500;
const root = process.env.NILU_API_ROOT;

export const lookupAreas = async () => {
    const brake = new Brakes(rp, {timeout: CIRCUIT_BREAKER_TIMEOUT});
    brake.fallback(() => retrieveFromCache(COLLECTION_AREAS));
    return brake.exec({uri: `${root}/lookup/areas`, json: true})
        .then((result) => {
            if (result.body) {
                cacheData(result.body, COLLECTION_AREAS, ID_AREAS);
            }
            return result.body ? result.body : result;
        })
        .catch((err) => {
            throw err;
        });
};

export const lookupStations = async ({area, utd}) => {
    const brake = new Brakes(rp, {timeout: CIRCUIT_BREAKER_TIMEOUT});
    brake.fallback(() => retrieveFromCache(COLLECTION_STATIONS));
    return brake.exec({
        uri: `${root}/lookup/stations`,
        qs: {
            area,
            utd
        },
        json: true
    })
        .then((result) => {
            if (result.body) {
                cacheData(result.body, COLLECTION_STATIONS, ID_STATIONS);
            }
            return result.body ? result.body : result;
        })
        .catch((err) => {
            throw err;
        });
};

export const lookupComponents = async () => {
    const brake = new Brakes(rp, {timeout: CIRCUIT_BREAKER_TIMEOUT});
    brake.fallback(() => retrieveFromCache(COLLECTION_COMPONENTS));
    return brake.exec({uri: `${root}/lookup/components`, json: true})
        .then((result) => {
            if (result.body) {
                cacheData(result.body, COLLECTION_COMPONENTS, ID_COMPONENTS);
            }
            return result.body ? result.body : result;
        })
        .catch((err) => {
            throw err;
        });
};

export const lookupAqis = async ({component, culture}) => {
    const brake = new Brakes(rp, {timeout: CIRCUIT_BREAKER_TIMEOUT});
    brake.fallback(() => retrieveFromCache(COLLECTION_AQIS));
    return brake.exec({
        uri: `${root}/lookup/aqis`,
        qs: {
            component,
            culture
        },
        json: true
    })
        .then((result) => {
            if (result.body) {
                cacheData(result.body, COLLECTION_AQIS, ID_AQIS);
            }
            return result.body ? result.body : result;
        })
        .catch((err) => {
            throw err;
        });
};
