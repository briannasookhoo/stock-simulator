import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../redux/actions/actions';
import { setUserAuth } from '../redux/actions/actions';
import { Link } from 'react-router-dom';
import Button from './Button';
import '../styles/Header.scss';

const Header = ({userID}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [updateCash, setUpdateCash] = useState(0);
  
  const handleLogOut = () => {
    return dispatch(setUserAuth({
      _id: null,
      username: null,
      cash: 100000,
      stocks: [],
    }));
  }

  const handleCashChange = (e) => {
    const value = e.target.value;
    setUpdateCash(value);
  };

  const handleCashClick = () => {
    fetch(`/api/cash`, { // need to write backend route
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: user._id,
        cash: updateCash,
      }),
    })
    .then((res) => res.json())
    .then((data) => dispatch(updateData(data)))
    .catch((err) => console.log('ERROR while updating cash ', err));
  }


 console.log('userID: ', userID)
  if (!userID) {
    return (
      <div className='header-container'>
      <Link to='/'>
        <div className='logo'>
          <span>
            <i className='fas fa-chart-line'></i>Stock Simulator
          </span>
        </div>
      </Link>
        <div className='options'>
        <Link to='/app/login'>
          <Button secondary mr1 >
            Login
          </Button>
        </Link>
        <Link to='/'>
          <Button primary >
            Sign Up
          </Button>
        </Link>
        </div>
      </div>
    );
  }
  return (
    <div className='header-container'>
    <Link to='/'>
      <div className='logo'>
        <span>
          <i className='fas fa-chart-line'></i>Stock Simulator
        </span>
      </div>
    </Link>
      <div className='options'>
      <input type="text" onChange={handleCashChange} />
        <Button secondary mr1 onClick={handleCashClick}>
            Update Cash
        </Button>
        <Link to='/app/login'>
          <Button secondary mr1 onClick={handleLogOut}>
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
}


export default Header;
