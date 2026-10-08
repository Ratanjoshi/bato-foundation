export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

export const contactInfo = {
  email: "hello@batofoundation.org",
  phone: "+977-9823305932",
  location: "Lalitpur Metropolitan City, Ward No. 3, Lalitpur, Nepal",
  officeHours: "Monday – Friday, 10:00 AM – 6:00 PM",
  socials: [
    { label: "Facebook", href: "#", icon: "facebook" },
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "YouTube", href: "#", icon: "youtube" },
  ],
};
