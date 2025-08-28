"use client";
import { Ghost, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { deleteSummary } from "@/utils/delete-summary";
import { toast } from "sonner";

interface DeleteButtonProps {
    summaryId : string
}

export default function DeleteButton({summaryId}: DeleteButtonProps) {
     const [open , setOpen] = useState(false)
     const [isPending, startTransition] = useTransition()

      const handleDelete = async () => {
        startTransition(async()=>{
       const result = await deleteSummary({summaryId})
       if(!result.success){
        toast('failed to delete summary')
        setOpen(false)
       }
       toast('summary deleted successfully')
       setOpen(false)
       })
     }
  return (

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size="icon"
          className="text-gray-400 bg-background border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this summary? This action cannot be
            undone
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            className=" bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
            onClick={()=> setOpen(false)}
          >
            cancel
          </Button>
          <Button
            variant="destructive"
            className=" bg-gray-900 hover:bg-gray-600"
            onClick={handleDelete}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
