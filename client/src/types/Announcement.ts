export type Announcement = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  announcementCategoryName: string;
  studentNames?: string;
  studentCount?: number;
  totalStudents?: number;
  classroomNames?: string;
};
