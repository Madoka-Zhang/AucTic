import web3 from '../utils/Initweb3';
import AuctionContract from '../eth/AuctionContract'

async function getpending() {
    let account=await web3.eth.getAccounts();
    const data = await AuctionContract.methods.pendingReturn(account[0]).call();
    console.log("pending", account[0], data);
    return web3.utils.fromWei(data);
}

export default getpending;