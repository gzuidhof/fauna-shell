const {flags} = require('@oclif/command')
const FaunaCommand = require('../lib/fauna_command.js')
const faunadb = require('faunadb');
const q = faunadb.query;

class DeleteKeyCommand extends FaunaCommand {
  async run() {
	  const {args} = this.parse(DeleteKeyCommand);
	  const key = args.key || 'default';
	  const log = this.log;
	  
		this.withClient(function(client) {
		  log(`deleting key ${key}`);
		  client.query(q.Delete(q.Ref(q.Keys(null), key)))
		  .then(function(res) {
			  log(res);
		  })
		  .catch(function(error) {
			  log(error);
		  });
		});
  }
}

DeleteKeyCommand.description = `
Deletes a key
`

DeleteKeyCommand.examples = [
	'$ fauna-shell delete-key [KEYNAME]'
]

DeleteKeyCommand.args = [
	{key: 'keyname'},
]

module.exports = DeleteKeyCommand
