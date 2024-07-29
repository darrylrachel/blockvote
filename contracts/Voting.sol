// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract Voting {
    // Defines a candidate with a name and vote count
    struct Candidate {
        string name;
        uint voteCount;
    }

    // Stores the address of the contract owner
    address public owner;
    mapping(uint => Candidate) public candidates; // Maps candidate IDs to candidates
    mapping(address => bool) public voters; // Tracks if an address has voted
    uint public candidatesCount; // Keeps count of the number of candidates

    // Sets the contract deployer as the owner
    constructor() {
        owner = msg.sender;
    }

    // Restricts certain functions to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // Allows the owner to add a new candidate
    function addCandidate(string memory _name) public onlyOwner {
        candidates[candidatesCount] = Candidate(_name, 0);
        candidatesCount++;
    }

    // Allows user to vote for a candidate
    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "You have already voted");
        require(
            _candidateId >= 0 && _candidateId < candidatesCount,
            "Invalid candidate"
        );

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
    }

    // Returns the candidate's name and vote count
    function getCandidate(
        uint _candidateId
    ) public view returns (string memory name, uint voteCount) {
        require(
            _candidateId >= 0 && _candidateId < candidatesCount,
            "Invalid candidate"
        );
        return (
            candidates[_candidateId].name,
            candidates[_candidateId].voteCount
        );
    }
}
