import { set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import './App.css'
const LedgerContent = ({ num, pros, name }) => {


    const [trailBalance, setTrailBalance] = useState(0)
    const [balanceSheetData, setBalanceSheetData] = useState([])
    
    const [creditBalance, setCreditBalance] = useState(0)
    const [debitBalance, setDebitBalance] = useState(0)

    
    
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
        var credit = []
        var debit = []
        pros && pros.map((obj) => {
            name = obj.title
            nature = obj.nature
            if (obj.type == `debit`) {
                balance = (Number(obj.amount) + balance)
                debit = debit + parseInt(obj.amount) 
            }
            else if (obj.type == 'credit') {
                balance = (balance - (Number(obj.amount)))
                credit = credit + parseInt(obj.amount)
            }
            const objArr = { name, trailBalance, nature };
            arr.push(objArr)
            
        })
        setTrailBalance(balance)
        // setBalanceSheetData([...balanceSheetData, arr])

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
                            <td style={obj.type == 'debit' ? {color:'#2ECC71'} : {color:'red'}}>{obj.type == 'debit' ? obj.amount : null}</td>
                            <td style={obj.type == 'debit' ? {color:'#2ECC71'} : {color:'red'}}>{obj.type == 'credit' ? obj.amount : null}</td>
                            <td>{obj.date}</td>



                        </tr>


                    </>


                )
            })}

            <tr style={{ fontSize: 17, marginTop: 4 }}>
                <td className='backColor'></td>
                <td>trialBalance</td>
                <td colSpan={2}>{Math.abs(trailBalance)}</td>
                <td></td>
            </tr>
        </>
    )
}

export default LedgerContent;