import React, { useEffect, useState } from 'react';
import FirebaseStack from '../firebase/firebasev9';
import { get, child, ref } from "firebase/database"
import Table from 'react-bootstrap/Table';


const IncomeStatement = () => {


    // const [firebaseData, setFirebaseData] = useState([]);
    const [trailBalanceData, setTrailBalanceData] = useState([]);
    const [stopData, setStopData] = useState(false)
    const [titleData, setTitle] = useState()
    const [ledger, setLedger] = useState([])
    const [ledgerDataState, setLedgerDataState] = useState([])

    const [revenue, setRevenue] = useState([])
    const [expense, setExpense] = useState([])

    const [incomeBalance, setIncomeBalance] = useState()

    const [capital, setCapital] = useState()
    const [capitalBalance, setCapitalBalance] = useState()

    const [drawing, setDrawing] = useState()
    const [drawingBalance, setDrawingBalance] = useState()

    const [endingCapital, setEndingCapital] = useState()



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

    useEffect(() => {
        getData()
    }, [titleData])

    useEffect(() => {
        getNetIncome()
    }, [expense, revenue, drawing, capital])

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

    const filter = () => {


        var arr = []
        var ledgerData = []
        ledger && ledger.map((obj) => {
            arr.push(obj.data)
        })



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


        //! expense ////
        const getExpense = {
            nature: ['expense'],
        }
        const getExpenseObj = filterPlainArray(arr, getExpense);
        setExpense(getExpenseObj)


        //! revenue ////
        const getRevenue = {
            nature: ['revenue'],
        }
        const getRevenueObj = filterPlainArray(arr, getRevenue);
        setRevenue(getRevenueObj)


        //! equity ////
        const getCapital = {
            nature: ['equity'],
        }
        const getCapitalObj = filterPlainArray(arr, getCapital);
        setCapital(getCapitalObj)


        //! drawing ////
        const getDrawing = {
            nature: ['drawing'],
        }
        const getDrawingObj = filterPlainArray(arr, getDrawing);
        setDrawing(getDrawingObj)
    }

    const getNetIncome = () => {
        var incomeBalanceInFunction = 0

        //! revenue ////
        revenue && revenue.map((obj => {
            incomeBalanceInFunction = incomeBalanceInFunction + parseInt(obj.amount)
        }))


        //! expense ////
        expense && expense.map((obj => {
            incomeBalanceInFunction = incomeBalanceInFunction - parseInt(obj.amount)
        }))
        setIncomeBalance(incomeBalanceInFunction)


        //! drawing ////
        var drawingBalance = 0
        drawing && drawing.map((obj) => {
            drawingBalance = drawingBalance + parseInt(obj.amount)
        })
        setDrawingBalance(drawingBalance)


        //! capital ////
        var capitalBalance = 0
        capital && capital.map((obj) => {
            capitalBalance = capitalBalance + parseInt(obj.amount)
        })
        setCapitalBalance(capitalBalance)


        const endingCapitalInFunctionHalf = capitalBalance - drawingBalance
        const endingCapitalInFunctionFull = Math.sign(incomeBalance) == 1 ? endingCapitalInFunctionHalf + incomeBalance : endingCapitalInFunctionHalf - incomeBalance
        setEndingCapital(endingCapitalInFunctionFull)
    }

    const db = FirebaseStack();
    const dbRef = ref(FirebaseStack());



    return (
        <>
            <h1 style={{ color: 'black' }}>Income statement</h1>
            <Table striped bordered hover variant="dark">

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Account Name</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>

                    <h4 style={{ color: 'black' }}>expense</h4>

                    {expense && expense.map((obj, key) => {
                        return (
                            <tr>
                                <td>{key}</td>
                                <td>{obj.title}</td>
                                <td style={obj.type == 'debit' ? { color: '#2ECC71' } : { color: 'red' }}>{obj.type == 'debit' ? obj.amount : null}</td>
                                <td style={obj.type == 'debit' ? { color: '#2ECC71' } : { color: 'red' }}>{obj.type == 'credit' ? obj.amount : null}</td>
                                <td>{obj.date}</td>
                            </tr>
                        )
                    })}
                    <tr style={{ fontSize: 17, marginTop: 4 }}>
                        <td className='backColor'></td>
                        <td>Balance</td>
                        <td colSpan={2}>total</td>
                        <td></td>
                    </tr>


                    <h4 style={{ color: 'black' }}>revenue</h4>

                    {revenue && revenue.map((obj, key) => {
                        return (
                            <tr>
                                <td>{key}</td>
                                <td>{obj.title}</td>
                                <td style={obj.type == 'debit' ? { color: '#2ECC71' } : { color: 'red' }}>{obj.type == 'debit' ? obj.amount : null}</td>
                                <td style={obj.type == 'debit' ? { color: '#2ECC71' } : { color: 'red' }}>{obj.type == 'credit' ? obj.amount : null}</td>
                                <td>{obj.date}</td>
                            </tr>
                        )
                    })}
                    <tr style={{ fontSize: 17, marginTop: 4 }}>
                        <td className='backColor'></td>
                        <td>Balance</td>
                        <td colSpan={2}>total</td>
                        <td></td>
                    </tr>


                    <tr style={{ fontSize: 17, marginTop: 4 }}>
                        <td colSpan={2}>NetIncome</td>
                        <td colSpan={3}>{incomeBalance}</td>
                    </tr>

                </tbody>
            </Table>

        </>
    )
}

export default IncomeStatement;