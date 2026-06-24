"use client";

import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface BlogProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
  index: number;
}

const ease = [0.16, 1, 0.3, 1] as const;

const BlogCard = ({ title, excerpt, date, readTime, category, image, slug, index }: BlogProps) => {
  const number = String(index + 1).padStart(2, "0");
  const readLink = `/blog/${slug}`;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "var(--surface)",
        border: "3px solid #000000",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered ? "10px 10px 0px #000000" : "5px 5px 0px #000000",
        transform: hovered ? "translate(-3px, -3px)" : "none",
        transition: "box-shadow 0.35s, transform 0.35s",
        height: "100%",
        cursor: "pointer",
      }}
    >
      {/* ── Image ── */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        aspectRatio: "16/10",
        background: "var(--surface-2)",
      }}>
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{
              objectFit: "cover",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ) : (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              fontSize: "11px", fontFamily: "var(--font-mono)", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.1em",
              color: "var(--muted-soft)",
            }}>
              No Image
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: hovered
            ? "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)"
            : "linear-gradient(180deg, transparent 70%, rgba(0,0,0,0.2) 100%)",
          transition: "background 0.5s",
          pointerEvents: "none",
        }} />

        {/* Category badge on image */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          padding: "5px 12px",
          background: "var(--neo-yellow)",
          border: "2px solid #000000",
          borderRadius: "var(--radius-sm)",
          boxShadow: "2px 2px 0px #000000",
          zIndex: 2,
        }}>
          <span style={{
            fontSize: "9px", fontFamily: "var(--font-mono)", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.1em", color: "#000000",
          }}>
            {category || "Article"}
          </span>
        </div>

        {/* Number badge */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          width: "32px", height: "32px",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#000000", border: "2px solid #000000",
          borderRadius: "var(--radius-sm)",
          zIndex: 2,
        }}>
          <span style={{
            fontSize: "11px", fontFamily: "var(--font-pixel)", fontWeight: 400,
            color: "#FFFFFF",
          }}>
            {number}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{
        padding: "clamp(1rem, 2.5vw, 1.5rem)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        flex: 1,
      }}>
        {/* Meta row */}
        <div style={{
          display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px",
        }}>
          {date && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              fontSize: "10px", fontFamily: "var(--font-mono)", fontWeight: 700,
              color: "var(--muted-soft)",
            }}>
              <Calendar size={10} style={{ color: "var(--neo-yellow)" }} />
              {date}
            </span>
          )}
          {date && readTime && (
            <span style={{ fontSize: "10px", color: "var(--border)" }}>·</span>
          )}
          {readTime && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              fontSize: "10px", fontFamily: "var(--font-mono)", fontWeight: 700,
              color: "var(--muted-soft)",
            }}>
              <Clock size={10} style={{ color: "var(--neo-yellow)" }} />
              {readTime}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 800,
          color: "var(--foreground)",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          margin: 0,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {title}
        </h3>

        {/* Excerpt */}
        <p style={{
          fontSize: "13px",
          color: "var(--muted)",
          lineHeight: 1.65,
          margin: 0,
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {excerpt}
        </p>

        {/* Read more link */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "4px",
          paddingTop: "12px",
          borderTop: "2px solid var(--surface-2)",
        }}>
          <span style={{
            fontSize: "11px", fontFamily: "var(--font-mono)", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.08em",
            color: hovered ? "var(--foreground)" : "var(--muted)",
            transition: "color 0.2s",
          }}>
            Read Article
          </span>
          <motion.span
            animate={hovered ? { x: 4 } : { x: 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: "var(--neo-yellow)" }}
          >
            <ArrowRight size={14} strokeWidth={2.5} />
          </motion.span>
        </div>
      </div>

      {/* Hidden link for accessibility */}
      <Link href={readLink} aria-label={`Read ${title}`} style={{ position: "absolute", inset: 0, zIndex: 1 }} />
    </motion.div>
  );
};

export default BlogCard;
