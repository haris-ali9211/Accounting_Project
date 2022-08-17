import React, { useState } from 'react';

const LedgerContent = ({ key, pros, name }) => {


    const [title, setTitle] = useState()

    var today = new Date();
    var date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    return (
        <>
            <h4 style={{color: 'black'}}>helo</h4>
            {pros && pros.map((obj, key) => {
                return (
                  
                    <tr>
                        <td key={key}>{key}</td>
                        <td>{obj.title}</td>
                        <td>{obj.type == 'debit' ? obj.amount : null}</td>
                        <td>{obj.type == 'credit' ? obj.amount : null}</td>
                        <td>{`${date} ${time}`}</td>
                    </tr>
                  
                )
            })}
        </>
    )
}

export default LedgerContent;