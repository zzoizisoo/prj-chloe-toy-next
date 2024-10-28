import {mongoClient} from '../mongodb'

export const getUser = async (email) => {     
    const mongo = await mongoClient;
    const user = mongo.db('prj-chloe-toy-next').collection('users').findOne({email})
    return user || null
}

export const createUser = async (email, password) => { 
    const mongo = await mongoClient;
    const _id = await mongo
			.db("prj-chloe-toy-next")
			.collection("users")
			.insertOne({ email, password });
    return _id
}