import React, { useEffect, useState } from 'react';
import './App.css'
const LedgerContent = ({ num, pros, name }) => {


    const [trailBalance, setTrailBalance] = useState(0)

    var today = new Date();
    var date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    useEffect(()=>{
        getTrailBalance()
    },[pros])

    const getTrailBalance = () => {
        var balance = 0;
        var name
        pros && pros.map((obj) => {
            name = obj.title
            if (obj.type == `debit`) {
                balance = (Number(obj.amount)+balance)
            }
            else if(obj.type == 'credit'){
                balance = (balance-(Number(obj.amount)))
            }
        })
        setTrailBalance(balance)
    }

    return (
        <>
            <h4 style={{ color: 'black' }}>{name}</h4>
            {pros && pros.map((obj, key) => {
                return (
                    <>
                        <tr>
                            <td key={key}>{num}</td>
                            <td>{obj.title}</td>
                            <td>{obj.type == 'debit' ? obj.amount : null}</td>
                            <td>{obj.type == 'credit' ? obj.amount : null}</td>
                            <td>{`${date} ${time}`}</td>



                        </tr>


                    </>


                )
            })}
            
            <tr style={{fontSize: 17, marginTop: 4}}>
                <td className='backColor'></td>
                <td></td>
                <td>Balance</td>
                <td>{trailBalance}</td>
                <td></td>
            </tr>
        </>
    )
}

export default LedgerContent;