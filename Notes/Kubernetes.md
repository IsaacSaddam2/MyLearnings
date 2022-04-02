### Notes

- Build by google
- Its a open source project, and best container orchestrator
- 'The Matrix From Hell' when compatible issue arises choosing tech stack
- To run kubernetes cluster 
    Minikube - local
    Azure - Cloud
    www.KodeKloud.com  practice
## Containers
- Docker uses LXC containers
- Docker resolved compatibility issues across various components and helps developer to set up dev, prod environ with one single command

## Clusters
- Node is an instance running
- cluster of nodes required when if one node fails the load is transferred to other
- to manage this Master is required
- Master responsible for orchestration of containers on the worker nodes
- when you install kubernetes you get
    1.Api server  (frontend)
    2.etcd  (key value store)
    3.kubelet (agent taht runs on each node)
    4.container runtime (docker)
    5.controller (when api goes down it will responds, brings up new containers)
    6.scheduler (assign containers to nodes)

### Master Servers vs Worker Nodes Server

## Master
- kube-apiserver (interact with node)
- etcd
- controller
- scheduler


## Worker Node
- kubelet (interacts with master)
- container runtime (docker)

### Kubectl (Kube command line tool/ control)
- used to deploy and manage application on kubernetes cluster

### Minkube

- bundles all the components required in Kubernetes Cluster( server,etcd, runtime, controller) into one image (iso)
- it can be downloaded from online
- must hae hypervisor installed  on your machine
- must have kvm for linux
- must have kubectl to ineract with k=cluster 
- must install minikube.exe
