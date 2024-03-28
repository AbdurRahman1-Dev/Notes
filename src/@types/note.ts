type NewData = {
  $id?: string;
  $createdAt?: string | number | Date;
  title: string;
  parentID?: string;
  tags: string[];
  contents: string;
  userId: string | undefined;
  category: string;
  favorite: boolean;
};
export default NewData;
