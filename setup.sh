sudo chmod +x ./elk-setup.sh

helm repo add elastic https://helm.elastic.co
./elk-setup.sh install kibana
./elk-setup.sh install elasticsearch
./elk-setup.sh install filebeat
./elk-setup.sh install metricbeat

minikube addons enable metrics-server
minikube addons enable dashboard

helm install promstack kube-prometheus-stack-10.1.1.tgz
kubectl apply -f elk/crawler-cronjob.yaml

sudo chmod +x ./port-forwarding
./port-forwarding.sh &
