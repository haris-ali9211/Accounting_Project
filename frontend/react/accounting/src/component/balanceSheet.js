import React, { useEffect, useState } from 'react';
import FirebaseStack from '../firebase/firebasev9';
import { get, child, ref } from "firebase/database"


const BalanceSheet =()=>{

    const [trailBalanceData, setTrailBalanceData] = useState([]);
    const [ledger, setLedger] = useState([])
    const [titleData, setTitle] = useState()
    const [ledgerDataState, setLedgerDataState] = useState([])
    console.log("🚀 ~ file: balanceSheet.js ~ line 12 ~ BalanceSheet ~ ledgerDataState", ledgerDataState)

    const dbRef = ref(FirebaseStack());
    const db = FirebaseStack();

    useEffect(() => {
        getTrailBalanceData();
    }, [])

    useEffect(() => {
        filter()
    }, [ledger])

    useEffect(()=>{
        getData()
    },[trailBalanceData])

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
            var title = obj
            var objT = { [title]: filtered }
            ledgerData.push(objT)
            // for (const key in objT) {
            //     delete objT[key];
            // }
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