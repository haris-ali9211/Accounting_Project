import React, { useEffect, useRef, useState } from 'react';
import FirebaseStack from '../firebase/firebasev9';
import { ref, get, child, set, orderByChild } from "firebase/database"
import Table from 'react-bootstrap/Table';


const TrialBalance = () => {

    const dbRef = ref(FirebaseStack());
    const db = FirebaseStack();


    // const [firebaseData, setFirebaseData] = useState([]);
    const [trailBalanceData, setTrailBalanceData] = useState([]);
    const [stopData, setStopData] = useState(false)
    const [titleData, setTitle] = useState()
    // console.log("🚀 ~ file: TrialBalance.js ~ line 17 ~ TrialBalance ~ titleData", titleData)
    const [ledger, setLedger] = useState([])
    console.log("🚀 ~ file: TrialBalance.js ~ line 19 ~ TrialBalance ~ ledger", ledger)


    useEffect(() => {
        // getUniqueData();
        // getDataFromFirebase();
        // getData();
        getTrailBalanceData();
    }, [])

    useEffect(() => {
        getUniqueData()
        getData()
    }, [trailBalanceData])

    // const getDataFromFirebase = async () => {
    //     get(child(dbRef, `record/`)).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             setFirebaseData(snapshot.val())

    //         } else {
    //             console.log("No data available");
    //         }
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    // }

    const getUniqueData = () => {
        var array = [];
        trailBalanceData && trailBalanceData.map((obj, key) => {
            array.push(obj.data.title)
        })
        let unique = [...new Set(array)]
        setTitle(unique)
    }

    const getTrailBalanceData = async () => {
        get(child(dbRef, `trailBalance/`)).then((snapshot) => {
            if (snapshot.exists()) {
                setTrailBalanceData(snapshot.val())

            }
            else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }

    const getData = async () => {
        var arr = titleData
        var arrData = []
        arr && arr.map((objArr) => {
            trailBalanceData.map((obj) => {
                if (obj.data.title == objArr) {
                    arrData.push(obj)
                }
            })
        })

        setLedger(arrData)
        setStopData(true)
    }




    var today = new Date();
    var date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    return (
        <>
            <Table striped bordered hover variant="Dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Amount</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ledger && ledger.map((object, key) => {
                            return (
                                <>
                                    <tr key={key}>
                                        <td>{key}</td>
                                        <td>{object.data.title}</td>
                                        <td>{object.data.type == 'debit' ? object.data.amount : null}</td>
                                        <td>{object.data.type == 'credit' ? object.data.amount : null}</td>
                                        <td>{`${date} ${time}`}</td>
                                    </tr></>
                            )
                        })
                    }

                    {/* {
                        titleData && titleData.map((obj) => {
                            trailBalanceData && trailBalanceData.map((object, key) => {
                                if (object.data.title === obj) {
                                    console.log("🚀 ~ file: TrialBalance.js ~ line 125 ~  == obj", object.data.title, obj)
                                    return (
                                        <tr key={key}>
                                            <td>{key}</td>
                                            <td>{object.data.title}</td>
                                            <td>{object.data.type == 'debit' ? object.data.amount : null}</td>
                                            <td>{object.data.type == 'credit' ? object.data.amount : null}</td>
                                            <td>{`${date} ${time}`}</td>
                                        </tr>
                                    )
                                }
                            })
                        })
                    } */}

                </tbody>
            </Table>
            {/* <button onClick={getData}>press me</button> */}
        </>
    )
}

export default TrialBalance  