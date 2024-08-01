export interface Itodos {
  title: string;
  description: string;
  user_id: string;
  created_at: Date;
  updated_at?: Date;
}

export interface IupdateTodo {
  title?: string;
  description?: string;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;

}
