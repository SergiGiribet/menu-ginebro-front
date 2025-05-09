export type NavIconType = "food" | "history" | "settings" | "profile";

export interface NavItem {
  id: NavIconType;
  label: string;
  isActive: boolean;
}
