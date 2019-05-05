import mongodb from 'mongodb';

export const COLLECTION_AREAS = 'areas';
export const COLLECTION_STATIONS = 'stations';
export const COLLECTION_COMPONENTS = 'components';
export const COLLECTION_AQIS = 'aqis';
export const ID_AREAS = 'area';
export const ID_STATIONS = 'id';
export const ID_COMPONENTS = 'component';
export const ID_AQIS = 'component';

const MongoClient = mongodb.MongoClient;

export const cacheData = async (data, coll, idField) => {
    const transformed = transformToMongo(data, idField);
    MongoClient.connect(process.env.MONGODB_URL, {useNewUrlParser: true}, (err, client) => {
        if (err) {
            throw err;
        }
        const db = client.db(process.env.MONGODB_DB);
        const collection = db.collection(coll);
        performBulkUpdate(collection, transformed, idField);
        client.close();
    });
};

const performBulkUpdate = (collection, data, idField) => {
    let bulk = collection.initializeUnorderedBulkOp();
    data.forEach(o => {
        bulk.find({_id: o[idField]}).upsert().update({$set: o});
    });
    bulk.execute();
};

export const retrieveFromCache = (coll, qs) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.MONGODB_URL, {useNewUrlParser: true}, (err, client) => {
            if (err) {
                reject(err);
            }
            const db = client.db(process.env.MONGODB_DB);
            const collection = db.collection(coll);
            let filters = {};
            if (qs) {
                filters = createFilters(qs);
            }
            return collection.find(filters).toArray((err, result) => {
                if (err) {
                    reject(err);
                }
                client.close();
                resolve(transformFromMongo(result));
            });
        });
    });
};

const createFilters = ({area, utd, component, culture}) => {
    let filters = {$and: []};
    if (area) {
        filters.$and.push({area});
    }
    if (utd) {
        filters.$and.push({utd});
    }
    if (component) {
        filters.$and.push({component});
    }
    if (culture) {
        filters.$and.push({culture});
    }
    return filters.$and.length > 0 ? filters : {};
};

const transformToMongo = (data, idField) => {
    return data.map(o => ({'_id': o[idField], ...o}));
};

const transformFromMongo = (data) => {
    return data.map(o => {
        delete o['_id'];
        return o;
    });
};
