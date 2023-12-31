import React from 'react'
import { Button } from './ui/button'
import { FilePlusIcon } from '@radix-ui/react-icons'

export default function AddNote() {
  return (
    <div>
      <Button>
        <FilePlusIcon className="mr-2 h-full w-full" />
        Take a note...
      </Button>
    </div>
  );
}
