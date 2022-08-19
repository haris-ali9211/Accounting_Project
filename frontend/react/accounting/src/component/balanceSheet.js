import React, { useEffect, useState } from 'react';
import FirebaseStack from '../firebase/firebasev9';
import { get, child, ref } from "firebase/database"


const BalanceSheet =()=>{

    const dbRef = ref(FirebaseStack());
    const db = FirebaseStack();


    const [trailBalanceData, setTrailBalanceData] = useState([]);
    const [stopData, setStopData] = useState(false)
    const [titleData, setTitle] = useState()
    const [ledger, setLedger] = useState([])
    const [ledgerDataState, setLedgerDataState] = useState([])


    useEffect(() => {
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
            var title = `${obj}`
            var objT = { title: filtered }
            ledgerData.push(objT)
        })
        setLedgerDataState(ledgerData)

    }

    return(
        <>
        <p>BalanceSheet</p>
        </>
    )
}

export default BalanceSheet