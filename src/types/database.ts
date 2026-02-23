export type UserRole = 'artist' | 'curator' | 'admin';

export type SubmissionStatus = 'pending' | 'in_review' | 'accepted' | 'rejected';

export type MusicPlatform = 'spotify' | 'soundcloud' | 'bandcamp' | 'other';

export type ChartType = 'monthly' | 'yearly';

export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded';

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
        Insert: Omit<
          Database['public']['Tables']['profiles']['Row'],
          'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
        Relationships: [];
      };
      submissions: {
        Row: {
          id: string;
          artist_id: string;
          track_title: string;
          track_url: string;
          platform: MusicPlatform;
          genre: string;
          description: string | null;
          status: SubmissionStatus;
          payment_id: string | null;
          paid_at: string | null;
          vote_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['submissions']['Row'],
          'id' | 'created_at' | 'updated_at' | 'status' | 'vote_count'
        >;
        Update: Partial<Database['public']['Tables']['submissions']['Insert']> & {
          status?: SubmissionStatus;
        };
        Relationships: [
          {
            foreignKeyName: 'submissions_artist_id_fkey';
            columns: ['artist_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: 'votes_submission_id_fkey';
            columns: ['submission_id'];
            isOneToOne: false;
            referencedRelation: 'submissions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'votes_voter_id_fkey';
            columns: ['voter_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: 'reviews_submission_id_fkey';
            columns: ['submission_id'];
            isOneToOne: false;
            referencedRelation: 'submissions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_curator_id_fkey';
            columns: ['curator_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      charts: {
        Row: {
          id: string;
          submission_id: string;
          chart_type: ChartType;
          period: string;
          rank: number;
          vote_count: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['charts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['charts']['Insert']>;
        Relationships: [
          {
            foreignKeyName: 'charts_submission_id_fkey';
            columns: ['submission_id'];
            isOneToOne: false;
            referencedRelation: 'submissions';
            referencedColumns: ['id'];
          },
        ];
      };
      payments: {
        Row: {
          id: string;
          submission_id: string;
          user_id: string;
          stripe_session_id: string;
          stripe_payment_intent_id: string | null;
          amount_cents: number;
          currency: string;
          status: PaymentStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['payments']['Row'],
          'id' | 'created_at' | 'updated_at' | 'status'
        >;
        Update: Partial<Database['public']['Tables']['payments']['Insert']> & {
          status?: PaymentStatus;
        };
        Relationships: [
          {
            foreignKeyName: 'payments_submission_id_fkey';
            columns: ['submission_id'];
            isOneToOne: false;
            referencedRelation: 'submissions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payments_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      curator_payouts: {
        Row: {
          id: string;
          curator_id: string;
          amount_cents: number;
          currency: string;
          stripe_transfer_id: string | null;
          review_count: number;
          period: string;
          paid_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['curator_payouts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['curator_payouts']['Insert']>;
        Relationships: [
          {
            foreignKeyName: 'curator_payouts_curator_id_fkey';
            columns: ['curator_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_submission_details: {
        Args: { p_submission_id: string };
        Returns: Array<{
          id: string;
          artist_id: string;
          artist_name: string;
          track_title: string;
          track_url: string;
          platform: MusicPlatform;
          genre: string;
          description: string | null;
          status: SubmissionStatus;
          vote_count: number;
          review_count: number;
          avg_rating: number | null;
          created_at: string;
        }>;
      };
      get_curator_stats: {
        Args: { p_curator_id: string };
        Returns: Array<{
          total_reviews: number;
          avg_rating: number | null;
          total_earnings_cents: number;
        }>;
      };
      has_voted: {
        Args: { p_submission_id: string; p_user_id: string };
        Returns: boolean;
      };
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      get_submissions_by_genre: {
        Args: Record<string, never>;
        Returns: Array<{ genre: string; count: number }>;
      };
      get_submissions_by_month: {
        Args: Record<string, never>;
        Returns: Array<{ month: string; count: number }>;
      };
      get_top_curators: {
        Args: Record<string, never>;
        Returns: Array<{
          curator_id: string;
          display_name: string;
          review_count: number;
          avg_rating: number;
        }>;
      };
      get_revenue_by_month: {
        Args: Record<string, never>;
        Returns: Array<{ month: string; revenue_cents: number }>;
      };
    };
    Enums: {
      user_role: UserRole;
      submission_status: SubmissionStatus;
      music_platform: MusicPlatform;
      chart_type: ChartType;
      payment_status: PaymentStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];
