import React from 'react';
import './Sign.scss'
import { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux'
import { userName, userPassword } from '../features/users/userSlice';
import { BrowserRouter, Link, Redirect, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import API from '../app/api';
import { User } from '../models/user';
import { setUserID, setUserName } from '../features/token/tokenDataSlice';


function get_token(user: User, dispatch: any, history: any):any{
    let data: any = {};
    API.post(
        'api/token/',
        {
            'username': user.username,
            'password': user.password
        }, 
        { withCredentials: true }
    ).then(
        res => {
            let tokens: any = res.data;
            const jwt_data: any = jwt_decode(tokens.access);
            dispatch(setUserID(jwt_data.user_id));
            dispatch(setUserName(jwt_data.username));
            history.push("/glossaries");
        }
    ).catch(
        e => {
            console.info(['e', e]);
        }
    )
}

function SignIn() {
    const user = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch()
    const history = useHistory();
    return (
      <div className="sign-up-in">
        <div className="sign-container">
          <span className="title">
              Sign In
          </span>
          <input type="text" placeholder="enter username"
            value={user.username}
            onChange={e => dispatch(userName(e.target.value))}/>
          
          <input type="password" placeholder="enter password"
            value={user.password}
            onChange={e => dispatch(userPassword(e.target.value))}/>
          
          <div className="btn"
                onClick={() => get_token(user, dispatch, history)}>
            Sign In
          </div>
          <Link to="/signup" className="btn">
              Sign up
          </Link>
        </div>
      </div>
    );
  }
  
  export default SignIn;
