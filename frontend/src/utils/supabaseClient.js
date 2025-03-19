import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://tzrxqwugdqdhjzjyaybp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cnhxd3VnZHFkaGp6anlheWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMTk5ODksImV4cCI6MjA1Nzc5NTk4OX0.W8lWQ7eUdujeowgXj9U55gEoItWOd0YWwKIvAMGubR4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

