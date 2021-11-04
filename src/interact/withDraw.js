import AuctionContract from '../eth/AuctionContract'
import web3 from '../utils/Initweb3'

async function withDraw() {
    let account=await web3.eth.getAccounts();
    console.log("in withDraw: ", account[0]);
    const draw = await AuctionContract.methods.pendingReturn(account[0]).call();
    console.log("draw = ", draw);
    let res = await AuctionContract.methods.withDraw().send({
        from: account[0],
        gas: 1000000
    });
    console.log("withDraw", res);
}

export default withDraw;