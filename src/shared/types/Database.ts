export type Database = {
    public: {
        Tables: {
            ui_reports: {
                Row: {
                    id: string;
                    pathname: string;
                    report_id: string;
                    report_type: "group" | "item";
                    message: string;
                    x_ratio: number;
                    y_ratio: number;
                    element_x_ratio: number | null;
                    element_y_ratio: number | null;
                    scroll_y: number;
                    document_y: number;
                    viewport_width: number;
                    viewport_height: number;
                    design_width: number;
                    design_height: number;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    pathname: string;
                    report_id: string;
                    report_type: "group" | "item";
                    message: string;
                    x_ratio: number;
                    y_ratio: number;
                    element_x_ratio?: number | null;
                    element_y_ratio?: number | null;
                    scroll_y: number;
                    document_y: number;
                    viewport_width: number;
                    viewport_height: number;
                    design_width?: number;
                    design_height?: number;
                    created_at?: string;
                };
                Update: Partial<Database["public"]["Tables"]["ui_reports"]["Insert"]>;
                Relationships: [];
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
        CompositeTypes: Record<string, never>;
    };
};
