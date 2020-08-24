import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import './style.css';


function AddForm(props) {
  return (
    <div className="form-input">
      <Form.Group as= {Row} controlId="formLeagueName">
        <Form.Label column sm="3">League Name</Form.Label>
        <Col sm="9">
          <Form.Control type="text" name="name" placeholder="AYSO 19" onChange={props.onChange} required/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formLeagueLocationX">
        <Form.Label column sm="3">Latitude</Form.Label>
        <Col sm="9">
          <Form.Control type="number" name="latitude" placeholder="34.0689" onChange={props.onChange} required/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formLeagueLocationY">
        <Form.Label column sm="3">Longitude</Form.Label>
        <Col sm="9">
          <Form.Control type="number" name="longitude" placeholder="-118.4452" onChange={props.onChange} required/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formBudget">
        <Form.Label column sm="3">Budget</Form.Label>
        <Col sm="9">
          <Form.Control type="number" name="budget" placeholder="5000" onChange={props.onChange} required/>
        </Col>
      </Form.Group>
    </div>
  )
}

export default AddForm;