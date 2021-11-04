import web3 from '../utils/Initweb3'
import AuctionContract from '../eth/AuctionContract'

let newAuct= (id, startdate, enddate, startprice) => async()=> {
    console.log(web3);
    let account=await web3.eth.getAccounts();
    let stdate = parseInt(startdate/1000);
    let eddate = parseInt(enddate/1000);
    let stprice = web3.utils.toWei(String(startprice), "ether")
    console.log("newAuc", account[0], id, stdate, eddate, stprice);
    let res = await AuctionContract.methods.newAuction(id, stdate, eddate, stprice).send({
        from: account[0],
        gas: 1000000
    })
    return res;
}

export default newAuct;
