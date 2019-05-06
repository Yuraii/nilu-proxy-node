import rp from 'request-promise';

const root = process.env.NILU_API_ROOT;

export const lookupAreas = async () => {
    return rp({uri: `${root}/lookup/areas`, json: true});
};

export const lookupStations = async ({area, utd}) => {
    return rp({
        uri: `${root}/lookup/stations`,
        qs: {
            area,
            utd
        },
        json: true
    });
};

export const lookupComponents = async () => {
    return rp({uri: `${root}/lookup/components`, json: true});
};

export const lookupAqis = async ({component, culture}) => {
    return rp({
        uri: `${root}/lookup/aqis`,
        qs: {
            component,
            culture
        },
        json: true
    });
};
