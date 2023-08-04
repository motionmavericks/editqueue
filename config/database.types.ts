export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agencyProfiles: {
        Row: {
          agency_id: string
          agency_name: string | null
          created_at: string | null
        }
        Insert: {
          agency_id: string
          agency_name?: string | null
          created_at?: string | null
        }
        Update: {
          agency_id?: string
          agency_name?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agencyProfiles_agency_id_fkey"
            columns: ["agency_id"]
            referencedRelation: "agencyProfiles"
            referencedColumns: ["agency_id"]
          }
        ]
      }
      agencyUsers: {
        Row: {
          agency_id: string | null
          created_at: string | null
          user_id: string
        }
        Insert: {
          agency_id?: string | null
          created_at?: string | null
          user_id: string
        }
        Update: {
          agency_id?: string | null
          created_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agencyUsers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      clientProfiles: {
        Row: {
          client_id: string
          client_name: string | null
          created_at: string | null
        }
        Insert: {
          client_id: string
          client_name?: string | null
          created_at?: string | null
        }
        Update: {
          client_id?: string
          client_name?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clientProfiles_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clientUsers"
            referencedColumns: ["client_id"]
          }
        ]
      }
      clientUsers: {
        Row: {
          agency_id: string | null
          client_id: string
          client_name: string | null
          created_at: string | null
          user_id: string | null
        }
        Insert: {
          agency_id?: string | null
          client_id: string
          client_name?: string | null
          created_at?: string | null
          user_id?: string | null
        }
        Update: {
          agency_id?: string | null
          client_id?: string
          client_name?: string | null
          created_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clientUsers_agency_id_fkey"
            columns: ["agency_id"]
            referencedRelation: "agencyProfiles"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "clientUsers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projectBriefs: {
        Row: {
          brief_data: Json[] | null
          brief_id: string
          brief_name: string | null
          client_id: string | null
          created_at: string | null
          user_id: string | null
        }
        Insert: {
          brief_data?: Json[] | null
          brief_id?: string
          brief_name?: string | null
          client_id?: string | null
          created_at?: string | null
          user_id?: string | null
        }
        Update: {
          brief_data?: Json[] | null
          brief_id?: string
          brief_name?: string | null
          client_id?: string | null
          created_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projectBriefs_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clientUsers"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "projectBriefs_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          brief_data: Json | null
          created_at: string | null
          project_id: string
          status_id: number | null
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          brief_data?: Json | null
          created_at?: string | null
          project_id?: string
          status_id?: number | null
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          brief_data?: Json | null
          created_at?: string | null
          project_id?: string
          status_id?: number | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_status_id_fkey"
            columns: ["status_id"]
            referencedRelation: "projectStatus"
            referencedColumns: ["status_id"]
          },
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projectStatus: {
        Row: {
          created_at: string | null
          status_id: number
          status_name: string | null
        }
        Insert: {
          created_at?: string | null
          status_id?: number
          status_name?: string | null
        }
        Update: {
          created_at?: string | null
          status_id?: number
          status_name?: string | null
        }
        Relationships: []
      }
      userProfiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          full_name: string | null
          updated_at: string | null
          user_id: string
          user_type_id: number | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          full_name?: string | null
          updated_at?: string | null
          user_id: string
          user_type_id?: number | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          full_name?: string | null
          updated_at?: string | null
          user_id?: string
          user_type_id?: number | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "userProfiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userProfiles_user_type_id_fkey"
            columns: ["user_type_id"]
            referencedRelation: "userTypes"
            referencedColumns: ["user_type_id"]
          }
        ]
      }
      userTypes: {
        Row: {
          created_at: string | null
          type_name: string
          user_type_id: number
        }
        Insert: {
          created_at?: string | null
          type_name: string
          user_type_id?: number
        }
        Update: {
          created_at?: string | null
          type_name?: string
          user_type_id?: number
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
