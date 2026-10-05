export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  portfolio?: string; // full URL, e.g. "https://example.com"
}

export const leadership: TeamMember[] = [
  {
    name: "Sudarshan Sharma",
    role: "Chairperson",
    bio: "[Bio to be added — Chairperson of the Board of Directors.]",
    image: "/images/team/sudarshan-sharma.jpg",
    portfolio: "https://sudarshansharma.com.np",
  },
  {
    name: "Khagendra Sherchan",
    role: "Board Member",
    bio: "[Bio to be added.]",
    image: "/images/team/khagendra-sherchan.jpg",
    portfolio: "https://khagendrasherchan.com.np",
  },
  {
    name: "Sushant Poudel",
    role: "Board Member",
    bio: "[Bio to be added.]",
    image: "/images/team/sushant-poudel.jpg",
    portfolio: "https://sushantpoudel.com.np",
  },
  {
    name: "Jyotsna Nyaupane",
    role: "Board Member",
    bio: "[Bio to be added.]",
    image: "/images/team/jyotsna-nyaupane.jpg",
    portfolio: "https://jyotsnanyaupane.com.np",
  },
  {
    name: "Prashant Thapa",
    role: "Board Member",
    bio: "[Bio to be added.]",
    image: "/images/team/prashant-thapa.jpg",
    portfolio: "https://prashantthapa.com.np",
  },
];
