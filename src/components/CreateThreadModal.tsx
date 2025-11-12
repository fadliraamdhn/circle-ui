import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { axiosInstance } from "@/utils/axios";
import { Image } from "lucide-react";

export function CreateThreadModal() {
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)

    const handleSubmit = async () => {
        if (!content) {
            toast.warning('Isi konten dulu!');
            return;
        }
        
        setLoading(true);
        const formData = new FormData();
        formData.append('content', content);
        if (image) formData.append('image', image);

        try {
            await axiosInstance.post('/api/v1/auth/thread', formData);
            setOpen(false);
            toast.success('Thread berhasil dibuat!');
            setContent('');
            setImage(null);
        } catch (error) {
            toast.error('Gagal membuat thread.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button 
                    onClick={() => setOpen(true)}
                    className="w-full cursor-pointer rounded-full border px-4 py-2 text-left text-gray-500">
                    What is happening?
                </button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new thread</DialogTitle>
                </DialogHeader>

                <Textarea
                    placeholder="What is hapening?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[100px]"
                />

                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="h-50 rounded-lg object-cover"
                    />
                )}

                <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setImage(file);
                    }}
                />

                <label htmlFor="image-upload" className="cursor-pointer rounded-full">
                    <Image size={32} color="green" />
                </label>

                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-green-600 rounded-full cursor-pointer"
                >
                    {loading ? "Posting..." : "Posting"}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
