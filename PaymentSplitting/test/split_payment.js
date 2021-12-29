const SplitPayment = artifacts.require("SplitPayment");

contract("SplitPayment", (accounts) => {
  let splitPayment = null;
  before(async () => {
    splitPayment = await SplitPayment.deployed();
  });

  it("Accounts[0] is owner", async () => {
    const owner = await splitPayment.owner();
    assert(owner === accounts[0]);
  });

  it("Should not split payment if not send by owner", async () => {
    try {
      await splitPayment.send([accounts[1], accounts[2]], [1, 2], {
        from: accounts[1],
      });
    } catch (e) {
      assert(e.message.includes("Function can be executed only by owner"));
      return;
    }
    assert(false);
  });
});
