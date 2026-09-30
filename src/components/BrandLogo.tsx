"use client";

import Link from "next/link";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  href?: string;
  variant?: "dark" | "light" | "auto";
  className?: string;
}

export function BrandLogo({
  size = "md",
  showText = false,
  href = "/",
  variant = "light",
  className = "",
}: BrandLogoProps) {
  const sizeMap = {
    sm: { imgClass: "h-7 w-auto" },
    md: { imgClass: "h-9 w-auto" },
    lg: { imgClass: "h-12 w-auto" },
    xl: { imgClass: "h-16 w-auto" },
  };

  const currentSize = sizeMap[size];
  const logoSrc = variant === "light" ? "/logo-transparent.png" : "/logo-dark.png";

  const content = (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* High-res Render of Official 1morequiz Logo */}
      <div className="relative flex items-center justify-center">
        <img
          src={logoSrc}
          alt="1morequiz Logo"
          className={`${currentSize.imgClass} object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_14px_rgba(245,158,11,0.35)]`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/logo.png";
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-black text-slate-100 tracking-tight text-base group-hover:text-amber-300 transition-colors">
              1morequiz
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase mt-0.5">
            Sınav & AI Arenası
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
