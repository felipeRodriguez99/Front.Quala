export interface ApiResponse {
    succeeded: boolean;
    message: string | null;
    errors: any[] | null;
    data: any[] | null;
  }