import { LucideIcon } from "lucide-react";

export interface Service {
  _id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  tags: string[];
  order: number;
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
