const express = require('express')

const {MongoClient} = require("mongodb");

require("dotenv").config({path:"./server/config.env"})

const cors = require('cors');

//global variable
let plainTeams = []

// random game
let randomTeams = []
let randomTeam = 0;

// new game
let match = [];
let matchArray = [];

function yourScore(team){
    // This variable holds the total pool of which a random number can be obtained.
    let total = 0;
    // This variable holds the default probability of which a goal can be scored.
    possibleAmounts=[0,1,2,3,4,5,6,7,8,9,10]
    // This is the number that is randomized.
    let goal = 0;
    // This variable takes the probability of the team scoring obtained from a variable in
    // the get function of the site, and takes a random number from the pool. 
    // It changes the possible amounts tab based on the team scoring variable. 
    switch(team.scoring){
        case 5:
            possibleAmounts[0] = 10;
            possibleAmounts[1] = 20;
            possibleAmounts[2]= 30;
            possibleAmounts[3] = 40;
            possibleAmounts[4] = 40;
            possibleAmounts[5] = 30;
            possibleAmounts[6]= 20;
            possibleAmounts[7]= 5;
            possibleAmounts[8] = 3;
            possibleAmounts[9]= 2;
            possibleAmounts[10] = 1;
            for(let i = 0; i < 10; i++){
                total += possibleAmounts[i]
            }
            goal = Math.random()*total;
            if (goal<=10){
                return 0;
            }else if (goal<=30){
                return 1;
            }else if (goal<=60){
                return 2;
            }else if (goal<=100){
                return 3;
            }else if (goal<=140){
                return 4;
            }else if (goal<=170){
                return 5;
            }else if (goal<=190){
                return 6;
            }else if (goal<=195){
                return 7;
            }else if (goal<=198){
                return 8;
            }else if (goal<=200){
                return 9;
            }else if (goal<=201){
                return 10;
            }
            break;
        case 3:
            possibleAmounts[0] = 30;
            possibleAmounts[1] = 40;
            possibleAmounts[2] = 50;
            possibleAmounts[3] = 30;
            possibleAmounts[4] = 20;
            possibleAmounts[5] = 7;
            possibleAmounts[6] = 5;
            possibleAmounts[7] = 5;
            possibleAmounts[8] = 3;
            possibleAmounts[9] = 2;
            possibleAmounts[10] = 1;
            for(let i = 0; i < 10; i++){
                total += possibleAmounts[i]
            }
            goal = Math.random()*total;
            if (goal<=30){
                return 0;
            }else if (goal<=70){
                return 1;
            }else if (goal<=120){
                return 2;
            }else if (goal<=150){
                return 3;
            }else if (goal<=170){
                return 4;
            }else if (goal<=177){
                return 5;
            }else if (goal<=182){
                return 6;
            }else if (goal<=187){
                return 7;
            }else if (goal<=190){
                return 8;
            }else if (goal<=192){
                return 9;
            }else if (goal<=193){
                return 10;
            }
            break;
            
        case 1:
            possibleAmounts[0] = 45;
            possibleAmounts[1] = 50;
            possibleAmounts[2] = 30;
            possibleAmounts[3] = 20;
            possibleAmounts[4] = 14;
            possibleAmounts[5] = 10;
            possibleAmounts[6] = 8;
            possibleAmounts[7] = 5;
            possibleAmounts[8] = 3;
            possibleAmounts[9] = 2;
            possibleAmounts[10] = 1;
            for(let i = 0; i < 10; i++){
                total += possibleAmounts[i]
            }
            goal = Math.random()*total;
            if (goal<=45){
                return 0;
            }else if (goal<=95){
                return 1;
            }else if (goal<=125){
                return 2;
            }else if (goal<=145){
                return 3;
            }else if (goal<=159){
                return 4;
            }else if (goal<=169){
                return 5;
            }else if (goal<=177){
                return 6;
            }else if (goal<=182){
                return 7;
            }else if (goal<=185){
                return 8;
            }else if (goal<=187){
                return 9;
            }else if (goal<=188){
                return 10;
            }
            break;
        case 0:
            possibleAmounts[0] = 60;
            possibleAmounts[1] = 50;
            possibleAmounts[2] = 40;
            possibleAmounts[3] = 15;
            possibleAmounts[4] = 10;
            possibleAmounts[5] = 5;
            possibleAmounts[6] = 1;
            possibleAmounts[7] = 1;
            possibleAmounts[8] = 1;
            possibleAmounts[9] = 1;
            possibleAmounts[10] = 1;
            for(let i = 0; i < 10; i++){
                total += possibleAmounts[i]
            }
            goal = Math.random()*total;
            if (goal<=60){
                return 0;
            }else if (goal<=110){
                return 1;
            }else if (goal<=150){
                return 2;
            }else if (goal<=165){
                return 3;
            }else if (goal<=175){
                return 4;
            }else if (goal<=180){
                return 5;
            }else if (goal<=181){
                return 6;
            }else if (goal<=182){
                return 7;
            }else if (goal<=183){
                return 8;
            }else if (goal<=184){
                return 9;
            }else if (goal<=185){
                return 10;
            }
            break;
    }
    
}
function scorers(score, team){
    // This holds the players that ares stored within the team parameter
    let squad = []
    // This loop places the player into the squad variable
    for(let i = 0; team.roster.length > i; i++ ){
        squad.push(team.roster[i])    
    }
    let players = []
    //This loop is the calculation of which player scored. It is calculated
    // by obtaining a ranndom number and checking if it falls within certain ranges
    // If it falls in that range it goes to a specific position. And then it adds those players into a player array
    // and randomizes between those players to obtain the goalscorer. THis last step is ignored for positions where only one player is possible
    // Specifically goalkeeper.
    for(let i = 0; score>i;i++){
        let scorer = Math.floor(Math.random()*100-1)
        if(scorer<40){
            let st = []
            for(let k = 0;squad.length>k;k++){
            if(squad[k].position == "ST"){
                st.push(squad[k])
            }}
            let striker = Math.floor(Math.random()*(st.length))
            players.push(st[striker])
        }
        else if(scorer < 61){
                let positions = []
            
            for(let k = 0;squad.length>k;k++){
                if (squad[k].position == "LW"||squad[k].position == "RW"||squad[k].position == "CAM"){
                positions.push(squad[k])
            }}
            if(positions.length == 0){
                i--;
                break;
            }
            let player = Math.floor(Math.random()*(positions.length))
            players.push(positions[player])
        }
        else if(scorer < 79){
            let mids = [];
            for(let k = 0;squad.length>k;k++){
                if(squad[k].position == "CM"||squad[k].position == "LM"||squad[k].position == "RM"){
                    mids.push(squad[k])
            }}
            if(mids.length == 0){
                i--
                break;
            }
            let midfielder = Math.floor(Math.random()*(mids.length))
            players.push(mids[midfielder])
        }
        else if (scorer < 88){
            let dm = [];
            for(let k = 0;squad.length>k;k++){
                if(squad[k].position == "CDM"){
                    dm.push(squad[k])
            }}
            if(dm.length == 0){
                i--
                break
            }
            let defMid = Math.floor(Math.random()*(dm.length-1))
            players.push(dm[defMid])
        }
        else if (scorer < 95){
            let fb = [];
            
            for(let k = 0;squad.length>k;k++){
                if(squad[k].position == "LB"|| squad[k].position=="RB"){
                    fb.push(squad[k])
            }}
            let fullback = Math.floor(Math.random()*(fb.length))
            players.push(fb[fullback])
        }
        else if (scorer < 99){
            let cb = []
            for(let k = 0;squad.length>k;k++){
                if(squad[k].position == "CB"){
                cb.push(squad[k])
            }}
            let centerBack = Math.floor(Math.random()*(cb.length-1))
            players.push(cb[centerBack])
        }
        else{
            
            for(let k = 0;squad.length>k;k++){
                if(squad[k].position=="GK"){
                    players.push(squad[k])
            }}
       }
        
        
    }
    return players;
}
function goaltimes(scorers){
    // This function randomizes and pushes different goal times for the amount of scorers found in the parameter
    // It returns the array holding the integer values.
    let times = [];
    for(let i = 0; scorers.length>i;i++){
        let time = Math.floor(Math.random()*90)
        times.push(time);
    }
    return times;
}
function poss(team1, team2){
    let rating1 = team1.rating;
    let rating2 = team2.rating;
    let difference = rating1-rating2;
    let possession = [0,0];
    if(difference >= 10){
        possession[0] = Math.floor(Math.random()*30)+50;
        possession[1] = 100-possession[0]
    }else if(difference >=5){
        possession[0] = Math.floor(Math.random()*25)+45;
        possession[1] = 100-possession[0]
    }else if (difference >= -5){
        possession[0] = Math.floor(Math.random()*20)+40;
        possession[1] = 100-possession[0]    
    }else if (difference >= -10){
        possession[0] = Math.floor(Math.random()*25)+45;
        possession[1] = 100-possession[0]    
    }else{
        possession[0] = Math.floor(Math.random()*30)+50;
        possession[1] = 100-possession[0]    
    }
    return possession;
}
function Shots(poss1,poss2,score){
    let diffPoss = poss1-poss2;
    let shots = {'team1':0,'team2':0,'team1sot':0,'team2sot':0};
    if(diffPoss>=20){
        shots['team1'] = Math.floor(Math.random()*30)
        shots['team1sot'] = Math.floor(Math.random()*shots['team1'])
        shots['team2'] = Math.floor(Math.random()*7)
        shots['team2sot'] = Math.floor(Math.random()*shots['team2'])
    }else if(diffPoss >=10){
        shots['team1'] = Math.floor(Math.random()*20)
        shots['team1sot'] = Math.floor(Math.random()*shots['team1'])
        shots['team2'] = Math.floor(Math.random()*12)
        shots['team2sot'] = Math.floor(Math.random()*shots['team2'])
    }else if(diffPoss >= -10){
        shots['team1'] = Math.floor(Math.random()*15)
        shots['team1sot'] = Math.floor(Math.random()*shots['team1'])
        shots['team2'] = Math.floor(Math.random()*15)
        shots['team2sot'] = Math.floor(Math.random()*shots['team2'])
    }else if (diffPoss >= -20){
        shots['team1'] = Math.floor(Math.random()*12)
        shots['team1sot'] = Math.floor(Math.random()*shots['team1'])
        shots['team2'] = Math.floor(Math.random()*20)
        shots['team2sot'] = Math.floor(Math.random()*shots['team2'])
    }else{
        shots['team1'] = Math.floor(Math.random()*7)
        shots['team1sot'] = Math.floor(Math.random()*shots['team1'])
        shots['team2'] = Math.floor(Math.random()*30)
        shots['team2sot'] = Math.floor(Math.random()*shots['team2'])
    }
    if (shots['team1sot']<=score[0]){
        shots['team1sot'] = score[0];
    }
    if (shots['team2sot']<=score[1]){
        shots['team2sot'] = score[1];
    }
    if (shots['team1']<=shots['team1sot']){
        shots['team1'] = shots['team1sot'];
    }
    if (shots['team2']<=shots['team2sot']){
        shots['team2'] = shots['team2sot'];
    }
    return shots;
}
// function that deals with database
async function connectDb(){
    //connects to database
    const db = process.env.ATLAS_URI;

    // creates an instance of mongoclient, creates server and interacts
    const client = new MongoClient(db);

    try{
        
    // connects mongoclient to database
    await client.connect();

    // holds the teams collection 
    const teams = await client.db("league").collection("teams").find({}).toArray();
    // holds the team collection but now globally
    plainTeams = teams.map(team => JSON.parse(JSON.stringify(team)));

    //Codes the random teams array
    

    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}

const app = express()
app.use(cors())
app.use(express.json())

// THis function is async because connectdb is async and we need res.json to wait for connectdb
// This is so plainteams has the array
app.get('/newGame',async (req,res)=>{
    try{
        match.length = 0
        matchArray.length = 0
        await connectDb()
        res.json(plainTeams);
    }catch(e){
        res.json(e)
    }
})

// This is for after the first team is selected
    app.post('/newGame', async (req,res)=>{
        try{
            await connectDb();
            const {team} = req.body;
            match.push(team);
            if(match.length<2){
                for(let i = 0; match.length-1>=i; i++){
                    for(let j = 0; plainTeams.length-1>=j;j++){
                        if(match[i] == plainTeams[j]["name"]){
                            plainTeams.splice(j,1)
                            j--;
                        }
                    }
                }
                res.json(plainTeams)
            }else{
                for(let i = 0; match.length-1>=i; i++){
                    for(let j = 0; plainTeams.length-1>=j; j++){
                        if(match[i] == plainTeams[j]["name"]){
                            matchArray.push(plainTeams[j])
                        }
                    }
                }
                res.json(matchArray)
            }
        }catch(e){
            res.json(e)
        }
    })


// This is so randomTeams has the array
app.get('/randomTeams', async (req,res)=>{
    try{
        match.length = 0
        matchArray.length = 0
        await connectDb()
        for(let i = 0; i<2; i++){
            randomTeam = Math.floor(Math.random()*((plainTeams.length-1) - 0 + 1))
            randomTeams[i] = plainTeams[randomTeam];

            if (i == 1){
                if (randomTeams[i]["_id"]==randomTeams[i-1]["_id"]){
                    i--;
                }
            }
        }
        matchArray = randomTeams
        res.json(randomTeams)
    }
    catch(e){
        res.json(e)
    }
})

// This is the code that will actually simulate the games
app.get('/simulate', async (req,res)=>{
    try{
        let teams = []
        let matchScore = [];
        await connectDb();
        // This line ensures that the matcharray causes a game between two teams
        if(matchArray.length == 2){
            team1 = {name:matchArray[0]["name"], defense:0, attack:0, width:0, scoring:0, overall:matchArray[0]["overall"],roster:matchArray[0]["roster"]}
            team2 = {name:matchArray[1]["name"], defense:0, attack:0, width:0, scoring:0, overall:matchArray[1]["overall"],roster:matchArray[1]["roster"]}
            
            teams.push(team1);
            teams.push(team2);
            for(let j = 0; teams.length>j; j++){
                for(let i = 0; teams[j].roster.length > i; i++){
                    if(teams[j].roster[i].rating>80){
                        switch (teams[j].roster[i].position){
                            case "GK":
                                teams[j].defense += 2;
                                break;
                            case "CB":
                                teams[j].defense += 5;
                                break;
                            case "LB":
                                teams[j].defense += 3;
                                teams[j].width++;
                                break;
                            case "RB":
                                teams[j].defense += 3;
                                teams[j].width++;
                                break;
                            case "CDM":
                                teams[j].defense++;
                                break;
                            case "CM":
                                teams[j].defense++;
                                teams[j].attack++;
                                break;
                            case "CAM":
                                teams[j].attack+=4;
                                break;
                            case "LM":
                                teams[j].attack++;
                                teams[j].width++;
                                break;
                            case "RM":
                                teams[j].attack++;
                                teams[j].width++;
                                break;
                            case "RW":
                                teams[j].attack+=3;
                                teams[j].width++;
                                break;
                            case "LW":
                                teams[j].attack+=3;
                                teams[j].width++;
                                break;
                            case "ST":
                                teams[j].attack+=5;
                                break;
                        }
                    }else if(teams[j].roster[i].rating>73){
                        switch (teams[j].roster[i].position){
                            case "GK":
                                teams[j].defense += 1;
                                break;
                            case "CB":
                                teams[j].defense += 3;
                                break;
                            case "LB":
                                teams[j].defense += 1;
                                teams[j].width++;
                                break;
                            case "RB":
                                teams[j].defense += 1;
                                teams[j].width++;
                                break;
                            case "CDM":
                                teams[j].defense++;
                                break;
                            case "CM":
                                teams[j].defense++;
                                break;
                            case "CAM":
                                teams[j].attack+=2;
                                break;
                            case "LM":
                                teams[j].width++;
                                break;
                            case "RM":
                                teams[j].width++;
                                break;
                            case "RW":
                                teams[j].attack+=1;
                                teams[j].width++;
                                break;
                            case "LW":
                                teams[j].attack+=1;
                                teams[j].width++;
                                break;
                            case "ST":
                                teams[j].attack+=3;
                                break;
                        }
                    }
                }    
            }

            for(let i = 0; teams.length>i; i++){
                for(let j =1; 0>j; j--){
                    if(teams[i].attack-teams[j].defense>6){
                        teams[i].scoring+=5;
                    }else if(teams[i].attack-teams[j].defense>3){
                        teams[i].scoring+=3;
                    }else if(teams[i].attack-teams[j].defense>1){
                        teams[i].scoring+=1;
                    }
                    i++;
                }
            }
            let temp1 = yourScore(team1)
            let temp2 = yourScore(team2)
            let scores = [temp1,temp2];
            let t1 = scorers(temp1,team1);
            let t2 = scorers(temp2,team2);
            let time1 = goaltimes(t1)
            let time2 = goaltimes(t2)
            time1.sort(function(a, b){return a - b});
            time2.sort(function(a, b){return a - b});
            let possession = poss(team1, team2);
            let sot = Shots(possession[0],possession[1],scores)
            let shots = [sot['team1'],sot['team2']]
            let shotsot = [sot['team1sot'],sot['team2sot']]
            console.log(time1)
            console.log(t1)
            console.log(t2)
            console.log(time2)
            matchScore = {'team1name':team1.name,'team1score':temp1,'team2score':temp2,'team2name':team2.name,'scorers1':t1,'scorers2':t2,'times1':time1,'times2':time2,'posession':possession,'shots':shots,'shotsot':shotsot}
            res.json(matchScore)
            
        }
        matchArray.length = 0;
        match.length = 0;
    }catch(e){
        res.json(e)
    }
})

app.listen(2500, ()=>{
    console.log("Server Running")
})