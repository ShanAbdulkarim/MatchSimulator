import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
let matchup = false;
function NewGame() {
  const [teams,setTeams] = useState([])
  const {team} = useParams()
  useEffect(()=>{
    if(!team){
      axios.get('http://localhost:2500/newGame')
        .then(teams=>setTeams(teams.data))
        .catch(err=>console.log(err))
    }else{
      axios.post('http://localhost:2500/newGame',{team})
        .then(teams=>setTeams(teams.data))
        .catch(err=>console.log(err))
    }
  },[team])
  if(!team){
    return (
    <div className='displayContainer'>
      <h1> Select the First Team</h1>
      <table className='displayTable'>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Overall
            </th>
            <th>
              Formation
            </th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team=>{
            return <tr key={team.name}>
              <td><a href = {'/newGame/'+team.name}>{team.name}</a></td>
              <td>{team.overall}</td>
              <td>{team.formation}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
  }else if(teams.length == 2) {
    return (
      <div className='displayContainer'>
        <h1>Are you happy with these teams?</h1>
        <table className='displayTable'>
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Overall
              </th>
              <th>
                Formation
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team=>{
              return <tr key={team.name}>
                <td>{team.name}</td>
                <td>{team.overall}</td>
                <td>{team.formation}</td>
              </tr>
            })}
          </tbody>
        </table>
        <a href = "/simulate"> Simulate</a>
      </div>
    )
  }
  else{
    return (
      <div className='displayContainer'>
        <h1> Select the Second Team</h1>
        <table className='displayTable'>
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Overall
              </th>
              <th>
                Formation
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team=>{
              return <tr key={team.name}>
                <td><a href = {'/newGame/'+team.name}>{team.name}</a></td>
                <td>{team.overall}</td>
                <td>{team.formation}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }}

export default NewGame
