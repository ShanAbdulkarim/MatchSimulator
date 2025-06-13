import { useEffect,useState } from 'react'
import axios from 'axios'

function RandomGame() {
    const[teams,setTeams] = useState([])
    useEffect(()=>{
      axios.get('http://localhost:2500/randomTeams')
      .then(teams=>setTeams(teams.data))
      .catch(err=>console.log(err))
    },[])
    return (
      <div className='displayContainer'>
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
              return <tr>
                <td>{team.name}</td>
                <td>{team.overall}</td>
                <td>{team.formation}</td>
              </tr>
            })}
          </tbody>
        </table>
        <a href = "/simulate">Simulate?</a>
      </div>
    )
  }
  
  export default RandomGame
  
  