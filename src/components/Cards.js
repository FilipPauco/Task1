

export default function Card({title,data,specialSymbol="",trend=""}){
    return(
            <div className="max-w-sm  w-36 sm:w-48 md:w-[224px] lg:w-64 p-3 shadow-black shadow-md border rounded-lg  bg-gray-800 border-gray-800">
                <a href="#">
                    <p className="mb-2 lg:text-lg sm:text-md text-sm   text-gray-200">{title}</p>
                </a>
                <div className="pt-2 pb-4 md:pb-8">
                    <p className="tracking-tight  font-bold lg:text-4xl md:text-3xl sm:text-2xl text-xl  text-center text-white">{data} {specialSymbol}</p>
                </div>
                {trend > 0 && <p className={`tracking-tight text-sm font-semibold text-center ${Math.round((data - trend) / trend * 100) >= 0 ? "text-green-400" : "text-red-400"}`} >{Math.round((data - trend) / trend * 100)} %</p>}
            </div>
    )
}