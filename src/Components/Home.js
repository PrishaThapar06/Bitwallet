import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const Home = () => {
  const [datamine, setDatamine] = useState(null); 
  const [address,setaddress] = useState("");
  const [click,setclick] = useState(false)
  const config = {
    apiKey: "KvFBgHQPT36EH0LMO3CIz3B3YKbCZTBK",
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(config);

  async function fetch() {
    const data = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: address,
      category: ["external", "internal", "erc20", "erc721", "erc1155"],
    });
    console.log(data.transfers);
    setDatamine(data.transfers);
    console.log("dtaatmine", datamine);
  }
  useEffect(() => {  
    fetch();
  },[click]);

  return (
    <>
      <div className="w-[80%] mx-auto mt-11">
        <form>
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required="" 
              onChange={(e)=>{ 
                setaddress(e.target.value); 
                console.log(address); 
              }}
            />
            <button 
            onClick={(e)=>{  
              e.preventDefault();
              setclick((prev)=>!prev);
              fetch();
            }}
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="mt-10 ml-12 text-red">Risk Factor: </div>
      <div>
        <div className="relative overflow-x-auto mt-10">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-l-lg">
                  Value
                </th>
                <th scope="col" className="px-6 py-3">
                  From Address
                </th>
                <th scope="col" className="px-6 py-3 rounded-r-lg">
                  To Address
                </th>
              </tr>
            </thead>

            <tbody>
              {datamine === null
                ? "loading"
                : datamine.map((item) => (
                    <tr className="bg-white dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.value}
                      </th>
                      <td className="px-6 py-4">{item.from}</td>
                      <td className="px-6 py-4">{item.to}</td>
                    </tr>
                  ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 text-base">
                  Total
                </th>
                <td className="px-6 py-3">3</td>
                <td className="px-6 py-3">21,000</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
