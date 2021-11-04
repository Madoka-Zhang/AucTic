import AuctionContract from '../eth/AuctionContract'
import web3 from '../utils/Initweb3'

async function checkout() {
    let account=await web3.eth.getAccounts();
    let res = false;
    var now = new Date();
    let c = parseInt(now.valueOf()/1000);
    res = await AuctionContract.methods.checkout(c).call({
        from: account[0],
        gas: 6000000
    });
    console.log("checkout", res);
}

export default checkout;