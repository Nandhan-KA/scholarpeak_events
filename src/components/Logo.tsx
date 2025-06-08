'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white';
}

export default function Logo({ className = '', variant = 'default' }: LogoProps) {
  const logoSrc = variant === 'white' ? '/sologo_white.png' : '/splogo.png';
  
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="relative h-10 w-10 mr-2">
        <Image
          src={logoSrc}
          alt="ScholarPeak Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <span className={`text-xl font-bold ${variant === 'white' ? 'text-white' : 'text-primary'}`}>
        ScholarPeak <span className="font-normal">Events</span>
      </span>
    </Link>
  );
} 