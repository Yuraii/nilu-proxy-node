import rp from 'request-promise';
import {cacheData} from './mongo-service';
import {COLLECTION_AREAS, COLLECTION_STATIONS, COLLECTION_COMPONENTS, COLLECTION_AQIS, ID_AREAS, ID_STATIONS, ID_COMPONENTS, ID_AQIS} from './mongo-service';

const root = 'https://api.nilu.no';

export const lookupAreas = () => {
    return rp({uri: `${root}/lookup/areas`, json: true})
        .then((result) => {
            cacheData(result, COLLECTION_AREAS, ID_AREAS);
            return result;
        })
        .catch((err) => {
            throw err;
        });
};

export const lookupStations = ({area, utd}) => {
    return rp({
        uri: `${root}/lookup/stations`,
        qs: {
            area,
            utd
        },
        json: true
    })
        .then((result) => {
            cacheData(result, COLLECTION_STATIONS, ID_STATIONS);
            return result;
        })
        .catch((err) => {
            throw err;
        });
};

export const lookupComponents = () => {
    return rp({uri: `${root}/lookup/components`, json: true})
        .then((result) => {
            cacheData(result, COLLECTION_COMPONENTS, ID_COMPONENTS);
            return result;
        })
        .catch((err) => {
            throw err;
        });
};

export const lookupAqis = ({component, culture}) => {
    return rp({
        uri: `${root}/lookup/aqis`,
        qs: {
            component,
            culture
        },
        json: true
    })
        .then((result) => {
            cacheData(result, COLLECTION_AQIS, ID_AQIS);
            return result;
        })
        .catch((err) => {
            throw err;
        });
};
