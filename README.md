## OpenTracing Sample

This is a simple node application that produces opentracing traces, consumed by a jaeger instance running in your cluster.

### Deploying the sample

Pre-requisite: a jaeger instance deployed via fabrikate:

1. Download the `fab` tool [here](http://github.com/Microsoft/fabrikate/releases), and place it on your PATH.
2. Clone https://github.com/bnookala/fabrikate-jaeger via git: `git clone https://github.com/bnookala/fabrikate-jaeger`
3. Move into the fabrikate directory: `cd fabrikate-jaeger`
4. Download the fabrikate stack's dependencies: `fab install`
5. Generate the "production" config: `fab generate prod`
6. Apply the production config to your cluster: `kubectl apply -f ./generated/prod/ --recursive`



In the opentracing-sample dirctory, run:

```
kubectl apply -f deployment.yaml
```

### Testing the sample

Run

```
APP=`kubectl get po --selector=app=ot -o jsonpath='{.items[0].metadata.name}'` && kubectl port-forward $APP 3000:3000
```

In a seperate terminal in the same directory:

Run `./hit_sample.sh`

This will send 10 sample requests to your application at `http://localhost:3000`

You can then stop the `port-forward` process from the first terminal window.

### Verifying traces from the sample application

Run

```
QUERY=`kubectl get po --selector=app=jaeger,component=query -n jaeger -o jsonpath='{.items[0].metadata.name}'` && kubectl port-forward $QUERY 16686:16686
```

Then browse to http://localhost:16686, to interact with the dashboard. If set up properly, you should see traces from the "say-hello" service.