import web3 from '../utils/Initweb3';
import Auction from '../build/contracts/Auction.json'


let address = '0xC99D05cFCEC71E0CF866a25122cE778c6Ed4517b';
const AuctionContract = new web3.eth.Contract(Auction.abi, address);

export default AuctionContract;