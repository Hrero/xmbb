const cosmiconfig = require('cosmiconfig')

const explorer = cosmiconfig('nodexlog')
let customConfig = explorer.searchSync() || {config: {}}

console.log(customConfig.config);