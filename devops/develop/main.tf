module "lpfeed" {
    source = "../modules/lpfeed/"
    image = var.image
    replica_count = var.replica_count
    service_type = var.service_type
    containerport = var.containerport
    targetport = var.targetport
    namespace = var.namespace
}