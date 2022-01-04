const Strings = artifacts.require("Strings");

contract("Strings", () => {
  it("returns lenght of string", async () => {
    var strings = await Strings.deployed();

    var result = await strings.length("onetwothree");
    assert(result.toNumber() === 11);
  });

  it("string concatenation", async () => {
    var strings = await Strings.deployed();

    var result = await strings.concatenate("one", "two");
    assert(result === "onetwo");
  });

  it("string comparison", async () => {
    var strings = await Strings.deployed();

    var result = await strings.compare("one", "one");
    assert(result);
  });

  it("string reverse", async () => {
    var strings = await Strings.deployed();

    var result = await strings.reverse("one");
    assert(result === "eno");
  });
});
