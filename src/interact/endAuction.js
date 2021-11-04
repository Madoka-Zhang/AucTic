import AuctionContract from '../eth/AuctionContract'
import web3 from '../utils/Initweb3'

async function endAuction(index, tic) {
    let account=await web3.eth.getAccounts();
    console.log("in claim: ", account[0], index, tic);
    let res = await AuctionContract.methods.endAuction(index, tic).send({
        from: account[0],
        gas: 1000000
    });
    console.log("claim", res);
}

export default endAuction;