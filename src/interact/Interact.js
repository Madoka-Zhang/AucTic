// import web3 from '../utils/Initweb3';
import web3 from '../utils/Initweb3'
import AuctionContract from '../eth/AuctionContract'

async function castTic(name,image,category) {
    console.log(web3);
    let account=await web3.eth.getAccounts();
    console.log("castTic", account[0], name, image, category);
    let res = await AuctionContract.methods.castTic(name, category, image).send({
        from: account[0],
        gas: 1000000
    })
    return res;
}

export default castTic;
