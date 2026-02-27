-- Enable pg_trgm for fast substring search (replaces sequential scan from ilike '%term%')
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- GIN indexes for trigram-based substring matching on submissions
CREATE INDEX idx_submissions_track_title_trgm ON submissions USING GIN (track_title gin_trgm_ops);
CREATE INDEX idx_submissions_genre_trgm ON submissions USING GIN (genre gin_trgm_ops);
CREATE INDEX idx_submissions_artist_name_trgm ON submissions USING GIN (artist_name gin_trgm_ops);
