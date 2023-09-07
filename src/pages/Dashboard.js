import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import DateFilter from "../components/DateFilter";
import Footer from "../components/Footer";
import Card from "../components/Cards";

import LineGraph from "../components/LineGraph";
import DoughnutGraph from "../components/DoughnutGraph";



export default function DashBoard(){

    /* filteredData and graphData both use similar data with totally different structure,
       surely can be improved (at least on the space behalf)
    */
    let filteredData = {};
    let graphData = [];

    const [sales,setSales] = useState([]);
    const [graphDatas,setGraphDatas] = useState([]);

    const [totalCount, setTotalCount] = useState(0);
    const [earnings, setEarnings ] = useState(0);
    const [favoriteItem, setFavoriteItem] = useState("");

    const [previousCount, setPreviousCount] = useState(0);
    const [previousEarnings, setPreviousEarnings] = useState(0);

    const [fromDate,setFromDate] = useState("2022-01-01");
    const [toDate,setToDate] = useState(new Date().toISOString().slice(0, 10));

    useEffect(() => {
        fetch("data/products.json")
        .then(response => response.json())
        .then(data => {
            setSales(data)
            recalculate(fromDate,toDate,data)
        })
      },[])

    // function to reevaluate data for constrains
    const recalculate = (firstDate,secondDate,saless=sales) => {
        setFromDate(firstDate);
        setToDate(secondDate);

        setPreviousCount(totalCount);
        setPreviousEarnings(earnings)

        setTotalCount(0);
        setEarnings(0);
        filteredData = {}

        saless.filter((sale)=> sale.date >= firstDate && sale.date <= secondDate)
        .forEach((sale) => {
            const { date, type, price} = sale;

            // getting month and year from date
            const shortDate = date.slice(0,7).split("-").reverse().join("/");

            if (!graphData[shortDate]) {
                graphData[shortDate] = {}; 
            }

            if(!graphData[shortDate][type]){
                graphData[shortDate][type] = {count:0,price:price}
            }

            graphData[shortDate][type].count++;
            

            if(!filteredData[type]){
                filteredData[type] = {count:0, subtotal:0}
            }
            
            filteredData[type].count++;
            filteredData[type].subtotal += price; 

            setTotalCount((prev) => prev+1);
            setEarnings((prev) => price + Math.round(prev * 100) / 100);
        })

        setGraphDatas(graphData);

        let tempCount = 0;

        // getting most popular product
        if(Object.keys(filteredData).length === 0){
            setFavoriteItem("-");
            return;
        }
        for(let type in filteredData){
            const counter = filteredData[type].count;
        
            if(counter > tempCount){
                setFavoriteItem(type);
                tempCount = counter;
            }
        }

    }

    return(
        <>
            <Navbar/>
            <DateFilter calculation={recalculate} />
            <div className="flex justify-center mb-12 gap-4 flex-wrap">
                <Card title="Sales" data={totalCount} trend={previousCount}/>
                <Card title="Earnings" data={Math.round(earnings * 100) / 100} specialSymbol="€" trend={previousEarnings} />
                <Card title="Most Popular" data={favoriteItem} />
            </div>
            <div className="flex flex-wrap lg:flex-row  justify-center  gap-12 mb-36">
                <div className="w-[100%] h-64 max-w-[500px] min-w-[200px]"><LineGraph sales={graphDatas} fromDate={fromDate} toDate={toDate} /></div>
                <div className="w-[300px]"><DoughnutGraph sales={graphDatas} fromDate={fromDate} toDate={toDate} /></div>
            </div>
            <Footer/>
        </>
    )
}