import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
interface ProfileButtonProps {
  src: string;
  alt: string;
  fallbackInitials: string;
}
export default function Profilebutton({ src, alt, fallbackInitials }: ProfileButtonProps) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallbackInitials}</AvatarFallback>
    </Avatar>
  );
}
