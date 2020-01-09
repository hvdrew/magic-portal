/**
 * Slightly modified version of the npm package "broadcast-address"
 * This package was small and had unnecessary dependencies, so I have
 * updated it and replaced the external dependencies with equivalent logic.
 * 
 * This file will likely stay the same for a while, because the math used
 * shouldn't have issues in any cases.
 */

const os = require('os');
const allInterfaces = os.networkInterfaces();
let addr_info;

module.exports = function broadcastAddress(int = 'en0', address) {
  if(!allInterfaces.hasOwnProperty(int)) {
    throw new Error(`Unknown network interface (${int}).`);
  }

  // if an address is given, look it up under the given network interface
  // otherwise just get the first IPv4 occurence for that network interface
  if(address) {
    addr_info = allInterfaces[int].find(e => e.address === address);
  } else {
    addr_info = allInterfaces[int].find(e => e.family === 'IPv4');
  }

  if(!addr_info) {
    throw new Error(`No address info found. Specify a valid address.`);
  }

  const addr_split = addr_info.address.split('.');
  const netmask_split = addr_info.netmask.split('.');
  // bitwise OR over the splitted NAND netmask, then glue them back together with a dot character to form an ip
  // we have to do a NAND operation because of the 2-complements; getting rid of all the 'prepended' 1's with & 0xFF
  return addr_split.map((e, i) => (~netmask_split[i] & 0xFF) | e).join('.');
}