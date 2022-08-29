import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ref, get, child } from "firebase/database"
import FirebaseStack from '../firebase/firebasev9';
import TableContent from './TableContent';
import './App.css';
import NavBar from './NavBar';

function DarkExample() {

    const [firebaseData, setFirebaseData] = useState([]);
    console.log("🚀 ~ file: Table.js ~ line 12 ~ DarkExample ~ firebaseData", firebaseData)
    const [stopData, setStopData] = useState(true)

    const getDataFromFirebase = async () => {
        get(child(dbRef, `record/`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log("🚀 ~ file: Table.js ~ line 19 ~ get ~ snapshot.val()", snapshot.val())
                setFirebaseData(snapshot.val().reverse())
                setStopData(false)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getDataFromFirebase()
    }, [])

    const dbRef = ref(FirebaseStack());

    return (
       <>
       <NavBar/>
       <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Account Name</th>
                    <th>Amount</th>
                    <th>Code</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {firebaseData ? firebaseData.map((obj, key) => {
                    return(
                        <TableContent className='divider' key={key} debit={obj.debit} credit={obj.credit}/>
                    )
                })
                    :
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                }
            </tbody>
        </Table>
       </>
    );
}

export default DarkExample;