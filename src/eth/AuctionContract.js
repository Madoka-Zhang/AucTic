import web3 from '../utils/Initweb3';
import Auction from '../build/contracts/Auction.json'


let address = '0xE9b115ea52c4abA8987A2CF580CF7c9839b3E3F6';
const AuctionContract = new web3.eth.Contract(Auction.abi, address);

export default AuctionContract;