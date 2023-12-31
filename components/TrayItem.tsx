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
export default function TrayItem() {
  return (
    // <div className="max-w-sm rounded overflow-hidden shadow-lg m-4  hover:shadow-xl transition-shadow duration-300 ease-in-out">
    //   <img
    //     className="w-full h-48 object-cover"
    //     src="https://m.media-amazon.com/images/I/81hft+H1HHL._AC_UL480_FMwebp_QL65_.jpg"
    //     alt="img"
    //   />
    //   {/* <img className="w-full h-48 object-cover" src={imageUrl} alt={name} /> */}
    //   <div className="px-6 py-4">
    //     <div className="font-bold text-xl mb-2">{"name"}</div>
    //     <p className="text-gray-700 text-base">{"description"}</p>
    //   </div>
    //   <div className="px-6 pt-4 pb-2">
    //     {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
    //       ${"price"}
    //     </span> */}
    //     <Badge>${"price"}</Badge>
    //     <Button variant="ghost">
    //       {/* </Button> className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> */}
    //       Add to Cart
    //     </Button>
    //   </div>
    // </div>
    <Card className="max-w-sm border-none">
      <CardContent className='pt-5 pb-0'>
      <img
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
