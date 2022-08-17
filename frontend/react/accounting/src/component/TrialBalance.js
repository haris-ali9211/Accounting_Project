import React, { useEffect, useRef, useState } from 'react';
import FirebaseStack from '../firebase/firebasev9';
import { ref, get, child, set, orderByChild } from "firebase/database"
import Table from 'react-bootstrap/Table';
import LedgerContent from './LedgerContent';


const TrialBalance = () => {

    const dbRef = ref(FirebaseStack());
    const db = FirebaseStack();


    // const [firebaseData, setFirebaseData] = useState([]);
    const [trailBalanceData, setTrailBalanceData] = useState([]);
    const [stopData, setStopData] = useState(false)
    const [titleData, setTitle] = useState()
    console.log("🚀 ~ file: TrialBalance.js ~ line 17 ~ TrialBalance ~ titleData", titleData)
    const [ledger, setLedger] = useState([])
    const [ledgerDataState, setLedgerDataState] = useState([])


    useEffect(() => {
        // getUniqueData();
        // getDataFromFirebase();
        // getData();
        getTrailBalanceData();
    }, [])

    useEffect(() => {
        getUniqueData()
        getData()
        filter()
    }, [trailBalanceData])

    useEffect(() => {
        filter()
    }, [ledger])

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

    const filter = () => {
        // var arr = []
        // titleData && titleData.map((object) => {
        //     ledger && ledger.map((obj) => {
        //         var temp = object
        //         if (obj.data.title == temp) {
        //             var objTemp = {}
        // if (!arr.temp) {
        // arr.temp.push(obj)  
        // }
        // else {

        // if (arr.find(arr => arr.temp == temp)) {
        //     console.log("🚀 ~ file: TrialBalance.js ~ line 102 ~ ledger&&ledger.map ~ arr.find(arr => arr.temp == temp", arr.find(arr => arr.temp == temp))
        //     arr.temp.push(obj)
        // }
        // else {
        // var objTemp = {temp : obj}
        // arr.push(objTemp)
        // for (const key in objTemp) {
        //     delete obj[key];
        // }
        // temp
        //     arr[temp] = obj
        //     console.log("🚀 ~  temp", arr.some(aot => aot.cash.data.title === `cash`),)

        // }
        // }
        //         }

        //     })
        // })
        // let result = ledger.find(obj => obj.data.title === `cash`)

        // if(ledger.some(ledger => ledger.data.title ===  `cash`)){
        // console.log("🚀 ~", arr)

        // }

        // const objArray = [{ foo: 1, bar: 2 }]
        // const result = objArray.map(({ foo }) => foo)
        // console.log(result)
        // var arr = []
        // ledger && ledger.map((obj)=>{
        //     var found = obj.find(obj.data.title === 'cash');
        //     arr.push(found)
        // })
        // console.log("🚀 ~ file: TrialBalance.js ~ line 112 ~ filter ~ arr", arr)



        var arr = []
        var ledgerData = []
        ledger && ledger.map((obj) => {
            arr.push(obj.data)
        })

        const getValue = value => (typeof value === 'string' ? value.toUpperCase() : value);

        function filterPlainArray(array, filters) {
            const filterKeys = Object.keys(filters);
            return array.filter(item => {
                return filterKeys.some(key => {
                    if (!filters[key].length) return true;
                    return filters[key].find(filter => getValue(filter) === getValue(item[key]));
                });
            });
        }

        titleData && titleData.map((obj) => {
            const filters = {
                title: [obj],
            };

            const filtered = filterPlainArray(arr, filters);
            //     arr[temp] = obj
            var title = `${obj}`
            var objT = { title: filtered }
            ledgerData.push(objT)
            // for (const key in objT) {
            //     delete objT[key];
            // }
        })
        setLedgerDataState(ledgerData)

    }

    return (
        <>
           <div>
           <Table striped bordered hover variant="dark" >
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
                        ledgerDataState && ledgerDataState.map((object, key) => {
                            var arr = titleData
                            return (
                                <>
                                    <LedgerContent num={key} name={arr[key]} pros={object.title}  />
                                </>
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
           </div>
            {/* <button onClick={getData}>press me</button> */}
        </>
    )
}

export default TrialBalance  