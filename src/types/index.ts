import { LucideIcon } from "lucide-react";

export interface Service {
  index: string;
  title: string;
  icon: LucideIcon;
  desc: string;
  tech: string[];
}

export interface Project {
  title: string;
  category: string;
  desc: string;
  image: string;
  tech: string[];
  links: {
    github: string;
    live: string;
  };
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
}
