let T = require("../util/twrap.js");

let Web3 = require("web3");
let ganache = require("ganache-core");

let pkg = require("../pkg.js");
pkg.types.loadTestTypes();

let web3 = new Web3(ganache.provider({
    gasLimit: 0xffffffff,
    allowUnlimitedContractSize: true,
    debug: true
}));


describe('twrap meta', async () => {
    it("twrap meta test", async () => {
        let accts = await web3.eth.getAccounts();
        web3.eth.defaultOptions = {
            from: accts[0],
            gas: 6000000
        }
        let BFactory = new T(pkg.types.BFactory);
        let factory = await BFactory.deploy(web3);
        let color = await factory.getColor();
        assert.equal(color, web3.utils.padRight(web3.utils.toHex("BRONZE"), 64));
        let bpool = await factory.newBPool();
    });
});