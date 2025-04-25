terraform {
  required_providers {
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.0.0"
    }
  }
  required_version = ">= 1.0.0"
}

provider "supabase" {
  access_token = var.supabase_access_token
}

# Reference the existing project
resource "supabase_project" "jild_project" {
  name             = var.existing_project_name
  database_password = "DO_NOT_CHANGE_THIS"  # Required but won't change existing password
  organization_id  = "nusefjyyiopderctchiq" # Your organization slug
  region           = "us-east-1"            # Specify the region where your project exists

  # Set this to true to prevent accidental deletion
  lifecycle {
    prevent_destroy = true
    ignore_changes = [
      # Ignore changes to these fields to prevent accidental updates
      database_password,
      region
    ]
  }
}

# Since direct SQL execution might not be supported via terraform resources,
# we'll need to use alternative approaches for schema management
