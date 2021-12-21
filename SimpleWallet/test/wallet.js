const Wallet = artifacts.require("Wallet");

contract("SimpleWallet", (accounts) => {
  let wallet = null;
  before(async () => {
    wallet = await Wallet.deployed();
  });

  it("Accounts[0] is owner", async () => {
    const owner = await wallet.owner();
    assert(owner === accounts[0]);
  });

  it("Should deposit ether", async () => {
    await wallet.deposit({ from: accounts[0], value: 100 });
    const balance = await web3.eth.getBalance(wallet.address);
    assert(parseInt(balance) === 100);
  });

  it("Should return balance of wallet", async () => {
    const balance = await wallet.balanceOf();
    assert(parseInt(balance) === 100);
  });

  it("Should transfer eth to another address", async () => {
    const balanceRecipientBefore = await web3.eth.getBalance(accounts[1]);
    await wallet.sendCash(accounts[1], 50, { from: accounts[0] });
    const balanceWallet = await web3.eth.getBalance(wallet.address);
    assert(parseInt(balanceWallet) === 50);
    const balanceRecipientAfter = await web3.eth.getBalance(accounts[1]);
    const finalBalance = web3.utils.toBN(balanceRecipientAfter);
    const initialBalance = web3.utils.toBN(balanceRecipientBefore);
    assert(finalBalance.sub(initialBalance).toNumber() === 50);
  });

  it("Should NOT transfer ether if tx not sent from owner", async () => {
    try {
      await wallet.sendCash(accounts[1], 50, { from: accounts[1] });
    } catch (e) {
      assert(e.message.includes("sender is not allowed"));
      return;
    }
    assert(false);
  });
});
