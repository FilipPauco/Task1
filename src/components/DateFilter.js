import "./styles.css";
import { useRef } from "react";

export default function DateFilter({calculation}){

    const fromDate = useRef(null);
    const toDate = useRef(null);

    const checkDates = () => {
        const firstDate = fromDate.current.value;
        const secondDate = toDate.current.value;

        if(firstDate > secondDate){
            alert("First date must be sooner than the Second !")
            return;
        }
        calculation(firstDate,secondDate)
    }

    return(       
            <div className="py-8 flex justify-center flex-col">
            <h3 className="pb-6 text-center text text-xl text-gray-900 font-bold">Choose Date Range</h3>
            <div className="flex items-center justify-center">
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </div>
                    <input name="start" type="date" defaultValue={"2022-01-01"} onChange={checkDates} ref={fromDate} className="date bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[140px]  pl-10 sm:pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Select date start" />
                </div>
                <span className="mx-4 text-gray-500">to</span>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </div>
                    <input name="end" type="date" defaultValue={new Date().toISOString().slice(0, 10)} onChange={checkDates} ref={toDate} className="date bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[140px] pl-10 sm:pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Select date end" />
                </div>
            </div>
            </div>
    )
}