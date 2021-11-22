import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import API from '../app/api';
import './main.scss';
import { setTitle } from '../features/glossary/glossarySlice'

function addGlsToUser(data: object, cb: any){
    API.post(
        'api/create-glossary/',
        data,
        {withCredentials: true}
    ).then(
      res => {
        cb()
      }
    )
}

function CreateGls({cb}: any) {
  const toke_data = useSelector((state: RootState) => state.token_data);
  const glossary_data = useSelector((state: RootState) => state.gls);
  const dispatch = useDispatch();

  return (
        <div className="create-gls-modal">
          <input type="text" placeholder="title"
                 onChange={e =>  dispatch(setTitle(e.target.value))}/>
          <div className="add-gls-btn"
                onClick={() => addGlsToUser(glossary_data, cb)}>
              Create
          </div>
        </div>
    );
  }
  
export default CreateGls;
