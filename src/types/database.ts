export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Enums: {
      app_role: "super_admin" | "admin" | "editor";
      publication_status: "draft" | "published" | "archived";
      book_status: "draft" | "published" | "coming_soon" | "archived";
      content_type:
        | "daily_blog"
        | "islamic_article"
        | "news"
        | "tausiyah"
        | "khutbah"
        | "opinion"
        | "story";
    };
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          username: string | null;
          full_name: string | null;
          display_name: string | null;
          bio: string | null;
          avatar_path: string | null;
          avatar_url: string | null;
          role: Database["public"]["Enums"]["app_role"];
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          username?: string | null;
          full_name?: string | null;
          display_name?: string | null;
          bio?: string | null;
          avatar_path?: string | null;
          avatar_url?: string | null;
          role?: Database["public"]["Enums"]["app_role"];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      site_settings: {
        Row: {
          id: string;
          site_name: string;
          site_tagline: string | null;
          site_description: string | null;
          logo_path: string | null;
          logo_url: string | null;
          favicon_path: string | null;
          favicon_url: string | null;
          primary_color: string;
          contact_email: string | null;
          contact_phone: string | null;
          whatsapp_url: string | null;
          instagram_url: string | null;
          facebook_url: string | null;
          youtube_url: string | null;
          tiktok_url: string | null;
          address: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          site_name?: string;
          site_tagline?: string | null;
          site_description?: string | null;
          logo_path?: string | null;
          logo_url?: string | null;
          favicon_path?: string | null;
          favicon_url?: string | null;
          primary_color?: string;
          contact_email?: string | null;
          contact_phone?: string | null;
          whatsapp_url?: string | null;
          instagram_url?: string | null;
          facebook_url?: string | null;
          youtube_url?: string | null;
          tiktok_url?: string | null;
          address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Insert"]>;
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          color: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          color?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
      };
      tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tags"]["Insert"]>;
      };
      posts: {
        Row: {
          id: string;
          author_id: string;
          category_id: string | null;
          content_type: Database["public"]["Enums"]["content_type"];
          status: Database["public"]["Enums"]["publication_status"];
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          cover_image_path: string | null;
          cover_image_url: string | null;
          cover_image_alt: string | null;
          is_featured: boolean;
          reading_time_minutes: number;
          view_count: number;
          seo_title: string | null;
          seo_description: string | null;
          og_title: string | null;
          og_description: string | null;
          og_image_path: string | null;
          og_image_url: string | null;
          canonical_url: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_id: string;
          category_id?: string | null;
          content_type?: Database["public"]["Enums"]["content_type"];
          status?: Database["public"]["Enums"]["publication_status"];
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          cover_image_path?: string | null;
          cover_image_url?: string | null;
          cover_image_alt?: string | null;
          is_featured?: boolean;
          reading_time_minutes?: number;
          view_count?: number;
          seo_title?: string | null;
          seo_description?: string | null;
          og_title?: string | null;
          og_description?: string | null;
          og_image_path?: string | null;
          og_image_url?: string | null;
          canonical_url?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["posts"]["Insert"]>;
      };
      post_tags: {
        Row: {
          post_id: string;
          tag_id: string;
          created_at: string;
        };
        Insert: {
          post_id: string;
          tag_id: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["post_tags"]["Insert"]>;
      };
      books: {
        Row: {
          id: string;
          author_id: string | null;
          title: string;
          slug: string;
          subtitle: string | null;
          description: string | null;
          cover_image_path: string | null;
          cover_image_url: string | null;
          cover_image_alt: string | null;
          publisher: string | null;
          published_year: number | null;
          isbn: string | null;
          purchase_url: string | null;
          sample_file_path: string | null;
          sample_file_url: string | null;
          status: Database["public"]["Enums"]["book_status"];
          sort_order: number;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_id?: string | null;
          title: string;
          slug: string;
          subtitle?: string | null;
          description?: string | null;
          cover_image_path?: string | null;
          cover_image_url?: string | null;
          cover_image_alt?: string | null;
          publisher?: string | null;
          published_year?: number | null;
          isbn?: string | null;
          purchase_url?: string | null;
          sample_file_path?: string | null;
          sample_file_url?: string | null;
          status?: Database["public"]["Enums"]["book_status"];
          sort_order?: number;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["books"]["Insert"]>;
      };
      media_assets: {
        Row: {
          id: string;
          uploader_id: string | null;
          bucket_name: string;
          file_path: string;
          public_url: string | null;
          file_name: string | null;
          mime_type: string | null;
          size_bytes: number | null;
          alt_text: string | null;
          caption: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          uploader_id?: string | null;
          bucket_name: string;
          file_path: string;
          public_url?: string | null;
          file_name?: string | null;
          mime_type?: string | null;
          size_bytes?: number | null;
          alt_text?: string | null;
          caption?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["media_assets"]["Insert"]>;
      };
      post_views: {
        Row: {
          id: string;
          post_id: string;
          viewer_ip_hash: string | null;
          user_agent: string | null;
          viewed_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          viewer_ip_hash?: string | null;
          user_agent?: string | null;
          viewed_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["post_views"]["Insert"]>;
      };
    };
    Views: {
      published_posts_view: {
        Row: {
          id: string | null;
          title: string | null;
          slug: string | null;
          excerpt: string | null;
          content_type: Database["public"]["Enums"]["content_type"] | null;
          cover_image_url: string | null;
          cover_image_path: string | null;
          published_at: string | null;
          reading_time_minutes: number | null;
          view_count: number | null;
          is_featured: boolean | null;
          category_name: string | null;
          category_slug: string | null;
          author_name: string | null;
          author_username: string | null;
        };
      };
    };
  };
};
