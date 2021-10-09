export interface PostEntity {
  id?: string;

  creatorId: string;
  universityId: string;

  title: string;
  description: string;
  upvoterIds: string[];
  commentIds?: string[];

  createdOn: Date;
  updatedOn: Date;
}
