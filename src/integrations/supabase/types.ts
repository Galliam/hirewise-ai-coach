export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      application_activities: {
        Row: {
          activity_type: string
          application_id: string | null
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          new_status: Database["public"]["Enums"]["application_status"] | null
          old_status: Database["public"]["Enums"]["application_status"] | null
          recruiter_id: string | null
        }
        Insert: {
          activity_type: string
          application_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          new_status?: Database["public"]["Enums"]["application_status"] | null
          old_status?: Database["public"]["Enums"]["application_status"] | null
          recruiter_id?: string | null
        }
        Update: {
          activity_type?: string
          application_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          new_status?: Database["public"]["Enums"]["application_status"] | null
          old_status?: Database["public"]["Enums"]["application_status"] | null
          recruiter_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_activities_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_activities_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          applicant_id: string | null
          application_insights: Json | null
          applied_at: string | null
          id: string
          job_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          applicant_id?: string | null
          application_insights?: Json | null
          applied_at?: string | null
          id?: string
          job_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          applicant_id?: string | null
          application_insights?: Json | null
          applied_at?: string | null
          id?: string
          job_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_documents: {
        Row: {
          applicant_id: string | null
          application_id: string | null
          document_type: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          mime_type: string | null
          uploaded_at: string | null
        }
        Insert: {
          applicant_id?: string | null
          application_id?: string | null
          document_type: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          mime_type?: string | null
          uploaded_at?: string | null
        }
        Update: {
          applicant_id?: string | null
          application_id?: string | null
          document_type?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          mime_type?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_documents_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      career_updates: {
        Row: {
          candidate_id: string
          company: string | null
          created_at: string
          description: string | null
          id: string
          title: string
          update_type: string
        }
        Insert: {
          candidate_id: string
          company?: string | null
          created_at?: string
          description?: string | null
          id?: string
          title: string
          update_type: string
        }
        Update: {
          candidate_id?: string
          company?: string | null
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          update_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "career_updates_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_schedules: {
        Row: {
          application_id: string | null
          candidate_feedback: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          interview_type: string
          interviewer_notes: string | null
          location: string | null
          scheduled_at: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          application_id?: string | null
          candidate_feedback?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          interview_type: string
          interviewer_notes?: string | null
          location?: string | null
          scheduled_at: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          application_id?: string | null
          candidate_feedback?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          interview_type?: string
          interviewer_notes?: string | null
          location?: string | null
          scheduled_at?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_schedules_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      job_matching_preferences: {
        Row: {
          best_contact_time: string | null
          company_culture_weight: number | null
          contact_preferences: string[] | null
          created_at: string | null
          deal_breakers: string[] | null
          growth_opportunities_weight: number | null
          id: string
          job_seeker_id: string | null
          location_weight: number | null
          role_responsibilities_weight: number | null
          salary_weight: number | null
          updated_at: string | null
          work_life_balance_weight: number | null
        }
        Insert: {
          best_contact_time?: string | null
          company_culture_weight?: number | null
          contact_preferences?: string[] | null
          created_at?: string | null
          deal_breakers?: string[] | null
          growth_opportunities_weight?: number | null
          id?: string
          job_seeker_id?: string | null
          location_weight?: number | null
          role_responsibilities_weight?: number | null
          salary_weight?: number | null
          updated_at?: string | null
          work_life_balance_weight?: number | null
        }
        Update: {
          best_contact_time?: string | null
          company_culture_weight?: number | null
          contact_preferences?: string[] | null
          created_at?: string | null
          deal_breakers?: string[] | null
          growth_opportunities_weight?: number | null
          id?: string
          job_seeker_id?: string | null
          location_weight?: number | null
          role_responsibilities_weight?: number | null
          salary_weight?: number | null
          updated_at?: string | null
          work_life_balance_weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_matching_preferences_job_seeker_id_fkey"
            columns: ["job_seeker_id"]
            isOneToOne: false
            referencedRelation: "job_seeker_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_seeker_profiles: {
        Row: {
          availability: string | null
          benefits_priorities: string[] | null
          certifications: string[] | null
          company_culture: string[] | null
          company_sizes: string[] | null
          company_types: string[] | null
          created_at: string | null
          currency: string | null
          current_company: string | null
          current_title: string | null
          desired_job_title: string | null
          desired_location: string[] | null
          id: string
          industries: string[] | null
          job_seeker_status: string | null
          job_type: string[] | null
          languages: string[] | null
          linkedin_url: string | null
          onboarding_completed: boolean | null
          onboarding_step: number | null
          portfolio_url: string | null
          resume_url: string | null
          salary_max: number | null
          salary_min: number | null
          soft_skills: string[] | null
          technical_skills: string[] | null
          updated_at: string | null
          user_id: string | null
          work_environment: string[] | null
          years_experience: number | null
        }
        Insert: {
          availability?: string | null
          benefits_priorities?: string[] | null
          certifications?: string[] | null
          company_culture?: string[] | null
          company_sizes?: string[] | null
          company_types?: string[] | null
          created_at?: string | null
          currency?: string | null
          current_company?: string | null
          current_title?: string | null
          desired_job_title?: string | null
          desired_location?: string[] | null
          id?: string
          industries?: string[] | null
          job_seeker_status?: string | null
          job_type?: string[] | null
          languages?: string[] | null
          linkedin_url?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          portfolio_url?: string | null
          resume_url?: string | null
          salary_max?: number | null
          salary_min?: number | null
          soft_skills?: string[] | null
          technical_skills?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          work_environment?: string[] | null
          years_experience?: number | null
        }
        Update: {
          availability?: string | null
          benefits_priorities?: string[] | null
          certifications?: string[] | null
          company_culture?: string[] | null
          company_sizes?: string[] | null
          company_types?: string[] | null
          created_at?: string | null
          currency?: string | null
          current_company?: string | null
          current_title?: string | null
          desired_job_title?: string | null
          desired_location?: string[] | null
          id?: string
          industries?: string[] | null
          job_seeker_status?: string | null
          job_type?: string[] | null
          languages?: string[] | null
          linkedin_url?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          portfolio_url?: string | null
          resume_url?: string | null
          salary_max?: number | null
          salary_min?: number | null
          soft_skills?: string[] | null
          technical_skills?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          work_environment?: string[] | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_seeker_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          created_at: string | null
          department: string | null
          description: string | null
          id: string
          job_type: string | null
          location: string | null
          recruiter_id: string | null
          skills_required: string[] | null
          status: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          description?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          recruiter_id?: string | null
          skills_required?: string[] | null
          status?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          description?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          recruiter_id?: string | null
          skills_required?: string[] | null
          status?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          application_id: string | null
          created_at: string | null
          id: string
          message_text: string
          message_type: string | null
          read_at: string | null
          recipient_id: string
          sender_id: string
          updated_at: string | null
        }
        Insert: {
          application_id?: string | null
          created_at?: string | null
          id?: string
          message_text: string
          message_type?: string | null
          read_at?: string | null
          recipient_id: string
          sender_id: string
          updated_at?: string | null
        }
        Update: {
          application_id?: string | null
          created_at?: string | null
          id?: string
          message_text?: string
          message_type?: string | null
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      personality_assessments: {
        Row: {
          agreeableness_score: number | null
          assessment_responses: Json | null
          communication_style: string | null
          conscientiousness_score: number | null
          created_at: string | null
          extraversion_score: number | null
          id: string
          job_seeker_id: string | null
          leadership_preference: string | null
          neuroticism_score: number | null
          openness_score: number | null
          updated_at: string | null
          work_style_traits: string[] | null
        }
        Insert: {
          agreeableness_score?: number | null
          assessment_responses?: Json | null
          communication_style?: string | null
          conscientiousness_score?: number | null
          created_at?: string | null
          extraversion_score?: number | null
          id?: string
          job_seeker_id?: string | null
          leadership_preference?: string | null
          neuroticism_score?: number | null
          openness_score?: number | null
          updated_at?: string | null
          work_style_traits?: string[] | null
        }
        Update: {
          agreeableness_score?: number | null
          assessment_responses?: Json | null
          communication_style?: string | null
          conscientiousness_score?: number | null
          created_at?: string | null
          extraversion_score?: number | null
          id?: string
          job_seeker_id?: string | null
          leadership_preference?: string | null
          neuroticism_score?: number | null
          openness_score?: number | null
          updated_at?: string | null
          work_style_traits?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "personality_assessments_job_seeker_id_fkey"
            columns: ["job_seeker_id"]
            isOneToOne: false
            referencedRelation: "job_seeker_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
          user_type: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
          user_type: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
          user_type?: string
        }
        Relationships: []
      }
      recruiter_interests: {
        Row: {
          candidate_id: string
          created_at: string
          id: string
          message: string | null
          recruiter_id: string
          status: string
          updated_at: string
        }
        Insert: {
          candidate_id: string
          created_at?: string
          id?: string
          message?: string | null
          recruiter_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          candidate_id?: string
          created_at?: string
          id?: string
          message?: string | null
          recruiter_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recruiter_interests_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_interests_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      recruiter_notes: {
        Row: {
          application_id: string | null
          created_at: string | null
          id: string
          is_private: boolean | null
          note: string
          recruiter_id: string | null
          updated_at: string | null
        }
        Insert: {
          application_id?: string | null
          created_at?: string | null
          id?: string
          is_private?: boolean | null
          note: string
          recruiter_id?: string | null
          updated_at?: string | null
        }
        Update: {
          application_id?: string | null
          created_at?: string | null
          id?: string
          is_private?: boolean | null
          note?: string
          recruiter_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recruiter_notes_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_notes_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      skills_assessments: {
        Row: {
          adaptability_score: number | null
          assessment_responses: Json | null
          communication_score: number | null
          created_at: string | null
          creativity_score: number | null
          development_areas: string[] | null
          growth_mindset_score: number | null
          id: string
          job_seeker_id: string | null
          leadership_score: number | null
          learning_style: string[] | null
          problem_solving_score: number | null
          technical_aptitude_score: number | null
          top_strengths: string[] | null
          updated_at: string | null
        }
        Insert: {
          adaptability_score?: number | null
          assessment_responses?: Json | null
          communication_score?: number | null
          created_at?: string | null
          creativity_score?: number | null
          development_areas?: string[] | null
          growth_mindset_score?: number | null
          id?: string
          job_seeker_id?: string | null
          leadership_score?: number | null
          learning_style?: string[] | null
          problem_solving_score?: number | null
          technical_aptitude_score?: number | null
          top_strengths?: string[] | null
          updated_at?: string | null
        }
        Update: {
          adaptability_score?: number | null
          assessment_responses?: Json | null
          communication_score?: number | null
          created_at?: string | null
          creativity_score?: number | null
          development_areas?: string[] | null
          growth_mindset_score?: number | null
          id?: string
          job_seeker_id?: string | null
          leadership_score?: number | null
          learning_style?: string[] | null
          problem_solving_score?: number | null
          technical_aptitude_score?: number | null
          top_strengths?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skills_assessments_job_seeker_id_fkey"
            columns: ["job_seeker_id"]
            isOneToOne: false
            referencedRelation: "job_seeker_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      conversation_summaries: {
        Row: {
          application_id: string | null
          conversation_id: string | null
          last_message: string | null
          last_message_at: string | null
          read_at: string | null
          recipient_id: string | null
          sender_id: string | null
          unread_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      calculate_interest_score: {
        Args: { candidate_profile_id: string }
        Returns: number
      }
    }
    Enums: {
      application_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: ["pending", "approved", "rejected"],
    },
  },
} as const
