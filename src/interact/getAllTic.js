import web3 from '../utils/Initweb3'
import AuctionContract from '../eth/AuctionContract'

let getNum= () => async() => {
    let account=await web3.eth.getAccounts();
    return await AuctionContract.methods.numTic().call({
        from: account[0]
    })
}

async function getAllTic() {
    let account = (await web3.eth.getAccounts())[0];
    let currentTic = []
    let total = await AuctionContract.methods.numTic().call();

    for(let i=0; i<total; i++){
        currentTic.push(await getOneTic(i));
    }
    return currentTic;
}

async function getOneTic(index) {
    const data = await AuctionContract.methods.Tics(index).call();
    return {index, ...data}
}

export default getAllTic;