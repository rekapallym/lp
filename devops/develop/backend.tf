terraform {
  backend "gcs" {
    bucket  = "tf-statefiles"
    prefix  = "develop/lpfeed/"
    credentials = "creds.json"
  }
}