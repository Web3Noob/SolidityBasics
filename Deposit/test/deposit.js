const Deposit = artifacts.require("Deposit");

contract("Deposit", (accounts) => {
  it("should not deposit when caller is not depositor", async () => {
    var deposit = await Deposit.new(accounts[1], accounts[2], 5);

    try {
      await deposit.deposit({
        from: accounts[0],
        value: 5,
      });
    } catch (e) {
      assert(e.message.includes("Sender must be the depositor"));
      return;
    }
    assert(false);
  });

  it("should not deposit when amount not equals to declared amount", async () => {
    var deposit = await Deposit.new(accounts[1], accounts[2], 5, {
      from: accounts[0],
    });

    try {
      await deposit.deposit({
        from: accounts[1],
        value: 1,
      });
    } catch (e) {
      assert(e.message.includes("Must send amount"));
      return;
    }
    assert(false);
  });

  it("should deposit", async () => {
    var deposit = await Deposit.new(accounts[1], accounts[2], 5, {
      from: accounts[0],
    });

    await deposit.deposit({
      from: accounts[1],
      value: 5,
    });

    var balance = await deposit.balanceOf();

    assert(parseInt(balance) === 5);
  });

  it("should not deposit when has been already deposited", async () => {
    var deposit = await Deposit.new(accounts[1], accounts[2], 5, {
      from: accounts[0],
    });

    await deposit.deposit({
      from: accounts[1],
      value: 5,
    });

    try {
      await deposit.deposit({
        from: accounts[1],
        value: 5,
      });
    } catch (e) {
      assert(e.message.includes("Has been already sent"));
      return;
    }
    assert(false);
  });

  it("should not withdraw when has not been deposited yet", async () => {
    var deposit = await Deposit.new(accounts[1], accounts[2], 5, {
      from: accounts[0],
    });

    try {
      await deposit.withdraw({
        from: accounts[0],
      });
    } catch (e) {
      assert(
        e.message.includes("cannot withdraw funds before it is deposited")
      );
      return;
    }
    assert(false);
  });

  it("should not withdraw when caller is not lawyer", async () => {
    var deposit = await Deposit.new(accounts[1], accounts[2], 5, {
      from: accounts[0],
    });

    await deposit.deposit({
      from: accounts[1],
      value: 5,
    });

    try {
      await deposit.withdraw({
        from: accounts[1],
      });
    } catch (e) {
      assert(e.message.includes("only lawyer can withdraw funds"));
      return;
    }
    assert(false);
  });

  it("should withdraw", async () => {
    var deposit = await Deposit.new(accounts[1], accounts[2], 5, {
      from: accounts[0],
    });

    await deposit.deposit({
      from: accounts[1],
      value: 5,
    });

    var balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[2]));

    await deposit.withdraw({
      from: accounts[0],
    });

    var balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[2]));

    assert(balanceAfter.sub(balanceBefore).toNumber() === 5);
  });
});
