import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { showModal, setGlossaries, setChoosedGlsT, setWords } from '../features/generalAppSlice';
import API from '../app/api';
import './main.scss';
import CreateGls from './CreateGlsComponent';
import { Glossary } from '../models/glossary';
import ConcreteGls from './ConcreteGlsComponent';
import { WordWithTranslation } from '../models/word';
import { setUserName } from '../features/token/tokenDataSlice';
import trash from '../static/trash.png';


function getGlossaries(d: any){
  API.get<Glossary[]>(
      `api/get-glossary/`, 
      {withCredentials: true}).then(
    res => {
      d(setGlossaries(res.data));
    }
  ).catch(
    e => {
      API.post(
        'api/token/refresh/',
        {withCredentials: true}
      )
    }
  )
}

function showCreateGlsModal(d: any){
  d(showModal(true));
}

function loadGls(gls: Glossary, d: any) {
  d(setChoosedGlsT(gls))
  API.get<WordWithTranslation[]>(
    `api/get-words/?gls_id=${gls.id}`,
    {withCredentials: true}
  ).then(
    res => {
      d(setWords(res.data));})}

function retriveUserData(user_name: string, d: any){
  if(user_name === ''){
    API.get<any>(
      'api/retrive-user-name/',
      {withCredentials: true}
    ).then(
      res => {
        d(setUserName(res.data.username));
      }
    )
  }
}

function deleteGls(d: any, gls_id: number) {
  API.delete(
    `api/delete-gls/${gls_id}`,
    {withCredentials: true}
  ).then(
    res => {
      getGlossaries(d);
    }
  )
}

function MainGls() {
  const toke_data = useSelector((state: RootState) => state.token_data);
  const general_a = useSelector((state: RootState) => state.general_app);
  const dispatch = useDispatch();
  const reload_data = () => {
    getGlossaries(dispatch);
    dispatch(showModal(false))
  };
  const reload_words = () => {
    loadGls({id: general_a.choosed_glsid, title: general_a.choosed_glsttl}, dispatch)
  }
  
  React.useEffect(
    () => getGlossaries(dispatch), []);
  
  React.useEffect(() => retriveUserData(toke_data.user_name, dispatch), []);
    
  return (
        <div className="container">
          <div className="header">
            <span className="word">
              {toke_data.user_name}
            </span>
          </div>
          <div className="general-area">
            <div className="right-menu">
              <div className="add-btn"
                  onClick={() => showCreateGlsModal(dispatch)}>
                Add glossary
              </div>
              <div className="glossaries-lst">
                {general_a.glossaries.map((g) => (
                  <div className='gls-title' >
                    <span onClick={() => loadGls(g, dispatch)}>{g.title}</span>
                    <img src={trash} className='delete-icon' 
                        onClick={() => deleteGls(dispatch, g.id)}/>
                  </div>
                  ))}
              </div>
            </div>
            {general_a.choosed_glsttl ? <ConcreteGls rw={reload_words}/> : ''}
          </div>
          {general_a.show_modal ? <CreateGls 
                                    cb={reload_data}/> : ''}
        </div>
    );
  }
  
export default MainGls;
