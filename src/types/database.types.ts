export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      constituent_submissions: {
        Row: {
          admin_notes: string | null
          attachment_urls: string[] | null
          barangay: string
          contact_number: string
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          message: string
          municipality: string
          program_category: string | null
          reference_code: string
          resolved_at: string | null
          status: string
          subject: string
          type: string
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          attachment_urls?: string[] | null
          barangay: string
          contact_number: string
          created_at?: string | null
          email?: string | null
          full_name: string
          id?: string
          message: string
          municipality: string
          program_category?: string | null
          reference_code: string
          resolved_at?: string | null
          status?: string
          subject: string
          type: string
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          attachment_urls?: string[] | null
          barangay?: string
          contact_number?: string
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          message?: string
          municipality?: string
          program_category?: string | null
          reference_code?: string
          resolved_at?: string | null
          status?: string
          subject?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      gallery_albums: {
        Row: {
          category: string
          cover_image_url: string
          created_at: string | null
          description_ceb: string | null
          description_en: string | null
          display_order: number
          event_date: string | null
          id: string
          municipality: string | null
          title_ceb: string
          title_en: string
          updated_at: string | null
        }
        Insert: {
          category?: string
          cover_image_url: string
          created_at?: string | null
          description_ceb?: string | null
          description_en?: string | null
          display_order?: number
          event_date?: string | null
          id?: string
          municipality?: string | null
          title_ceb: string
          title_en: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          cover_image_url?: string
          created_at?: string | null
          description_ceb?: string | null
          description_en?: string | null
          display_order?: number
          event_date?: string | null
          id?: string
          municipality?: string | null
          title_ceb?: string
          title_en?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      gallery_media: {
        Row: {
          album_id: string | null
          caption_ceb: string | null
          caption_en: string | null
          created_at: string | null
          display_order: number
          id: string
          media_type: string
          media_url: string
          tags: string[] | null
          thumbnail_url: string | null
        }
        Insert: {
          album_id?: string | null
          caption_ceb?: string | null
          caption_en?: string | null
          created_at?: string | null
          display_order?: number
          id?: string
          media_type?: string
          media_url: string
          tags?: string[] | null
          thumbnail_url?: string | null
        }
        Update: {
          album_id?: string | null
          caption_ceb?: string | null
          caption_en?: string | null
          created_at?: string | null
          display_order?: number
          id?: string
          media_type?: string
          media_url?: string
          tags?: string[] | null
          thumbnail_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gallery_media_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "gallery_albums"
            referencedColumns: ["id"]
          },
        ]
      }
      hotlines_directory: {
        Row: {
          contact_person: string | null
          created_at: string | null
          display_order: number
          email: string | null
          id: string
          is_emergency: boolean | null
          municipality: string
          office_name_ceb: string
          office_name_en: string
          phone_numbers: string[]
          updated_at: string | null
        }
        Insert: {
          contact_person?: string | null
          created_at?: string | null
          display_order?: number
          email?: string | null
          id?: string
          is_emergency?: boolean | null
          municipality: string
          office_name_ceb: string
          office_name_en: string
          phone_numbers?: string[]
          updated_at?: string | null
        }
        Update: {
          contact_person?: string | null
          created_at?: string | null
          display_order?: number
          email?: string | null
          id?: string
          is_emergency?: boolean | null
          municipality?: string
          office_name_ceb?: string
          office_name_en?: string
          phone_numbers?: string[]
          updated_at?: string | null
        }
        Relationships: []
      }
      impact_metrics: {
        Row: {
          category: string
          created_at: string | null
          description_ceb: string
          description_en: string
          display_order: number
          icon_name: string
          id: string
          is_active: boolean | null
          metric_key: string
          suffix: string | null
          title_ceb: string
          title_en: string
          updated_at: string | null
          value_numeric: number
        }
        Insert: {
          category?: string
          created_at?: string | null
          description_ceb: string
          description_en: string
          display_order?: number
          icon_name?: string
          id?: string
          is_active?: boolean | null
          metric_key: string
          suffix?: string | null
          title_ceb: string
          title_en: string
          updated_at?: string | null
          value_numeric: number
        }
        Update: {
          category?: string
          created_at?: string | null
          description_ceb?: string
          description_en?: string
          display_order?: number
          icon_name?: string
          id?: string
          is_active?: boolean | null
          metric_key?: string
          suffix?: string | null
          title_ceb?: string
          title_en?: string
          updated_at?: string | null
          value_numeric?: number
        }
        Relationships: []
      }
      map_locations: {
        Row: {
          address: string
          category: string
          created_at: string | null
          description_ceb: string | null
          description_en: string | null
          id: string
          is_active: boolean | null
          latitude: number
          longitude: number
          municipality: string
          operating_hours: string | null
          phone: string | null
          title_ceb: string
          title_en: string
          updated_at: string | null
        }
        Insert: {
          address: string
          category: string
          created_at?: string | null
          description_ceb?: string | null
          description_en?: string | null
          id?: string
          is_active?: boolean | null
          latitude: number
          longitude: number
          municipality: string
          operating_hours?: string | null
          phone?: string | null
          title_ceb: string
          title_en: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          category?: string
          created_at?: string | null
          description_ceb?: string | null
          description_en?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number
          longitude?: number
          municipality?: string
          operating_hours?: string | null
          phone?: string | null
          title_ceb?: string
          title_en?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      news_announcements: {
        Row: {
          attachment_url: string | null
          author: string
          category: string
          content_ceb: string
          content_en: string
          created_at: string
          excerpt_ceb: string
          excerpt_en: string
          id: string
          image_url: string | null
          is_pinned: boolean
          is_published: boolean
          priority: string
          publish_date: string
          target_towns: string[] | null
          title_ceb: string
          title_en: string
          updated_at: string
        }
        Insert: {
          attachment_url?: string | null
          author?: string
          category?: string
          content_ceb: string
          content_en: string
          created_at?: string
          excerpt_ceb: string
          excerpt_en: string
          id?: string
          image_url?: string | null
          is_pinned?: boolean
          is_published?: boolean
          priority?: string
          publish_date?: string
          target_towns?: string[] | null
          title_ceb: string
          title_en: string
          updated_at?: string
        }
        Update: {
          attachment_url?: string | null
          author?: string
          category?: string
          content_ceb?: string
          content_en?: string
          created_at?: string
          excerpt_ceb?: string
          excerpt_en?: string
          id?: string
          image_url?: string | null
          is_pinned?: boolean
          is_published?: boolean
          priority?: string
          publish_date?: string
          target_towns?: string[] | null
          title_ceb?: string
          title_en?: string
          updated_at?: string
        }
        Relationships: []
      }
      programs_advocacies: {
        Row: {
          category: string
          cover_image_url: string | null
          created_at: string | null
          display_order: number
          full_description_ceb: string
          full_description_en: string
          icon_name: string
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          requirements_ceb: string[]
          requirements_en: string[]
          slug: string
          summary_ceb: string
          summary_en: string
          title_ceb: string
          title_en: string
          updated_at: string | null
        }
        Insert: {
          category: string
          cover_image_url?: string | null
          created_at?: string | null
          display_order?: number
          full_description_ceb: string
          full_description_en: string
          icon_name?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          requirements_ceb?: string[]
          requirements_en?: string[]
          slug: string
          summary_ceb: string
          summary_en: string
          title_ceb: string
          title_en: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          cover_image_url?: string | null
          created_at?: string | null
          display_order?: number
          full_description_ceb?: string
          full_description_en?: string
          icon_name?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          requirements_ceb?: string[]
          requirements_en?: string[]
          slug?: string
          summary_ceb?: string
          summary_en?: string
          title_ceb?: string
          title_en?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          bio_summary_ceb: string
          bio_summary_en: string
          congresswoman_name: string
          created_at: string | null
          district_title_ceb: string
          district_title_en: string
          facebook_page_alexie_b_tutor: string
          facebook_page_alexie_besas_tutor: string
          facebook_page_ptv_official: string
          facebook_page_team_kumbati: string
          hero_headline_ceb: string
          hero_headline_en: string
          hero_subtext_ceb: string
          hero_subtext_en: string
          id: string
          main_office_address: string
          main_office_phone: string
          official_email: string
          updated_at: string | null
        }
        Insert: {
          bio_summary_ceb: string
          bio_summary_en: string
          congresswoman_name?: string
          created_at?: string | null
          district_title_ceb?: string
          district_title_en?: string
          facebook_page_alexie_b_tutor: string
          facebook_page_alexie_besas_tutor: string
          facebook_page_ptv_official: string
          facebook_page_team_kumbati: string
          hero_headline_ceb?: string
          hero_headline_en?: string
          hero_subtext_ceb: string
          hero_subtext_en: string
          id?: string
          main_office_address: string
          main_office_phone: string
          official_email?: string
          updated_at?: string | null
        }
        Update: {
          bio_summary_ceb?: string
          bio_summary_en?: string
          congresswoman_name?: string
          created_at?: string | null
          district_title_ceb?: string
          district_title_en?: string
          facebook_page_alexie_b_tutor?: string
          facebook_page_alexie_besas_tutor?: string
          facebook_page_ptv_official?: string
          facebook_page_team_kumbati?: string
          hero_headline_ceb?: string
          hero_headline_en?: string
          hero_subtext_ceb?: string
          hero_subtext_en?: string
          id?: string
          main_office_address?: string
          main_office_phone?: string
          official_email?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

