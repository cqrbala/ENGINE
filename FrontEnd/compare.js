import configdata from './BackEnd/test/data.json'
var file = JSON.parse(JSON.stringify(configdata))

function compareUsers(user1, user2){
    let comp = 0;
    let n = Math.min(user1.Artists.length,user2.Artists.length);
    for(let i of user1.Artists){
        if(i in user2.Artists){
            comp++
        }
    }
    return comp*100/n
}

function getMatches(user){
    let email = user.UserEmail
    let match = new Array()
    for(let User of file.USERS){
        if(User.UserEmail != email){
            comp = compareUsers(User,user)
            match.push({"user":User,"comp":comp})
        }
    }
    match.sort(function(a,b){
        return a.comp - b.comp
    }); match.reverse()
    return [ match[0], match[1], match[2], match[3] ]
}