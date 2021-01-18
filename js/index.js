const monsterContainer = document.getElementById('monster-container')
const nextButton = document.getElementById('forward')
const backButton = document.getElementById('back')
const createMonster = document.getElementById('create-monster')
let pageNumber=1

fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`).then(function(resp){
    return resp.json()
}).then(function(json){
    json.forEach(function(monster){
        monsterContainer.innerHTML += `
        <h3>${monster.name}</h3>
        <p>Age: <strong>${monster.age}</strong></p>
        <p><u>Description:</u><br>${monster.description}</p>
        `
        console.log(pageNumber)
    })
})

nextButton.addEventListener('click', function(e){
    pageNumber += 1
    monsterContainer.innerHTML = ""
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`).then(function(resp){
    return resp.json()
}).then(function(json){
    json.forEach(function(monster){
        monsterContainer.innerHTML += `
        <h3>${monster.name}</h3>
        <p>Age: <strong>${monster.age}</strong></p>
        <p><u>Description:</u><br>${monster.description}</p>
        `
        console.log(pageNumber)

    })
})

})

backButton.addEventListener('click', function(){
    if(pageNumber > 1){
    pageNumber -= 1
    monsterContainer.innerHTML = ""
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`).then(function(resp){
    return resp.json()
}).then(function(json){
    json.forEach(function(monster){
        monsterContainer.innerHTML += `
        <h3>${monster.name}</h3>
        <p>Age: <strong>${monster.age}</strong></p>
        <p><u>Description:</u><br>${monster.description}</p>
        `
        console.log(pageNumber)

    })
})
    }
})

createMonster.addEventListener('submit', function(e){
    e.preventDefault()
    let mName= e.target.elements[0].value
    let mAge = e.target.elements[1].value
    let mDescription = e.target.elements[2].value

    fetch('http://localhost:3000/monsters', {
        method: 'Post',
        headers: 
            {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
        body: JSON.stringify({name: mName, age: mAge, description: mDescription})
    }).then(function(resp){
        return resp.json()
    }).then(function(monster){
        monsterContainer.innerHTML += `
        ==========New Monster Just Added================<br>
        <h3>${monster.name}</h3>
        <p>Age: <strong>${monster.age}</strong></p>
        <p><u>Description:</u><br>${monster.description}</p>
        `

    })
})