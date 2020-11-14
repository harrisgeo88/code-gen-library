const readline = require('readline');

const fullLogo = `
 ██████╗ ██████╗ ██████╗ ███████╗     ██████╗ ███████╗███╗   ██╗      ██╗     ██╗██████╗ ██████╗  █████╗ ██████╗ ██╗   ██╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝    ██╔════╝ ██╔════╝████╗  ██║      ██║     ██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝
██║     ██║   ██║██║  ██║█████╗█████╗██║  ███╗█████╗  ██╔██╗ ██║█████╗██║     ██║██████╔╝██████╔╝███████║██████╔╝ ╚████╔╝ 
██║     ██║   ██║██║  ██║██╔══╝╚════╝██║   ██║██╔══╝  ██║╚██╗██║╚════╝██║     ██║██╔══██╗██╔══██╗██╔══██║██╔══██╗  ╚██╔╝  
╚██████╗╚██████╔╝██████╔╝███████╗    ╚██████╔╝███████╗██║ ╚████║      ███████╗██║██████╔╝██║  ██║██║  ██║██║  ██║   ██║   
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝     ╚═════╝ ╚══════╝╚═╝  ╚═══╝      ╚══════╝╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
`

const abbreviatedLogo = `
██████╗ ██████╗ ██╗     
██╔════╝██╔════╝ ██║     
██║     ██║  ███╗██║     
██║     ██║   ██║██║     
╚██████╗╚██████╔╝███████╗
 ╚═════╝ ╚═════╝ ╚══════╝
`

function printLogo() {
  const { columns } = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log(columns < 123 ? abbreviatedLogo : fullLogo)
}

module.exports = printLogo