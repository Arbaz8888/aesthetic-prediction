import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://brmujlepxhlabvonxmen.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJybXVqbGVweGhsYWJ2b254bWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwOTIxNjcsImV4cCI6MjA1OTY2ODE2N30.Y1ay0YDlb6n7tiNvwztNjzzEzeWynq4QYQAn5ElFrTc'
);
