// Connect to MetaMask and Interact with Smart Contract
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import VotingContract from './contracts/Voting.json';

const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');


const Voting = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [candidateName, setCandidateName] = useState('');
  const [message, setMessage] = useState('');

  useEffect( () => {
    const loadBlockchainData = async () => {
      try {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
        } else if (window.web3) {
          window.web3 = new Web3(windowd.web3.currentProvider);
        } else {
          window.alert('Non-Ethereum browser detected. You should consider trying Metamask!');
        }

        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = VotingContract.networks[networkId];

        if (!deployedNetwork) {
          window.alert('Smart contract not deployed to detected network.');
          return;
        }

        const instance = new web3.eth.Contract( 
          VotingContract.abi,
          deployedNetwork.address
        );

        setContract(instance);

        const candidatesCount = await instance.methods.candidatesCount().call();
        const candidatesList = [];
        for (let i = 0; i < candidatesCount; i++) {
          const candidate = await instance.methods.getCandidate(i).call();
          candidatesList.push(candidate);
        }
        setCandidates(candidatesList);
      } catch (error) {
        console.error("Error loading blockchain data:", error);
        window.alert("Error loading blockchain data.");
      }
    };
    
   loadBlockchainData();
  }, []);

  const addCandidate = async () => {
    try {
      await contract.methods.addCandidate(candidateName).send({ from: account });
      const candidatesCount = await contract.methods.candidatesCount().call();
      const candidatesList = [];
      for (let i = 0; i < candidatesCount; i++) {
        const candidate = await contract.methods.getCandidate(i).call();
        candidatesList.push(candidate);
      }

      setCandidates(candidatesList);
      setCandidateName('');
      setMessage('Candidate added successfully!');
    } catch (error) {
      console.error("Error adding candidate:", error);
      setMessage('Error adding candidate.');
    }
  };

  const vote = async (id) => {
    try {
      await contract.methods.vote(id).send({ from: account });
      const candidatesCount = await contract.methods.candidatesCount().call();
      const candidatesList = [];
      for (let i = 0; i < candidatesCount; i++) {
        const candidate = await contract.methods.getCandidate(i).call();
        candidatesList.push(candidate);
      }
      setCandidates(candidatesList);
      setMessage('Vote successfully!');
    } catch (error) {
      console.error("Error voting:", error);
      setMessage('Error voting')
    }
  };

  return (
    <div>
      <h1>Voting DApp</h1>
      <p>Your account: {account}</p>
      <h2>Add Candidate</h2>
      <input
        type="text"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
      />
      <button onClick={addCandidate}>Add Candidate</button>
      <h2>Candidates</h2>
      {candidates.map((candidate, index) => (
        <div key={index}>
          <p>{candidate[0]} - {candidate[1]} votes</p>
          <button onClick={() => vote(index)}>Vote</button>
        </div>
      ))}
      <p>{message}</p>
    </div>
  );
};

export default Voting;