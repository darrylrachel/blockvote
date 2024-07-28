// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {

  struct Candidate {
    string name;
    uint voteCount;
  }

  address public owner;
  mapping(uint => Candidate) public candidate;
  mapping(address => bool) public voters;
  uint public candidatesCount;

  constructor() {
    require(msg.sender == owner, "Only owner can call this function");
    _;
  }

  function addCandidate(string memory _name) public onlyOwner {
    candidates[candidatesCount] = Candidate(_name, 0);
    candidatesCount++;
  }

  function vote(uint _candidateID) public {
    require(!voters[msg.sender], "You have already voted");
    require(_candidateID >= 0 && _candidateID < cadidatesCount, "Invalid candidate");

    voters[msg.sender] = true;
    candidates[_candidateID].voteCount++;
  }

  function getCandidate(uint _candidateId) public view returns (string memory name, uint voteCount) {
    require(_candidateId >= 0 && _candidateId < candidatesCount, "Invalid candidate");
    return (candidates[_candidateId].name, candidates[_candidateId].voteCount);
  }



}