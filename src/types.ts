export interface ToolCategory {
    slug: string;
    name: string;
    description: string;
    icon: string;
    data: ToolItem[];
  }
  
  export interface ToolItem {
    name: string;
    description: string;
    url: string;
  }