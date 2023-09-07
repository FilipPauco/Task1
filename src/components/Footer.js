
export default function Footer(){
    return(      
            <footer className="bg-white  shadow dark:bg-gray-900">
                <div className="w-full max-w-screen-xl mx-auto py-4">
                    <div className="flex items-center justify-center">
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 ">
                            <li>
                                <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                            </li>
                            <li>
                                <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-4 border-gray-200 mx-auto dark:border-gray-700 " />
                    <span className=" block text-sm text-gray-500 text-center dark:text-gray-400">© 2023 <a href="" className="hover:underline">Company™</a>. All Rights Reserved.</span>
                </div>
            </footer>
    )
}