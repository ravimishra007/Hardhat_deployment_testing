import { expect } from "chai";




describe("Token Contract", function () {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(ownerBalance.toString()).to.equal((await hardhatToken.totalSupply()).toString());
      });
      
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
        await hardhatToken.transfer(addr1.address, 5);
        const addr1Balance = await hardhatToken.balanceOf(addr1.address);
        expect(addr1Balance.toString()).to.equal('5');

      await hardhatToken.connect(addr1).transfer(addr2.address, 5);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance.toString()).to.equal('5');

    });



      it("Should update balances after transfers", async function () {
        const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
        await hardhatToken.transfer(addr1.address, 5);
        await hardhatToken.transfer(addr2.address, 10);
      
        const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
        expect(finalOwnerBalance.toString()).to.equal((initialOwnerBalance.sub(15)).toString());
      
        const addr1Balance = await hardhatToken.balanceOf(addr1.address);
        expect(addr1Balance.toString()).to.equal('5');
      
        const addr2Balance = await hardhatToken.balanceOf(addr2.address);
        expect(addr2Balance.toString()).to.equal('10');
      });
      
  });
});
