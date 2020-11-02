# Vacation Rental Analyzer
VRA is a TypeScript crawler that can get information on room vacancy from a list of Airbnb room numbers, then, ideally, analyze this data through the use of microservices such as Kibana. Helm artifacts were used for most of the structure of the project.

Project started as docker-compose, became a GKE cluster with manually configured builds, which then were readapted into custom Helm charts, then resignated into using Helm artifacts with custom values due to intercommunication issues, but lost a considerable amount of control in the way.

# Architecture
![](chart.png)

# Setup

1. Prepare a Docker environment with kubectl and helm

2. Execute the script:  

    ```./setup.sh```

3. Access Kibana on http://localhost:5601/

4. Prepare the metrics and go to the Discover page

# Helms

Project uses a local version of [kube-prometheus-stack](https://artifacthub.io/packages/helm/prometheus-community/kube-prometheus-stack/10.0.1) with Prometheus, Grafana, AlertManager and more.  

Helm artifacts from [elastic](https://helm.elastic.co) for Elastic Search, Kibana, FileBeat and MetricBeat also were used.


# Relevant references

[Logging In The Cloud-Native Age](https://www.magalix.com/blog/kubernetes-observability-log-aggregation-using-elk-stack)

[How to Deploy the Elastic Stack on Kubernetes](https://www.linode.com/docs/guides/how-to-deploy-the-elastic-stack-on-kubernetes/)

[Deploying the ELK Stack on Kubernetes with Helm](https://logz.io/blog/deploying-the-elk-stack-on-kubernetes-with-helm/)

[Deploy Logstash and Filebeat On Kubernetes With ECK and SSL](https://medium.com/@raphaeldelio/deploy-logstash-and-filebeat-on-kubernetes-with-eck-ssl-and-filebeat-d9f616737390)

[Enabling Observability in Kubernetes with Prometheus, Elasticsearch, and Grafana](https://qbox.io/blog/enabling-observability-in-kubernetes-with-prometheus-elasticsearch-and-grafana/)

[How To Monitor Kubernetes With Prometheus](https://phoenixnap.com/kb/prometheus-kubernetes-monitoring)


