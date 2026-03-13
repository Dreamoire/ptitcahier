export type Announcement = {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: Date;
  announcementCategoryName: string;
  studentNames: string;
};
