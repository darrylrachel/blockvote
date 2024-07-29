// Import Voting contract
const Voting = artifacts.require("Voting");

// Defines the test suite for the Voting contract
contract("Voting", accounts => {
  let votingInstance;

  // Runs before all tests to set up the contract instance
  before(async () => {
    votingInstance = await Voting.deployed();
  });

  // Test to check if the contract initializes with zero candidates
    it("should initialize with zero candidates", async () => {
      const count = await votingInstance.candidatesCount();
      assert.equal(count, 0, "Candidates count should be zero");
      
    });

    // Test to ensure the owner is allowed to add a candidate
    it("should allow a user to vote for a candidate", async () => {
      await votingInstance.addCandidate("Batman", { from: accounts[0] });
      const candidate = await votingInstance.getCandidate(0);
      assert.equal(candidate[0], "Batman", "Canadidate name should be Batman");
      assert.equal(candidate[1].toNumber(), 0, "Candidate vote count should be zero");
      
    });

    it("should allow a user to vote for a candidate", async () => {
      await votingInstance.vote(0, { from: accounts[1] });
      const candidate = await votingInstance.getCandidate(0);
      assert.equal(candidate[1].toNumber(), 1, "Candidate vote count should be one");
      
    });

    // Test to ensure a user cannot vote twice
    it("should not allow double voting", async () => {
      try {
        await votingInstance.vote(0, { from: accounts[1] });
        assert.fail("Expected error not receieved");
      } catch (error) {
          assert(error.message.includes("You have already voted"),
          "Expected 'You have already voted' error");
      }
    });
});