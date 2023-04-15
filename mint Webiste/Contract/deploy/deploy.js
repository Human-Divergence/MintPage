module.exports = async function ({ deployments, getNamedAccounts }) {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  console.log(`>>> your address: ${deployer}`)
  console.log(`On [${hre.network.name}] `)

  // bytes32 _root,
  // address _VRFCoordinator,
  // address _LinkToken,
  // bytes32 _keyhash
  const contractFactory = await ethers.getContractFactory('HD', {
    libraries: {
      HDLibraries: '0x511393c8fAd3bE6F2ebe4737F9C1492645B79d81',
    },
  })

  let merkle = ethers.utils.formatBytes32String('Familial')
  const hd = await deploy('HD', {
    // Put your contract name here
    from: deployer,
    args: [
      merkle,
      '0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed',
      '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
      '0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f',
    ],
    log: true,
    waitConfirmations: 1,
  })
  console.log(`>>> hd address: ${hd}`)
}

module.exports.tags = ['HD'] // Tags are used to filter tags

