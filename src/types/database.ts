export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.1';
  };
  public: {
    Tables: {
      admin_audit_logs: {
        Row: {
          action: Database['public']['Enums']['audit_action'];
          admin_id: string;
          created_at: string;
          id: string;
          metadata: Json | null;
          target_id: string;
          target_type: string;
        };
        Insert: {
          action: Database['public']['Enums']['audit_action'];
          admin_id: string;
          created_at?: string;
          id?: string;
          metadata?: Json | null;
          target_id: string;
          target_type: string;
        };
        Update: {
          action?: Database['public']['Enums']['audit_action'];
          admin_id?: string;
          created_at?: string;
          id?: string;
          metadata?: Json | null;
          target_id?: string;
          target_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'admin_audit_logs_admin_id_fkey';
            columns: ['admin_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      charts: {
        Row: {
          chart_type: Database['public']['Enums']['chart_type'];
          created_at: string;
          id: string;
          period: string;
          rank: number;
          submission_id: string;
          vote_count: number;
        };
        Insert: {
          chart_type: Database['public']['Enums']['chart_type'];
          created_at?: string;
          id?: string;
          period: string;
          rank: number;
          submission_id: string;
          vote_count?: number;
        };
        Update: {
          chart_type?: Database['public']['Enums']['chart_type'];
          created_at?: string;
          id?: string;
          period?: string;
          rank?: number;
          submission_id?: string;
          vote_count?: number;
        };
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
      curator_payouts: {
        Row: {
          amount_cents: number;
          created_at: string;
          curator_id: string;
          currency: string;
          id: string;
          paid_at: string | null;
          period: string;
          review_count: number;
          stripe_transfer_id: string | null;
        };
        Insert: {
          amount_cents: number;
          created_at?: string;
          curator_id: string;
          currency?: string;
          id?: string;
          paid_at?: string | null;
          period: string;
          review_count?: number;
          stripe_transfer_id?: string | null;
        };
        Update: {
          amount_cents?: number;
          created_at?: string;
          curator_id?: string;
          currency?: string;
          id?: string;
          paid_at?: string | null;
          period?: string;
          review_count?: number;
          stripe_transfer_id?: string | null;
        };
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
      payments: {
        Row: {
          amount_cents: number;
          created_at: string;
          currency: string;
          id: string;
          status: Database['public']['Enums']['payment_status'];
          stripe_payment_intent_id: string | null;
          stripe_session_id: string;
          submission_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          amount_cents: number;
          created_at?: string;
          currency?: string;
          id?: string;
          status?: Database['public']['Enums']['payment_status'];
          stripe_payment_intent_id?: string | null;
          stripe_session_id: string;
          submission_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          amount_cents?: number;
          created_at?: string;
          currency?: string;
          id?: string;
          status?: Database['public']['Enums']['payment_status'];
          stripe_payment_intent_id?: string | null;
          stripe_session_id?: string;
          submission_id?: string;
          updated_at?: string;
          user_id?: string;
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
      profiles: {
        Row: {
          accepting_submissions: boolean;
          avatar_url: string | null;
          bio: string | null;
          contact_email: string | null;
          created_at: string;
          display_name: string;
          email: string;
          genres: string[];
          id: string;
          instagram_handle: string | null;
          listener_count: number;
          looking_for: string | null;
          role: Database['public']['Enums']['user_role'];
          tiktok_handle: string | null;
          updated_at: string;
          website_url: string | null;
        };
        Insert: {
          accepting_submissions?: boolean;
          avatar_url?: string | null;
          bio?: string | null;
          contact_email?: string | null;
          created_at?: string;
          display_name: string;
          email: string;
          genres?: string[];
          id: string;
          instagram_handle?: string | null;
          listener_count?: number;
          looking_for?: string | null;
          role?: Database['public']['Enums']['user_role'];
          tiktok_handle?: string | null;
          updated_at?: string;
          website_url?: string | null;
        };
        Update: {
          accepting_submissions?: boolean;
          avatar_url?: string | null;
          bio?: string | null;
          contact_email?: string | null;
          created_at?: string;
          display_name?: string;
          email?: string;
          genres?: string[];
          id?: string;
          instagram_handle?: string | null;
          listener_count?: number;
          looking_for?: string | null;
          role?: Database['public']['Enums']['user_role'];
          tiktok_handle?: string | null;
          updated_at?: string;
          website_url?: string | null;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          created_at: string;
          curator_id: string;
          feedback: string;
          id: string;
          rating: number;
          submission_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          curator_id: string;
          feedback: string;
          id?: string;
          rating: number;
          submission_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          curator_id?: string;
          feedback?: string;
          id?: string;
          rating?: number;
          submission_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_curator_id_fkey';
            columns: ['curator_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_submission_id_fkey';
            columns: ['submission_id'];
            isOneToOne: false;
            referencedRelation: 'submissions';
            referencedColumns: ['id'];
          },
        ];
      };
      submissions: {
        Row: {
          artist_id: string;
          created_at: string;
          description: string | null;
          genre: string;
          id: string;
          paid_at: string | null;
          payment_id: string | null;
          platform: Database['public']['Enums']['music_platform'];
          status: Database['public']['Enums']['submission_status'];
          track_title: string;
          track_url: string;
          updated_at: string;
          vote_count: number;
        };
        Insert: {
          artist_id: string;
          created_at?: string;
          description?: string | null;
          genre: string;
          id?: string;
          paid_at?: string | null;
          payment_id?: string | null;
          platform?: Database['public']['Enums']['music_platform'];
          status?: Database['public']['Enums']['submission_status'];
          track_title: string;
          track_url: string;
          updated_at?: string;
          vote_count?: number;
        };
        Update: {
          artist_id?: string;
          created_at?: string;
          description?: string | null;
          genre?: string;
          id?: string;
          paid_at?: string | null;
          payment_id?: string | null;
          platform?: Database['public']['Enums']['music_platform'];
          status?: Database['public']['Enums']['submission_status'];
          track_title?: string;
          track_url?: string;
          updated_at?: string;
          vote_count?: number;
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
          created_at: string;
          id: string;
          submission_id: string;
          voter_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          submission_id: string;
          voter_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          submission_id?: string;
          voter_id?: string;
        };
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
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      generate_monthly_chart: { Args: { p_period: string }; Returns: undefined };
      generate_yearly_chart: { Args: { p_year: string }; Returns: undefined };
      get_artist_curator_decisions: {
        Args: { p_artist_id: string };
        Returns: {
          accepted: number;
          month: string;
          pending: number;
          rejected: number;
        }[];
      };
      get_artist_genre_distribution: {
        Args: { p_artist_id: string };
        Returns: {
          count: number;
          genre: string;
        }[];
      };
      get_artist_placements: {
        Args: { p_artist_id: string };
        Returns: {
          count: number;
        }[];
      };
      get_artist_ratings_distribution: {
        Args: { p_artist_id: string };
        Returns: {
          count: number;
          rating: number;
        }[];
      };
      get_artist_submissions_by_month: {
        Args: { p_artist_id: string };
        Returns: {
          count: number;
          month: string;
        }[];
      };
      get_artist_tier_breakdown: {
        Args: { p_artist_id: string };
        Returns: {
          count: number;
          tier: string;
          total_cents: number;
        }[];
      };
      get_artist_total_spent: {
        Args: { p_artist_id: string };
        Returns: {
          total_cents: number;
        }[];
      };
      get_artist_vote_history: {
        Args: { p_artist_id: string };
        Returns: {
          artist_name: string;
          created_at: string;
          genre: string;
          submission_id: string;
          track_title: string;
        }[];
      };
      get_artist_vote_trend: {
        Args: { p_artist_id: string };
        Returns: {
          day: string;
          upvotes: number;
        }[];
      };
      get_curator_earnings_by_month: {
        Args: { p_curator_id: string };
        Returns: {
          earnings_cents: number;
          month: string;
        }[];
      };
      get_curator_genre_performance: {
        Args: { p_curator_id: string };
        Returns: {
          avg_rating: number;
          genre: string;
          reviews: number;
        }[];
      };
      get_curator_reviews_by_month: {
        Args: { p_curator_id: string };
        Returns: {
          count: number;
          month: string;
        }[];
      };
      get_curator_stats: {
        Args: { p_curator_id: string };
        Returns: {
          avg_rating: number;
          total_earnings_cents: number;
          total_reviews: number;
        }[];
      };
      get_revenue_by_month: {
        Args: never;
        Returns: {
          month: string;
          revenue_cents: number;
        }[];
      };
      get_submission_details: {
        Args: { p_submission_id: string };
        Returns: {
          artist_id: string;
          artist_name: string;
          avg_rating: number;
          created_at: string;
          description: string;
          genre: string;
          id: string;
          platform: Database['public']['Enums']['music_platform'];
          review_count: number;
          status: Database['public']['Enums']['submission_status'];
          track_title: string;
          track_url: string;
          vote_count: number;
        }[];
      };
      get_submissions_by_genre: {
        Args: never;
        Returns: {
          count: number;
          genre: string;
        }[];
      };
      get_submissions_by_month: {
        Args: never;
        Returns: {
          count: number;
          month: string;
        }[];
      };
      get_top_curators: {
        Args: never;
        Returns: {
          avg_rating: number;
          curator_id: string;
          display_name: string;
          review_count: number;
        }[];
      };
      has_voted: {
        Args: { p_submission_id: string; p_user_id: string };
        Returns: boolean;
      };
      is_admin: { Args: never; Returns: boolean };
    };
    Enums: {
      audit_action:
        | 'submission_status_change'
        | 'curator_role_change'
        | 'payout_created'
        | 'profile_updated'
        | 'submission_deleted'
        | 'manual_action';
      chart_type: 'monthly' | 'yearly';
      music_platform: 'spotify' | 'soundcloud' | 'bandcamp' | 'other';
      payment_status: 'pending' | 'succeeded' | 'failed' | 'refunded';
      submission_status: 'pending' | 'in_review' | 'accepted' | 'rejected';
      user_role: 'artist' | 'curator' | 'admin';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// Convenience type aliases used across the codebase
export type UserRole = Database['public']['Enums']['user_role'];
export type SubmissionStatus = Database['public']['Enums']['submission_status'];
export type MusicPlatform = Database['public']['Enums']['music_platform'];
export type ChartType = Database['public']['Enums']['chart_type'];
export type PaymentStatus = Database['public']['Enums']['payment_status'];
export type AuditAction = Database['public']['Enums']['audit_action'];

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type InsertTables<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type UpdateTables<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;
