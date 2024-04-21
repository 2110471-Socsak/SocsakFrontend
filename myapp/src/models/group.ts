export interface Group {
  success: boolean;
  message: string;
  data: [
    {
      id: string;
      name: string;
      count: number;
    }
  ]
};