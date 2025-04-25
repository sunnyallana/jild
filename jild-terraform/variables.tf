variable "supabase_access_token" {
  description = "Supabase Management API Access Token"
  type        = string
  sensitive   = true
}

variable "existing_project_ref" {
  description = "Existing Supabase project reference ID"
  type        = string
  default     = "qhalszvvsnxmemplmojn"
}

variable "existing_project_name" {
  description = "Name of existing Supabase project"
  type        = string
  default     = "jild"
}

variable "existing_supabase_url" {
  description = "URL of existing Supabase project"
  type        = string
  default     = "https://qhalszvvsnxmemplmojn.supabase.co"
}

variable "existing_supabase_anon_key" {
  description = "Anon key of existing Supabase project"
  type        = string
  sensitive   = true
}
