import API from '../utils/API';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import AddForm from '../components/AddForm/AddForm';
import SubmitButton from '../components/SubmitButton/SubmitButton';

function AddLeague() {

  const [newLeague, setNewLeague] = useState({
    name: '',
    latitude: 0,
    longitude: 0,
    budget: 0
  });

  const history = useHistory();

  const handleFormSubmit = event => {
    event.preventDefault();

    API.addLeague(newLeague.name, newLeague.latitude, newLeague.longitude, newLeague.budget)
      .then(res => {
        history.replace('/home');
      })
      .catch(err => alert(err));
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setNewLeague({
      ...newLeague,
      [name]: value
    });
  };

  return (
    <div className="add-league">
    <h2>Add your League to Our System</h2>
    <Form>
      <AddForm 
        onChange={handleChange}  
      />
      <SubmitButton 
        onClick={handleFormSubmit}
        text="SUBMIT"
        />
    </Form>
   </div>
 );
}

export default AddLeague;
