export type Media = {
  id: string;
  created_at: Date;
  updated_at: Date;
  file: string;
  url: string | null;
};

export type MediaInput = {
  file: string;
  audioBase64?: string | null;
};
