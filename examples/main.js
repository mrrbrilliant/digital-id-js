import "./style.css";
import DID from "digital-id-js";

async function main() {
  const did = await DID("your_eth_private_key");

  console.log(did.contract.isReadWrite());
  // Register organzation metadata on decentralize storage
  const org_meta = await did.storage.addJson(
    JSON.stringify({
      name: "BRILLIANT",
      website: "https://brilliant.koompi.org",
      logo: "https://gateway.kumandra.org/files/QmZKsqLyb22tr6PordmXZ3q6JxjWcrq97L2UNX2AEfEFTd",
      description: "Personal blog",
    })
  );
  // Mint organization on selendra digital id contract with the hash of org_meta
  const org = await did.contract.mutate.mintOrganization(org_meta["Hash"]);
  // Check the result
  console.log(org);
  console.log(await did.contract.query.getOwnerOf(org_meta["Hash"]));
  console.log(await did.contract.query.getAssetsOf("your_public_key"));
}

main();
