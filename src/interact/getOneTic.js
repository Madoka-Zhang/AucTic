import AuctionContract from '../eth/AuctionContract'

async function getOneTic(index) {
    const data = await AuctionContract.methods.Tics(index).call();
    return {index, ...data}
}

export default getOneTic;