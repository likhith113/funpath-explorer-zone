
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, PlusCircle, Edit, Trash, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MemeUpload from "@/components/MemeUpload";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Meme = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  user_id: string;
  created_at: string;
};

const MemesAndFun = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [memes, setMemes] = useState<Meme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch memes from database
  const fetchMemes = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("memes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMemes(data || []);
    } catch (error) {
      console.error("Error fetching memes:", error);
      toast({
        title: "Error",
        description: "Failed to load memes. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a meme
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("memes").delete().eq("id", id);
      if (error) throw error;
      
      setMemes(memes.filter(meme => meme.id !== id));
      toast({
        title: "Meme deleted",
        description: "Your meme has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting meme:", error);
      toast({
        title: "Error",
        description: "Failed to delete meme. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Memes & Fun</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Because learning data science doesn't have to be boring! Create and share your own data science memes!
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Create New Meme
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create a new meme</DialogTitle>
              </DialogHeader>
              <MemeUpload onSuccess={() => {
                setDialogOpen(false);
                fetchMemes();
              }} />
            </DialogContent>
          </Dialog>

          <Button className="gap-2" variant="outline" asChild>
            <Link to="/telegram" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Join Telegram Community
            </Link>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Loading memes...</p>
        </div>
      ) : memes.length === 0 ? (
        <div className="text-center py-10 bg-muted rounded-lg">
          <h3 className="font-semibold text-xl mb-2">No memes yet!</h3>
          <p className="text-muted-foreground mb-4">Be the first to create a fun data science meme.</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create a Meme</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create a new meme</DialogTitle>
              </DialogHeader>
              <MemeUpload onSuccess={() => {
                setDialogOpen(false);
                fetchMemes();
              }} />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {memes.map((meme) => (
            <Card key={meme.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-9 bg-muted">
                {meme.image_url ? (
                  <img 
                    src={meme.image_url} 
                    alt={meme.title} 
                    className="object-cover w-full h-48"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-muted">
                    <p className="text-muted-foreground">No image</p>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{meme.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{meme.description}</p>
                
                {user && user.id === meme.user_id && (
                  <div className="flex justify-end gap-2 mt-2">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(meme.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-12 bg-funpath-soft-purple p-6 rounded-lg max-w-3xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-3">Got funny data science memes?</h2>
        <p className="mb-4">
          Join our Telegram community to share your memes, discuss data science topics, and connect with fellow learners!
        </p>
        <Button className="gap-2" asChild>
          <a href="https://t.me/Funpath970" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Join Our Telegram Community
          </a>
        </Button>
      </div>
    </div>
  );
};

export default MemesAndFun;
