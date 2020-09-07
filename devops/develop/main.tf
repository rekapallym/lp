module "lpfeed" {
    source = "../modules/lpfeed/"
    image = var.image_name
    replica_count = var.replicas
    service_type = var.servicetype
    containerport = var.containerport
    targetport = var.targetport
    namespace = var.namespace
}