// import web3 from '../utils/Initweb3';
import web3 from '../utils/Initweb3'
import AuctionContract from '../eth/AuctionContract'

// let bidOnce= (Aucid, price) => async()=> {
async function bidOnce(Aucid, price, time) {
    console.log(web3);
    let account=await web3.eth.getAccounts();
    console.log("castTic", account[0], Aucid, price);
    let res = await AuctionContract.methods.bidOnce(parseInt(Aucid), time).send({
        from: account[0],
        gas: 1000000,
        value: web3.utils.toWei(String(price), "ether")
    })
    console.log("bidresulttime: ", res);
    return res;
}

export default bidOnce;
