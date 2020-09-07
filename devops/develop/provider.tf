provider "google" {
 credentials = file("creds.json")
 project     = "capital-group-infra"
 region      = "us-east1"
}
   
data "google_client_config" "provider" {}

data "google_container_cluster" "my_cluster" {
  name     = "testcluster"
  location = "us-east1"
}

provider "kubernetes" {
  load_config_file = false

  host  = "https://${data.google_container_cluster.my_cluster.endpoint}"
  token = data.google_client_config.provider.access_token
  cluster_ca_certificate = base64decode(
    data.google_container_cluster.my_cluster.master_auth[0].cluster_ca_certificate,
  )
}