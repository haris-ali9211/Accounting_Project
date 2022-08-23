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

    const [assets, setAssets] = useState([])
    const [liability, setLiability] = useState([])

    const [liabilityFinalBalance, setLiabilityFinalBalance] = useState()
    const [assetBalanceFinal, setAssetBalanceFinal] = useState()

    const [assetData, setAssetData] = useState([])
    const [assetTitle, setAssetTitle] = useState([])


    const [incomeBalance, setIncomeBalance] = useState()

    const [capital, setCapital] = useState()
    const [capitalBalance, setCapitalBalance] = useState()

    const [drawing, setDrawing] = useState()
    const [drawingBalance, setDrawingBalance] = useState()

    const [endingCapital, setEndingCapital] = useState()

    const [expenseBalance, setExpenseBalance] = useState()
    const [revenueBalance, setRevenueBalance] = useState()




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



    // useEffect(()=>{
    //     filter()
    // },[assetData])

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

        //! check this //! /// ////////////////////////////////////////////////
        const assetFilter = {
            nature: ['asset'],
        }
        const assetData = filterPlainArray(arr, assetFilter);
        setAssetData(assetData)

        var assetsTitle=[]
        assetData && assetData.map((obj) => {
            assetsTitle.push(obj.title)
            
        })
        let uniqueAssets = [...new Set(assetsTitle)]
        setAssetTitle(uniqueAssets)        

        var arrUnique=[]
        uniqueAssets && uniqueAssets.map((obj)=>{
            assetData && assetData.map((obj1) => {
                if(obj == obj1.title){
                    arrUnique.push(obj1) 
                }
            	
            })
        })

        var arrBalanceAssets=[]
        var assetBalanceInFunction
        uniqueAssets && uniqueAssets.map((obj)=>{
            arrUnique && arrUnique.map((object)=>{
                if(obj == object.title){
                    console.log("🚀 ~ file: IncomeStatement.js  ~ obj == object.title", obj, object.amount,object.title)
                    assetBalanceInFunction = object.type == 'debit' ? assetBalanceInFunction + parseInt(object.amount) : assetBalanceInFunction - parseInt(object.amount) 
                }
            })
            arrBalanceAssets.push(assetBalanceInFunction)
            assetBalanceInFunction = 0
        })
        console.log("🚀 ~ file: IncomeStatement.js ~ line 178 ~ filter ~ arrBalanceAssets", arrBalanceAssets)
        //! /// ///////////////////////////////////////////////////////////////

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


        //! liability ////
        const getLiability = {
            nature: ['liability'],
        }
        const getLiabilityObj = filterPlainArray(arr, getLiability);
        setLiability(getLiabilityObj)


        //! assets ////
        const getAssets = {
            nature: ['asset'],
        }
        const getAssetsObj = filterPlainArray(arr, getAssets);
        setAssets(getAssetsObj)

    }

    const getNetIncome = () => {
        var incomeBalanceInFunction = 0

        //! revenue ////
        var revBalance = 0
        revenue && revenue.map((obj => {
            incomeBalanceInFunction = incomeBalanceInFunction + parseInt(obj.amount)
            revBalance = revBalance + parseInt(obj.amount)
        }))
        setRevenueBalance(revBalance)

        //! expense ////
        var expBalance = 0
        expense && expense.map((obj => {
            incomeBalanceInFunction = incomeBalanceInFunction - parseInt(obj.amount)
            expBalance = expBalance + parseInt(obj.amount)

        }))
        setExpenseBalance(expBalance)
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


        //! assets ////
        var assetsBalance = 0
        assets && assets.map((obj) => {
            assetsBalance = assetsBalance + parseInt(obj.amount)
        })
        setAssetBalanceFinal(assetsBalance)


        //! liability ////
        var liabilityBalance = 0
        liability && liability.map((obj) => {
            liabilityBalance = liabilityBalance + parseInt(obj.amount)
        })
        setLiabilityFinalBalance(liabilityBalance)


        const endingCapitalInFunctionHalf = capitalBalance - drawingBalance
        const endingCapitalInFunctionFull = Math.sign(incomeBalance) == 1 ? endingCapitalInFunctionHalf + incomeBalance : endingCapitalInFunctionHalf - incomeBalance
        setEndingCapital(endingCapitalInFunctionFull)
    }

    const db = FirebaseStack();
    const dbRef = ref(FirebaseStack());



    return (
        <>

            <h3 style={{ color: 'black', fontWeight: 'bold' }}>Income Statement</h3>

            <h3 style={{ color: 'black' }}>Expense</h3>
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

                    <h4 style={{ color: 'black' }}></h4>

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
                    <h4 style={{ color: 'black' }}></h4>

                    <tr style={{ fontSize: 17, marginTop: 4 }}>
                        <td className='backColor'></td>
                        <td>Balance</td>
                        <td colSpan={2}>{expenseBalance}</td>
                        <td></td>
                    </tr>



                </tbody>
            </Table>
            <h3 style={{ color: 'black' }}>Revenue</h3>

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


                    <h4 style={{ color: 'black' }}></h4>

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
                    <h4 style={{ color: 'black' }}></h4>

                    <tr style={{ fontSize: 17, marginTop: 4 }}>
                        <td className='backColor'></td>
                        <td>Balance</td>
                        <td colSpan={2}>{revenueBalance}</td>
                        <td></td>
                    </tr>

                    <h3 style={{ color: 'white' }}>NetIncome</h3>

                    <tr style={{ fontSize: 17, marginTop: 4 }}>
                        <td colSpan={2}>NetIncome</td>
                        <td colSpan={3}>{`${revenueBalance} - ${expenseBalance} = ${incomeBalance}`}</td>
                    </tr>
                </tbody>
            </Table>

            <h3 style={{ color: 'black', fontWeight: 'bold' }}>Statement of Owner Equity</h3>

            <Table striped bordered hover variant="dark">


                <tbody>
                    <tr>
                        <td colSpan={2}>Starting Capital</td>
                        <td colSpan={3}>{capitalBalance}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>NetIncome</td>
                        <td colSpan={3}>{incomeBalance}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Drawing</td>
                        <td colSpan={3}>{drawingBalance}</td>
                    </tr>

                    <h4 style={{ color: 'black' }}></h4>

                    <tr>
                        <td colSpan={2}>Ending Capital</td>
                        <td colSpan={3}>{endingCapital}</td>
                    </tr>

                </tbody>
            </Table>

            <h3 style={{ color: 'black', fontWeight: 'bold' }}>Balance Sheet</h3>
            <h3 style={{ color: 'black' }}>Assets</h3>

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

                    {assets && assets.map((obj, key) => {
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

                    <h4 style={{ color: 'black' }}></h4>

                    <tr style={{ fontSize: 17, marginTop: 4 }}>
                        <td className='backColor'></td>
                        <td>Balance</td>
                        <td colSpan={2}>{revenueBalance}</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>

            <h3 style={{ color: 'black' }}>Liability</h3>


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

                    {liability && liability.map((obj, key) => {
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
                </tbody>
            </Table>
        </>
    )
}

export default IncomeStatement;