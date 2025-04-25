output "supabase_project_ref" {
  description = "The reference ID of the Supabase project"
  value       = supabase_project.jild_project.id
}

output "supabase_project_name" {
  description = "The name of the Supabase project"
  value       = supabase_project.jild_project.name
}

output "supabase_api_endpoint" {
  description = "The API endpoint of the Supabase project"
  value       = var.existing_supabase_url
}
