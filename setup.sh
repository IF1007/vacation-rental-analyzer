sudo chmod +x ./elk-setup.sh
./elk-setup.sh install kibana
./elk-setup.sh install elasticsearch
./elk-setup.sh install filebeat
./elk-setup.sh install metricbeat

helm install promstack kube-prometheus-stack-10.1.1.tgz
sudo chmod +x ./port-forwarding
./port-forwarding.sh &

kubectl -f apply elk/crawler-cronjob.yaml