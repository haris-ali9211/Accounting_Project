import { set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import './App.css'
const LedgerContent = ({ num, pros, name }) => {


    const [trailBalance, setTrailBalance] = useState(0)
    const [balanceSheetData, setBalanceSheetData] = useState([])
    
    
    
    var today = new Date();
    var date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    useEffect(() => {
        getTrailBalance()
    }, [pros])

    const getTrailBalance = () => {
        var balance = 0;
        var name
        var nature
        const arr = []
        pros && pros.map((obj) => {
            name = obj.title
            nature = obj.nature
            if (obj.type == `debit`) {
                balance = (Number(obj.amount) + balance)
            }
            else if (obj.type == 'credit') {
                balance = (balance - (Number(obj.amount)))
            }
            const objArr = { name, trailBalance, nature };
            arr.push(objArr)
            
        })
        setTrailBalance(balance)
        // setBalanceSheetData([...balanceSheetData, arr])
        
        console.log("🚀 ~ file: LedgerContent.js ~ line 9 ~ LedgerContent ~ balanceSheetData", balanceSheetData)



    }

    // const getBalanceSheet = ()=>{
    //     var arr = []
    //     var name;
    //     var nature;

    // }

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

            <tr style={{ fontSize: 17, marginTop: 4 }}>
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