const Lawyer = artifacts.require("Lawyer");

contract("Lawyer", (accounts) => {
  it("should not execute when caller is not lawyer", async () => {
    var lawyer = await Lawyer.new(accounts[0], accounts[1], 5, { value: 100 });

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await lawyer.execute({ from: accounts[2] });
    } catch (e) {
      assert(e.message.includes("lawyer only"));
      return;
    }
    assert(false);
  });

  it("should execute the contract", async () => {
    var lawyer = await Lawyer.new(accounts[0], accounts[1], 5, { value: 100 });

    const initialBalance = web3.utils.toBN(
      await web3.eth.getBalance(accounts[1])
    );
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await lawyer.execute({ from: accounts[0] });
    const finalBalance = web3.utils.toBN(
      await web3.eth.getBalance(accounts[1])
    );
    assert(finalBalance.sub(initialBalance).toNumber() === 100);
  });

  it("should not execute when too early", async () => {
    var lawyer = await Lawyer.new(accounts[0], accounts[1], 5, { value: 100 });

    try {
      await lawyer.execute({ from: accounts[0] });
    } catch (e) {
      assert(e.message.includes("too early"));
      return;
    }
    assert(false);
  });
});
