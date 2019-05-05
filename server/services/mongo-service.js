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
const URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const DATABASE = process.env.MONGODB_DB || 'nilu-cache';

export const cacheData = (data, coll, idField) => {
    const transformed = transformToMongo(data, idField);
    MongoClient.connect(URL, {useNewUrlParser: true}, (err, client) => {
        if (err) {
            throw err;
        }
        const db = client.db(DATABASE);
        const collection = db.collection(coll);
        performBulkUpdate(collection, transformed, idField);
        client.close();
    });
};

const transformToMongo = (data, idField) => {
    return data.map(o => ({'_id': o[idField], ...o}));
};

const performBulkUpdate = (collection, data, idField) => {
    let bulk = collection.initializeUnorderedBulkOp();
    data.forEach(o => {
        bulk.find({_id: o[idField]}).upsert().update({$set: {o}});
    });
    bulk.execute();
};
