import { useEffect,useState } from 'react'
import axios from 'axios'

function simGame() {
    const[teams,setTeams] = useState({})
    useEffect(()=>{
      axios.get('http://localhost:2500/simulate')
      .then(teams=>setTeams(teams.data))
      .catch(err=>console.log(err))
    },[])
    return(
        <div className='displayContainer'>
            <h1>Simulated Game</h1>
            <div>
                <p><span className = "teamTitle">{teams.team1name}</span> {teams.team1score} - {teams.team2score}  <span className = "teamTitle">{teams.team2name}</span></p>
                <div className='rowFlex'>
                    <div className='scorers' id = "s1">
                    {teams?.times1?.map((time,index)=>(
                        <p key ={index}>{time}'</p>
                    ))}
                    </div>
                    <div className='scorers' id = "s1">
                    {teams?.scorers1?.map(scorer=>(
                        <p key ={scorer.name}>{scorer.name}</p>
                    ))}
                    </div>
                    <div className='scorers' id = "s2">
                    {teams?.scorers2?.map(scorer=>(
                        <p key ={scorer.name}>{scorer.name}</p>
                    ))}
                    </div>
                    <div className='scorers' id = "s2">
                    {teams?.times2?.map((time,index)=>(
                        <p key ={index}>{time}'</p>
                    ))}</div>
                </div>
                    <div className = "stats">
                        <h2> Posession</h2>
                        <div className='rowFlexSTat'>
                            {teams?.posession?.map((poss,index)=>(
                                <p key = {index}>{poss}</p>
                            ))}
                        </div>
                        <h2> Shots </h2>
                        <div className='rowFlexSTat'>
                            {teams?.shots?.map((shot,index)=>(
                                <p key = {index}>{shot}</p>
                            ))}
                        </div>
                        <h2> Shots on target</h2>
                        <div className='rowFlexSTat'>
                            {teams?.shotsot?.map((shotsot,index)=>(
                                <p key = {index}>{shotsot}</p>
                            ))}
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default simGame