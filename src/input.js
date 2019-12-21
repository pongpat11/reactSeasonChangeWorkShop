import React from 'react'

const Input = (props) => {
    return (
        <div class="field">
        <label class="label">{props.label}</label>
        <div class="control">
          <input class="input" 
            type="text" 
            placeholder="Text input" 
            value=  {props.value} 
            onChange= {event =>
                props.onChangeFromComponent && 
                props.onChangeFromComponent(event.target.value)}
          />
        </div>
      </div>
    )

}

export default Input