import fs from 'fs/promises'

export async function getFileData(){
    try{
        const res = await fs.readFile('./db.json','utf-8')
        return JSON.parse(res)
    }catch(err){
        console.error('Directory is empty');
    }
}

export async function getTodosFromDB(){
    const getFile = await getFileData()
    return getFile.todos
}

export async function addTodoToDB(text){
    const data = await getFileData()
    let currentId = data.nextId
    const newData = {...text,"id":currentId}
    data.todos.push(newData)
    return fs.writeFile("db.json",JSON.stringify({...data,"nextId":currentId +=1},undefined,2))
}

export async function deleteTodoToDB(text){
    const data = await getFileData()
    const newData = [...text]
    return fs.writeFile("db.json",JSON.stringify({...data,todos: newData},undefined,2))
}

export async function updateTodoToDB(user){
    let data = await getFileData()
    const newData = {...user}
    const myNewTodos = data.todos.filter((item) => item.id !== +user.id)
    myNewTodos.push(newData)
    data.todos =  [...myNewTodos]
    return fs.writeFile("db.json",JSON.stringify({...data,"nextId":data.nextId},undefined,2))
}

export async function postMethod(req){
    const result = await getFileData()
    return new Promise((resolve) => {
        let data = "";
        req.on("data", (chunk) => data += chunk);
        req.on("end", () => {
        const parsed = JSON.parse(data);
        parsed.id = result.nextId
        resolve(parsed)
        addTodoToDB(parsed).then((data) => req.end(data));
        });
    })
}

export async function putMethod(req,userId){
    return new Promise((resolve) => {
        let data = "";
        req.on("data", (chunk) => data += chunk);
        req.on("end", () => {
        const parsed = JSON.parse(data);
        parsed.id = +userId
        resolve(parsed)
        updateTodoToDB(parsed).then((data) => req.end(data));
        });
    })
}