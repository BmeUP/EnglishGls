import React from 'react';
import './Sign.scss'

import { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux'
import { userName, userEmail, userPassword } from '../features/users/userSlice';
import { Link } from 'react-router-dom';
import API from '../app/api';
import { User } from '../models/user';

function create_user(user: User){
  API.post(
    'api/sign-up/',
    {
      'username': user.username,
      'password': user.password,
      'email': user.email
    }
  ).then(
    res =>{
      console.info(['res', res]);
    }
  ).catch(
    e => {
      console.info(['e', e.toJSON()]);
    }
  )
}

function SignUp() {
    const user = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch()
    return (
      <div className="sign-up-in">
        <div className="sign-container">
          <span className="title">
              Sign Up
          </span>
          <input type="text" placeholder="enter user name"
            value={user.username}
            onChange={e => dispatch(userName(e.target.value))}/>
          
          <input type="text" placeholder="enter email"
            value={user.email}
            onChange={e => dispatch(userEmail(e.target.value))}/>
          
          <input type="password" placeholder="enter password"
            value={user.password}
            onChange={e => dispatch(userPassword(e.target.value))}/>
          
          <div className="btn" onClick={() => create_user(user)}>
            Sign Up
          </div>

          <Link to="/signin" className="btn">
              Sign In
          </Link>
        </div>
      </div>
    );
  }
  
  export default SignUp;