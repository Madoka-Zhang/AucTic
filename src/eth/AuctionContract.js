import web3 from '../utils/Initweb3';
import Auction from '../build/contracts/Auction.json'


let address = '0x7CbDA6489F290363c6Cc262311B863E06c358dFf';
const AuctionContract = new web3.eth.Contract(Auction.abi, address);

export default AuctionContract;