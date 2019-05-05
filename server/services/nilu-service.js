import rp from 'request-promise';

const root = 'https://api.nilu.no';

export const lookupAreas = () => {
    return rp({uri: `${root}/lookup/areas`, json: true})
        .then((result) => {
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
            return result;
        })
        .catch((err) => {
            throw err;
        });
};

export const lookupComponents = () => {
    return rp({uri: `${root}/lookup/components`, json: true})
        .then((result) => {
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
            return result;
        })
        .catch((err) => {
            throw err;
        });
};
