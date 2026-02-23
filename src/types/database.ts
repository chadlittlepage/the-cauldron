// Supabase Database Types - will be generated with `supabase gen types typescript`
// Placeholder until Supabase project is created

export type UserRole = 'artist' | 'curator' | 'admin';

export type SubmissionStatus = 'pending' | 'in_review' | 'accepted' | 'rejected';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string;
          role: UserRole;
          avatar_url: string | null;
          bio: string | null;
          listener_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      submissions: {
        Row: {
          id: string;
          artist_id: string;
          track_title: string;
          track_url: string;
          platform: 'bandcamp' | 'spotify' | 'soundcloud' | 'other';
          genre: string;
          description: string | null;
          status: SubmissionStatus;
          payment_id: string | null;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['submissions']['Row'],
          'id' | 'created_at' | 'updated_at' | 'status'
        >;
        Update: Partial<Database['public']['Tables']['submissions']['Insert']>;
      };
      votes: {
        Row: {
          id: string;
          submission_id: string;
          voter_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['votes']['Row'], 'id' | 'created_at'>;
        Update: never;
      };
      reviews: {
        Row: {
          id: string;
          submission_id: string;
          curator_id: string;
          rating: number;
          feedback: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['reviews']['Row'],
          'id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>;
      };
      charts: {
        Row: {
          id: string;
          submission_id: string;
          chart_type: 'monthly' | 'yearly';
          period: string;
          rank: number;
          vote_count: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['charts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['charts']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      submission_status: SubmissionStatus;
    };
  };
}
