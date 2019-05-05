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

export const retrieveFromCache = (coll) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.MONGODB_URL, {useNewUrlParser: true}, (err, client) => {
            if (err) {
                reject(err);
            }
            const db = client.db(process.env.MONGODB_DB);
            const collection = db.collection(coll);
            return collection.find().toArray((err, result) => {
                if (err) {
                    reject(err);
                }
                client.close();
                resolve(transformFromMongo(result));
            });
        });
    });
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
