import web3 from '../utils/Initweb3'
import AuctionContract from '../eth/AuctionContract'

async function getHistory(index) {
    let account=await web3.eth.getAccounts();
    console.log("gethistoryindex: ", parseInt(index))
    let a = await AuctionContract.methods.getHistory(index).call();
    console.log("gethistoryresult", a);
    return a;
}

export default getHistory;