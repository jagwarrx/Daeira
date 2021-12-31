import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import goldpng from './goldpng.png';
import DonorNFT from './DonorNFT.json';
import TableRow from './TableRow';


function App() {

  const nonprofitdata = [
      {"name":"Mission Oxygen", "website":"123@afnsf.com", "category": "Oxygen" , "status":"Verified", "info":"An overnight initiative by a community of founders and entrepreneurs across Delhi/NCR to aid hospitals running out of oxygen", "imgsrc": "https://static.wixstatic.com/media/cb6b0d_86363ad7e703443597d5d60d2dee12c4~mv2.jpeg/v1/crop/x_0,y_0,w_388,h_407/fill/w_108,h_106,al_c,q_80,usm_0.66_1.00_0.01/6083dec2a0d5f.webp", "donate":"Select" },
      {"name":"Mazdoor Kitchen", "website":"123@afknaf.com", "category":"Food", "status":"Verified", "info":"A citizen-run voluntary initiative, working to provide meals and subsistence to daily wage workers in North Delhi.", "imgsrc":"https://cimages.milaap.org/milaap/image/upload/c_fill,g_faces,h_315,w_420/v1620212900/production/images/campaign/291831/IMG-20210505-WA0000_kdkzg3_1620212905.jpg", "donate":"Select"},
      {"name":"International Vaccine Access Centre", "website":"123@afknfa.com", "category":"Vaccination", "status":"In Progress", "info":"Applying rigorous science to build knowledge and support for the value of vaccines.", "imgsrc": "https://pbs.twimg.com/profile_images/983036697674825728/HFjOUUMD_400x400.jpg", "donate":"Select"}
    ]

  const [data, setData] = useState(nonprofitdata);
  const [selected, setSelected] = useState("Common Pool");

  console.log(data["nonprofits"]);

  const [currentAccount, setCurrentAccount] = useState("");
  const [donateState, setDonateState] = useState(false);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }


    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)
    } else {
      console.log("No authorized account found")
    }
  }

  const enableMint = async () => {
    setDonateState(true);
  }


  /*
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
      * Fancy method to request access to account.
      */
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      /*
      * Boom! This should print out public address once we authorize Metamask.
      */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNft = async () => {
    const CONTRACT_ADDRESS = "0x4E20E6BeB96550DeE9713282182b4Eb1356Da81c";

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, DonorNFT.abi, signer);

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.makeAnEpicNFT();

        console.log("Mining...please wait.")
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addNewValuetoTable = async (name, website, imagesrc ) => {
    const newRow = {"name": "ACT Grants", "website": "abc", "imgsrc": "https://actgrants.in/wp-content/uploads/2021/02/ACT-Logo.png", "category":"Supplies", "donate":"Select", "status":"Not Verified" ,"info": "non-profit coalition created by the Indian startup ecosystem to fight the pandemic and drive change"}
    const newData = [...data, newRow];
    console.log(newData);
    setData(newData);

  }


  // Render Methods
  // const renderNotConnectedContainer = () => (
  //    <button onClick={connectWallet} className="cta-button connect-wallet-button">
  //      Connect to Wallet
  //    </button>
  //);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
      <div className="App">

        <nav className="flex items-center justify-center flex-wrap grid grid-cols-3 gap-4">

          <div className="text-sm lg:flex-grow">
            {currentAccount === "" ? (
                <button id="connectwallet" onClick={connectWallet}>
                  <div className="inline-block animate-ping ease rounded-full w-2 h-2 bg-red mx-2"></div>
                  <a className="py-2 px-2 inline-flex text-xs leading-5 border rounded-full font-semibold rounded-full bg-red-100 text-red-800 border-white mt-4 lg:mt-0"> Connect Wallet </a>
                </button>
            ) : (
                <div>
                  <div className="inline-block animate-ping ease rounded-full w-2 h-2 bg-red mx-2"></div>
                  <a className="py-2 px-2 inline-flex text-xs leading-5 border rounded-full font-semibold rounded-full bg-green-100 text-green-800 border-white mt-4 lg:mt-0"> Connected </a>
                </div>
            )}
          </div>

          <div className="block items-center flex-shrink-0 text-blue my-10">
            <span className="block font-semibold text-2xl tracking-tight"> Daeira &#129309; Metis </span>
            <p className="block font-semibold text-xs tracking-tight"> One Click Crypto Donations </p>
          </div>

          <div className="block flex-grow flex items-center w-auto">
            <div>
              <a href="#" onClick={addNewValuetoTable}
                 className="border-2 border-cyan-500 p-2 rounded-md inline-block text-sm px-4 py-2 leading-none text-cyan-500 hover:border-cyan-700 hover:text-cyan-700"><b> Register Your Project </b></a>
            </div>
          </div>
        </nav>



       <div className="items-center justify-center w-30">

        <div className="mb-10">
        <img src={goldpng} className="flex mx-auto items-center justify-center" alt="abc"/>
        <div id="balance" className="block">
          <a> Pool Balance: </a>
        </div>
         <a className="text-gray-400"> <i>
           <span className="text-s"> add: </span>
           <a href="https://rinkeby.etherscan.io/address/0x2641b9724f7cdC3F258AC31c18c9f756533FF7E3" className="hover:text-cyan-500"> 0x2641b9724f7cdC3F258AC31c18c9f756533FF7E3 </a></i> </a>
        </div>

         <div className="flex w-half items-center justify-center">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table id="ngo-table" className="w-3/4 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                      <th scope="col"
                          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Organization
                      </th>
                      <th scope="col"
                          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col"
                          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Info
                      </th>
                      <th scope="col"
                          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Verification
                      </th>
                      <th scope="col"
                          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Donate
                      </th>
                    </tr>
                    </thead>
                    <tbody id="tablebody" className="bg-white divide-y divide-gray-200">

                    {data.map(function(data, i){
                      return <TableRow
                          key={i}
                          name={data.name}
                          email={data.email}
                          category={data.category}
                          status={data.status}
                          info={data.info}
                          imgsrc={data.imgsrc}
                          donate= {data.donate}
                      />})}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="block mt-10">
          <p>
            <i><span> Donate to:    </span></i>
            <b><span id="donationReciever" className="ml-2 text-xl"> Common Pool </span></b>
          </p>
        </div>

        <div className="container mx-auto py-5">
          <div className="mt-1 relative rounded-md flex items-center justify-center">
            <div className="inset-y-0 left-0 flex items-center pointer-events-none mr-2">
              <span className="text-gray-700 sm:text-sm text-bold"> Amount:  </span>
            </div>

            <input type="text" name="price" id="price"
                   className="focus:ring-indigo-500 border-b shadow-b p-2 focus:border-indigo-500 block w-25 pl-20 pr-12 text-xl  rounded-md"
                   placeholder="0.01"
                    />
          </div>

          <div className="text-gray-500 italic" id="metisprice"> USD: ?? </div>

          <button id="donate-pool" onClick={enableMint} className="w-1/4 border border-transparent text-base font-medium rounded-md text-white bg-cyan-500 shadow-lg shadow-cyan-500/50 hover:bg-teal-700 py-4 mt-3 text-m">
            Donate
          </button>

          { donateState == true &&
          <button id="mint" onClick={askContractToMintNft} className="m-5 w-1/4 border border-transparent text-base font-medium rounded-md text-white bg-cyan-500 shadow-lg shadow-cyan-500/50 hover:bg-teal-700 py-4 mt-3 text-m">
            Mint Doner NFT
          </button> }

          </div>
      </div>
  );
}

export default App;
