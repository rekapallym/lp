locals {
  service = "lpfeed"
  app_name = "${local.service}-app"
  app_metadata_name = "${local.service}-deployment"
  service_name = "${local.service}-service"
}

resource "kubernetes_deployment" "lpfeed_deploy" {
  metadata {
    name = local.app_metadata_name
    labels = {
      app = local.app_name
    }
    namespace = var.namespace
  }

  spec {
    replicas = var.replica_count

    selector {
      match_labels = {
        app = local.app_name
      }
    }

    template {
      metadata {
        labels = {
          app = local.app_name
        }
      }

      spec {
        image_pull_secrets {
          name = "gitlab-auth"
        }
        container {
          image = var.image
          name  = "${local.service}-pod"
          port {
            container_port = var.containerport
          }
          resources {
            limits {
              cpu    = "0.5"
              memory = "512Mi"
            }
            requests {
              cpu    = "250m"
              memory = "50Mi"
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "lpfeed_service" {
  metadata {
    name      = local.service_name
    namespace = var.namespace
  }

  spec {
    selector = {
      app = local.app_name
    }

    port {
      name     = "http"
      port     = var.containerport
      target_port = var.targetport
    }

    type = var.service_type

  }
  depends_on = [
    kubernetes_deployment.lpfeed_deploy,
  ]  
}

