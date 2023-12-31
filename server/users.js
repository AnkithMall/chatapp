
const users = [] ;

const addUser1 = ({id,name,room}) => {
    name = name.trim().toLowerCase() ;
    room = room.trim().toLowerCase() ;

    const existingUser = users.find((user) => user.room === room && user.name === name) ;
    if(existingUser){
        return {error:'username taken'} ;
    }
    const user = {id,name,room} ;
    users.push(user);
    console.log("new user added -> ",users)
    return {user} ;
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id) ;
    if(index !== -1){
        return users.splice(index,1)[0]
    }
}

const getUser = (id) => users.find((user) => user.id === id) ; 

const getUsersInRoom = (room) => users.filter((user) => user.room === room) ; 


module.exports = {addUser1,removeUser,getUser,getUsersInRoom} ;
