import React from 'react';
import Button from 'react-bootstrap/Button';

function SubmitButton(props) {
  return (
    <div className="submit-button">
      <Button 
        type="submit"
        onClick={props.onClick}
      >
        {props.text}
      </Button>
    </div>
  )
}

export default SubmitButton;