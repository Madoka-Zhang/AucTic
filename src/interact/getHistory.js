import AuctionContract from '../eth/AuctionContract'

async function getHistory(index) {
    console.log("gethistoryindex: ", parseInt(index))
    let a = await AuctionContract.methods.getHistory(index).call();
    console.log("gethistoryresult", a);
    return a;
}

export default getHistory;