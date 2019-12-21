import React from 'react';
import './App.css';
import moment from 'moment'
import Input from './input';
import axios from 'axios';

const subjects = ["Angular","React","Golang"]
const targetDate = moment("12/21/2019 17:00:00")

function App() {
  const [name,setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [selectedSubject, setSelectedSubject] = React.useState("")
  const [isChecked, setIsChecked] = React.useState(false)
  const [timer, setTimer] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = () => {
    setIsLoading(true)
    axios.get('http://www.mocky.io/v2/5dfde561310000ed1ac96e39?mocky-delay=4000ms&fbclid=IwAR0OVHHyKAOlQixdxoNouipLtwG8ONH68q6X9isUti9P8SwMkh-fj5Xh104')
      .then(res => {
        const { data } = res
        setMessage(data.response)
        setIsLoading(false)
      })
    
  }


  const updateTimer = () => {
    const diffHours = targetDate.diff(moment(), "hours");
    const diffMinutes = targetDate.diff(moment(), "minutes") % 60;
    const diffSeconds = targetDate.diff(moment(), "seconds") % 60;

    setTimer(`${diffHours} hours ${diffMinutes} minutes ${diffSeconds} seconds`)
    
  }

  React.useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    
    axios.get("http://www.mocky.io/v2/5dfde8a93100000a1fc96e5e")
      .then(response => {
          setSelectedSubject(response.data.subject);
          
      });
      
    return () => clearInterval(interval);
  }, [])

  console.log("State:", {name, email, selectedSubject, isChecked, message})
  return (
    <div className="App">
      <div className='title'>Season Change Registration</div>
      <p>from ends in 5 P.M.</p>
      <p>{timer}</p>
      <Input 
        label="Name" 
        value={name}
        onChangeFromComponent={value => setName(value)}
      />
      <Input 
        label="Email"
        value={email}
        onChangeFromComponent={value => setEmail(value)}
      />

      <div class="field">
        <label class="label">Subject</label>
        <div class="control">
          <div class="select">
            <select onChange= {event => setSelectedSubject(event.target.value)}>
              {
                subjects.map(subject => 
                  <option key= {subject}> {subject} </option>
                )
              }
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox"
              value={isChecked}
              onChange = {event => setIsChecked(event.target.checked)}/>
            I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button 
          class= { "button is-link " + (isLoading && "is-loading")}
          onClick={handleSubmit} 
          disabled= {isLoading}>Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light">Cancel</button>
        </div>
      </div>
      <div>{message}</div>
    </div>

    
    
  );
}

export default App;
