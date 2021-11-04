import AuctionContract from '../eth/AuctionContract'

async function getAllAuc() {
    let currentAuc = []
    let total = await AuctionContract.methods.numAuc().call();

    for(let i=0; i<total; i++){
        currentAuc.push(await getOneAuc(i));
    }
    console.log("getallauc", currentAuc);
    return currentAuc;
}

async function getOneAuc(index) {
    const data = await AuctionContract.methods.Auctions(index).call();
    return {index, ...data}
}

export default getAllAuc;