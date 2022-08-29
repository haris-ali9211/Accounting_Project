import React, { useState } from 'react';
import TableContentSub from './TableContentSub'

const TableContent = ({ debit, credit }) => {

    const [debitData, setDebitData] = useState(debit)
    const [creditData, setCreditData] = useState(credit)
    

    var today = new Date();
    var date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    
    return (
        <>
        <h1></h1>
            {debitData && debitData.map((obj, key) => {
                return (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{obj.title}</td>
                        <td style={obj.type == 'debit' ? {color:'#2ECC71'} : {color:'red'}}>{obj.amount}</td>
                        <td>{obj.nature}</td>
                        <td style={obj.type == 'debit' ? {color:'#2ECC71'} : {color:'red'}}>{obj.type == "debit" ? 'debit' : null}</td>
                        <td>{obj.type == "credit" ? 'credit' : null}</td>
                        <td>{`${date} ${time}`}</td>
                    </tr>
                )
            })
            }
            {creditData && creditData.map((obj2, key) => {
                return (
                    <tr key={key}>
                        <td >{key}</td>
                        <td>{obj2.title}</td>
                        <td style={obj2.type == 'debit' ? {color:'#2ECC71'} : {color:'red'}}>{obj2.amount}</td>
                        <td>{obj2.nature}</td>
                        <td>{obj2.type == "debit" ? 'debit' : null}</td>
                        <td style={obj2.type == 'debit' ? {color:'#2ECC71'} : {color:'red'}}>{obj2.type == "credit" ? 'credit' : null}</td>
                        <td>{obj2.date}</td>
                    </tr>
                )
            })}
            {
                // data ? data.map((obj, key) => {
                //     if (obj.debit) {

                //         return (
                //             <TableContentSub objectDebit={obj.debit} />
                //         )
                //     }
                //     else if (obj.credit) {
                //         // console.log("🚀 ~ file: TableContent.js ~ line 10 ~ data?data.map ~ obj.debit", obj.credit)
                //         obj.credit.map((temp,key)=>{
                //         // console.log("🚀 ~ file: TableContent.js ~ line 18 ~ obj.credit.map ~ temp", temp)

                //         })
                //         return (
                //             <TableContentSub objectCredit={obj.credit} />
                //         )
                //     }

                // }) :
                //     <tr>
                //         <td>1</td>
                //         <td>Mark</td>
                //         <td>Otto</td>
                //         <td>@mdo</td>
                //         <td>@mdo</td>
                //         <td>@mdo</td>
                //         <td>@mdo</td>
                //     </tr>
            }
        </>
    )
}

export default TableContent