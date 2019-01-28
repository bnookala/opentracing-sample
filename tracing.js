const initJaegerTracer = require("jaeger-client").initTracer;

function initTracer(serviceName, options) {
    var config = {
      'serviceName': serviceName,
      'sampler': {
        'type': 'const',
        'param': 1
      },
      'reporter': {
        'agentHost': "jaeger-agent.jaeger.svc.cluster.local",
        'agentPort': 6832,
        'logSpans': true
      }
    }
    var options = {
      'logger': {
        'info': function logInfo(msg) {
          console.log('INFO ', msg)
        },
        'error': function logError(msg) {
          console.log('ERROR', msg)
        }
      }
    }

    const tracer = initJaegerTracer(config, options)

    //hook up nodejs process exit event
    process.on('exit', () => {
      console.log('flush out remaining span')
      tracer.close()
    })
    //handle ctrl+c
    process.on('SIGINT', () => {
      process.exit()
    })

    return tracer
}

exports.initTracer = initTracer;