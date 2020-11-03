const fastify = require('fastify')({
    // logger: true
  })

  require('../db/mongoose');

  fastify.register(require('../routes/user'));
  
  const start = async () => {
    try {
      await fastify.listen(3000)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start();
