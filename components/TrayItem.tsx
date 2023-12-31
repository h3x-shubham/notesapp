import React from 'react'
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CarTaxiFrontIcon, Heart, ShoppingCartIcon } from 'lucide-react';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
export default function TrayItem() {
  return (
 
    <Card className="max-w-sm border-none">
      <CardContent className='pt-5 pb-0'>
      <Image
        className="w-full h-48 object-cover"
        src="https://m.media-amazon.com/images/I/81hft+H1HHL._AC_UL480_FMwebp_QL65_.jpg"
        alt="img"
      />
      </CardContent>
      <CardHeader className='pb-0'>
        <CardTitle>{"Brand"}</CardTitle>
        <CardDescription>{"Title"}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between pt-0">
        <Badge>
            {"Price"}
        </Badge>
        <Button variant="outline" size={"icon"}>
            <HeartIcon />
            </Button>
        <Button variant={"outline"} size={"icon"}>
            <ShoppingCartIcon />
            </Button>
      </CardFooter>
    </Card>
  );
}
