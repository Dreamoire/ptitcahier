export type AnnouncementIconName = "School" | "ClipboardList" | "CalendarDays";

export type AnnouncementCategory = {
  id: number;
  name: string;
  color: string;
  icon: AnnouncementIconName;
};
