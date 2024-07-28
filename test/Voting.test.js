const Voting = artifacts.require("Voting");

contract("Voting", accounts => {
  let votingInstance;

  before(async () => {
    votingInstance = await Voting.deployed();
  });

  it("should initialize with zero candidates", async () => {
    const count = await votingInstance.candidatesCount();
    assert.equal(count, 0, "Candidates count should be zero");
  });

  it("should allow a user to vote for a candidate", async () => {
    await votingInstance.addCandidate("Batman", { from: acounts[0] });
    const candidate = await votingInstance.getCandidate(0);
    assert.equal(candidate[0], "Batman", "Canadidate name should be Batman");
    assert.equal(candidate[1].toNumber(), 0, "Candidate vote count should be zero");
  })

})