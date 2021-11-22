import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import './main.scss';


function Table() {
  const general_a = useSelector((state: RootState) => state.general_app);
  const dispatch = useDispatch();

  return (
        <div className="container">
            <table className="table-parent">
                <caption className="table-caption">
                    Words from {general_a.choosed_glsttl}
                </caption>
                <thead className="table-borders">
                  <tr className="table-borders">
                    <th className="table-borders">Word</th>
                    <th className="table-borders">Translation</th>
                    <th className="table-borders">Description</th>
                  </tr>
                </thead>
                {general_a.word_with_t.map(
                    word => (
                        <tbody className="table-borders">
                            <tr>
                              <th className="table-borders">
                                  {word.word.word}
                              </th>
                              <td className="table-borders text-a">
                                  {word.translation[0].translation_text}
                              </td>
                              <td className="table-borders text-a">
                                  {word.translation[0].description}
                              </td>
                            </tr>
                        </tbody>))}
            </table>
        </div>
    );
  }
  
export default Table;
