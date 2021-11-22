import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { showWordModal } from '../features/generalAppSlice';
import { setWord, 
         setTranslation,
         setDescription,
         setGlsId } from '../features/glossary/wordInGlsSlice';
import { WordInGlossary } from '../models/word';
import API from '../app/api';
import './main.scss';

function sendWordData(data: WordInGlossary, d: any, rw: any) {
  API.post('api/create-word/', data, {withCredentials: true}).then(
    res => {
      d(showWordModal(false));
      rw();
    }
  );
}

function CreateWord({rw}: any) {
  const general_a = useSelector((state: RootState) => state.general_app);
  const wording = useSelector((state: RootState) => state.wig);
  const dispatch = useDispatch();
  dispatch(setGlsId(general_a.choosed_glsid));
  return (
        <div className="create-word-modal">
            <input type="text" placeholder="word"
                   onChange={e => dispatch(setWord(e.target.value))}/>
            <input type="text" placeholder="translation"
                   onChange={e => dispatch(setTranslation(e.target.value))}/>
            <textarea placeholder="description"
                    onChange={e => dispatch(setDescription(e.target.value))}/>
            <div className="add-word-btn"
                onClick={() => sendWordData(wording, dispatch, rw)}>
                Add word to {general_a.choosed_glsttl}
            </div>
        </div>
    );
  }
  
export default CreateWord;