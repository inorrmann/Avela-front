import API from '../utils/API';
import React, { useEffect, useRef, useState } from 'react';
import * as geolib from 'geolib';

import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import FindForm from '../components/FindForm/FindForm';
import SubmitButton from '../components/SubmitButton/SubmitButton';

function FindLeague() {

  const [resultsLength, setResultsLength] = useState();
  const [radiusLeagues, setRadiusLeagues] = useState([]);
  const [sortedLeagues, setSortedLeagues] = useState([])
  const [foundLeagues, setFoundLeagues] = useState([]);
  const [searchComplete, setSearchComplete] = useState(null);

  const usedBudget = useRef(0)

  const [sponsorLeague, setSponsorLeague] = useState({
    latitude: 0,
    longitude: 0,
    radius: 0,
    budget: 0
  });

  const handleChange = event => {
    const { name, value } = event.target;
    if (name !== 'radius') {
      setSponsorLeague({
        ...sponsorLeague,
        [name]: parseInt(value)
      });
    } else {
      setSponsorLeague({
        ...sponsorLeague,
        radius: parseInt(event.target.value * 1609.344)
      });
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const query = { budget: sponsorLeague.budget }

    API.findLeague(query)
      .then(res => {
        setResultsLength(res.data.length);
        res.data.forEach(function(league) {
          let isRadius = geolib.isPointWithinRadius(
            { lat: league.latitude, lon: league.longitude},
            { lat: sponsorLeague.latitude, lon: sponsorLeague.longitude},
            sponsorLeague.radius
          );
          if (isRadius) {
            setRadiusLeagues(radiusLeagues => [...radiusLeagues, league]);
          }
        });
        setSearchComplete(true);
      })
      .catch(err => alert(err))

    document.querySelectorAll('.form-control').forEach(function(input) {
      input.value="";
    })
  };

  useEffect(() => {
    function compare(a, b) {
      let budgetA = a.budget;
      let budgetB = b.budget;
      let comparison = 0;
      if (budgetA > budgetB) {
        comparison = 1;
      } else if (budgetA < budgetB) {
        comparison = -1;
      }
      return comparison;
    }
    setSortedLeagues(radiusLeagues.sort(compare));
  }, [radiusLeagues]);

  useEffect(() => {
    let maxBudget = sponsorLeague.budget;
    if (resultsLength === sortedLeagues.length) {
      sortedLeagues.forEach(function(league) {
        if ((usedBudget.current + league.budget) <= maxBudget) {
          usedBudget.current += league.budget;
          setFoundLeagues(foundLeagues => [...foundLeagues, league]);
        }
      });
    }
  }, [sortedLeagues]);

  const leagueList = foundLeagues.map(league => 
    <tr key={league.id}>
      <td>{league.league_name}</td>
      <td>{league.latitude}</td>
      <td>{league.longitude}</td>
      <td>{league.budget}</td>
    </tr>
  );

  return (
    <div className="find-league">
      <h2>Find Leagues to Sponsor</h2>
      <Form>
        <FindForm 
          onChange={handleChange}
        />
        <SubmitButton
          onClick={handleFormSubmit} 
          text="FIND"
        />
      </Form>

      {searchComplete && foundLeagues.length > 0 &&
        <div className="results">
          <hr />
          <h2>Results</h2>
          <Table striped bordered size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Budget</th>
              </tr>
            </thead>
            <tbody>
              {leagueList}
            </tbody>
          </Table>
        </div>
      }
      {searchComplete && foundLeagues.length === 0 &&
        <div className="no-results">
          <hr />
          <h2>No Results Matched Your Search Criteria</h2>
        </div>
      }
    </div>
  )
}

export default FindLeague;
