
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { upload } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  image: z.instanceof(File).optional(),
});

export default function MemeUpload({ onSuccess }: { onSuccess: () => void }) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create memes",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = "";

      // Upload image if provided
      if (values.image) {
        const fileExt = values.image.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("memes")
          .upload(filePath, values.image);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("memes")
          .getPublicUrl(filePath);
        
        imageUrl = data.publicUrl;
      }

      // Insert meme data
      const { error } = await supabase
        .from("memes")
        .insert({
          title: values.title,
          description: values.description,
          image_url: imageUrl,
          user_id: user.id,
        });

      if (error) throw error;

      toast({
        title: "Meme created!",
        description: "Your meme has been successfully created.",
      });
      
      form.reset();
      setPreviewUrl(null);
      onSuccess();
    } catch (error) {
      console.error("Error creating meme:", error);
      toast({
        title: "Failed to create meme",
        description: "There was an error creating your meme. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter meme title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter meme description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <FormLabel>Upload Image</FormLabel>
          <Input 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewUrl && (
            <div className="mt-2">
              <p className="text-sm mb-1">Preview:</p>
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-48 rounded-md"
              />
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full"
        >
          {isSubmitting ? "Creating..." : "Create Meme"}
          {!isSubmitting && <upload className="ml-2" />}
        </Button>
      </form>
    </Form>
  );
}
