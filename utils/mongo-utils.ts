import clientPromise from "./mongodb"

export type UserType = {
    uid: string
    name: string
    email:string
    photoUrl:string
}

export async function setUser (user: UserType) {
    // connect to client
    // CU operation on database with user obj
    const client = await clientPromise;
    const db = client.db('TMS')
    const col = db.collection<UserType>("UserData")
    const res = col.find({})
}

//const setUser = (user:UserType)=>{}
const getUser = (uid:string):UserType=>{}
const createProject = (name:string):ProjectType=>{}
const addUserToProject = (projectId:string,uid:string):boolean=>{}
const getProjectsForUsera = (uid:string)=>ProjectType[]=>{}