export type School = {
  id: number;
  name: string;
};

export type SchoolDashboard = School & {
  totalAnnouncements: number;
  totalClassrooms: number;
  totalStudents: number;
  totalParents: number;
};
