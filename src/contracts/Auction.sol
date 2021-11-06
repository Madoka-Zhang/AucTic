// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract Auction {
    enum Status { Open, Sold, Unsold }
    enum Conditions { New, Used }
    enum AucStatus { unstart, biding, end, allend }

    uint public numTic = 0;
    Tic[] public Tics;
    uint public numAuc = 0;
    mAuction[] public Auctions;

    // 每次出价
    struct Bid {
        address bidder;
        uint ticid;
        uint value;
        bool revealed;
    }

    // NFT
    struct Tic {
        address owner;
        uint id;
        string name;
        string category;
        string image;
        uint Nowner;
        Status statu;
        Conditions condition;
        address[] historyOwner;
    }

    struct mAuction {
        uint Aucid;
        address creater;
        uint item;
        string itemname;
        uint timeBegin;
        uint timeEnd;
        uint startPrice;
        address highestBidder;
        uint highestBid;
        uint secondBid;
        uint totalBids;
        AucStatus status;
        address[] bids;
    }

    mapping(address=> uint)public pendingReturn;
    
    event HighestBidChanged(uint num, address bidder, uint price, uint timestamp);
    event AuctionEnded(uint num, address beneficiary, address winner, uint price, uint timestamp);
    event UpdateStatus(uint num, AucStatus sts);
    event Claimed(uint num, address winner);

    
    function castTic(string memory _name, string memory _category, string memory _image) public returns (bool) {
        Tics.push(Tic({
            owner: msg.sender,
            id: numTic,
            name: _name,
            category: _category,
            image: _image,
            Nowner: 1,
            statu: Status.Open,
            condition: Conditions.New,
            historyOwner: new address[](0)
        })
        );
        Tics[numTic].historyOwner.push(msg.sender);
        numTic = numTic +1;
        return true;
    }

    function newAuction(uint item, uint timeBegin, uint timeEnd, uint startPrice) public returns (bool) {
        require(timeBegin <= timeEnd, "End <= Begin");
        require(Tics[item].statu != Status.Sold, "biding");
        Auctions.push(mAuction({
            Aucid: numAuc,
            creater: msg.sender,
            item: item,
            itemname: Tics[item].name,
            timeBegin: timeBegin,
            timeEnd: timeEnd,
            startPrice: startPrice,
            highestBidder: address(0),
            highestBid: startPrice,
            secondBid: startPrice,
            totalBids: 0,
            status: AucStatus.unstart,
            bids: new address[](0)
        })
        );
        Auctions[numAuc].status = (block.timestamp<timeBegin)?AucStatus.unstart:AucStatus.biding;
        Auctions[numAuc].timeBegin = timeBegin;
        Auctions[numAuc].timeEnd = timeEnd;
        numAuc = numAuc + 1;
        Tics[item].statu = Status.Sold;
        return true;
    }

    function bidOnce(uint num, uint time) public payable{
        mAuction storage auction = Auctions[num];
        require(time >= auction.timeBegin, "Unstarted");
        require(time <= auction.timeEnd, "Auction ended");
        require(msg.value > auction.highestBid, "Bid too low");
        
        Auctions[num].totalBids += 1;
        Auctions[num].bids.push(msg.sender);
        if (Auctions[num].highestBidder != address(0)) {
            pendingReturn[Auctions[num].highestBidder] += Auctions[num].highestBid;
            Auctions[num].secondBid = Auctions[num].highestBid;
        }

        Auctions[num].highestBid = msg.value;
        Auctions[num].highestBidder = msg.sender;
        
        emit HighestBidChanged(num, msg.sender, msg.value, time);
    }

    function withDraw() public payable returns(bool) {

        require(pendingReturn[msg.sender] > 0, "Nop to nop");

        uint amount = pendingReturn[msg.sender];
        pendingReturn[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
            pendingReturn[msg.sender] = amount;
            return false;
        }
        return true;
    }

    function endAuction(uint num, uint tic) public payable {
        // mAuction storage auction = Auctions[num];
        // Tic storage tic = Tics[auction.item];

        // require(block.timestamp >= auction.timeEnd, "No ending");
        // require(tic.statu == Status.Sold, "unsolding");

        Auctions[num].status = AucStatus.allend;
        if (Auctions[num].highestBidder == address(0)) {
            Tics[tic].statu = Status.Unsold;
        }
        else {
            payable(Auctions[num].creater).transfer(Auctions[num].highestBid);
        }
    }

    function claim(uint num, uint tic) public returns(bool){
        // uint tic = Auctions[num].item;

        // require(auction.highestBidder == msg.sender, "not the winner");
        // require(auction.status == AucStatus.end, "not ending");

        Auctions[num].status = AucStatus.end;

        Tics[tic].historyOwner.push(msg.sender);
        Tics[tic].owner = msg.sender;
        Tics[tic].statu = Status.Open;
        Tics[tic].condition = Conditions.Used;

        // emit Claimed(num, msg.sender);
        return true;
    }

    function getHistory(uint index) view public returns(address[] memory history) {
        return Tics[index].historyOwner;
    }

    function checkout(uint c) public returns(bool){
        bool res = false;
        for (uint i=0; i<numAuc; i++) {
            if (c>=Auctions[i].timeBegin && Auctions[i].status == AucStatus.unstart) {
                Auctions[i].status = AucStatus.biding;
                res = true;
                emit UpdateStatus(i, AucStatus.biding);
            }
            if (c>=Auctions[i].timeEnd && Auctions[i].status != AucStatus.end) {
                Auctions[i].status = AucStatus.end;
                res = true;
                emit UpdateStatus(i, AucStatus.end);
            }
        }
        return res;
    }
}