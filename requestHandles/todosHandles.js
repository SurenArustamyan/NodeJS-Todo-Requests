import { getTodosFromDB, deleteTodoToDB, postMethod, putMethod } from "../helpers.js";

export async function todosHandles(req, res) {
  if (req.url === "" || req.url === "/") {
    if (req.method === "GET") {
      const todos = await getTodosFromDB();
      res.end(JSON.stringify(todos));
    } else if (req.method === "POST") {
      try {
        const myPostMethod = await (postMethod(req))
        res.end(JSON.stringify(myPostMethod))
      } catch (err) {
        throw err;
      }
    } 
    }else if (req.url.startsWith('/')) {
      const todos = await getTodosFromDB();
        const userId = req.url.slice(1);
          if(req.method === "DELETE"){
              const user = todos.filter((item) => item.id !== +userId);
              deleteTodoToDB(user).then((data) => res.end(data))
          }else if(req.method === 'GET'){
              const user = todos.find((item) => item.id === +userId)
              res.end(JSON.stringify(user))
          }else if(req.method === 'PUT'){
            const myPutMethod = await putMethod(req,userId)
            res.end(JSON.stringify(myPutMethod))
          }
  }
}
