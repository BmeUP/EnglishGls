import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { showWordModal } from '../features/generalAppSlice';
import CreateWord from './CreateWordComponent';
import './main.scss';
import Table from './TableComponent';

function openWordModal(d: any){
    d(showWordModal(false));
}

function ConcreteGls({rw}: any) {
  const general_a = useSelector((state: RootState) => state.general_app);
  const dispatch = useDispatch();

  return (
        <div className="glossary-main">
          <div className="d-f">
            <span className="word">
              Glossary {general_a.choosed_glsttl}
            </span>
            <div className="add-word-btn"
                onClick={() => openWordModal(dispatch)}>
                Add word
            </div>
          </div>
          {general_a.show_word_modal ? <CreateWord rw={rw}/> : ''}
          <Table/>
        </div>
    );
  }
  
export default ConcreteGls;