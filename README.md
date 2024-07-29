# Voting Smart Contract

## Overview

The Voting Smart Contract is a decentralized application (DApp) that allows users to vote for candidates in an election. This project demonstrates the use of Solidity for smart contract development, Truffle for testing and deployment, and React for building the front-end interface.

## Features

- **Add Candidates:** Only the contract owner can add new candidates to the election.
- **Vote:** Users can vote for their preferred candidate.
- **Vote Restriction:** Each user can only vote once.
- **Retrieve Candidate Information:** View details of candidates and their vote counts.

## Technologies Used

- **Solidity:** Programming language for writing smart contracts.
- **Truffle:** Development framework for Ethereum, used for compiling, deploying, and testing the smart contracts.
- **Ganache:** Personal blockchain for Ethereum development, used for contract deployment.
- **React:** JavaScript library for building user interfaces, used for developing the front-end application.
- **Node.js & npm:** JavaScript runtime and package manager used for running the development tools.

## Contract Structure

### Voting.sol

- **Structs:**
  - `Candidate`: Represents a candidate with a name and vote count.

- **State Variables:**
  - `address public owner`: Stores the address of the contract owner.
  - `mapping(uint => Candidate) public candidates`: Maps candidate IDs to `Candidate` structs.
  - `mapping(address => bool) public voters`: Tracks whether an address has voted.
  - `uint public candidatesCount`: Keeps track of the number of candidates.

- **Modifiers:**
  - `onlyOwner`: Restricts function access to the contract owner.

- **Functions:**
  - `constructor()`: Sets the deployer as the owner.
  - `addCandidate(string memory _name)`: Allows the owner to add a new candidate.
  - `vote(uint _candidateId)`: Allows users to vote for a candidate.
  - `getCandidate(uint _candidateId)`: Returns the name and vote count of a candidate.

  **Testing**
  The contract is tested using Truffle. The test script Voting.test.js includes:

  - Initialization Test: Checks if the contract initializes with zero candidates.
  - Candidate Addition Test: Verifies that a user can add a new candidate.
  - Voting Test: Ensures a user can vote for a candidate and that the vote count is updated correctly.
  - Double Voting Test: Confirms that a user cannot vote more than once.
  
  **Front-End Development**
  - The front-end of the application is being developed using React. It will provide an interface for interacting with the smart contract, allowing users to view candidates, vote, and see vote counts.