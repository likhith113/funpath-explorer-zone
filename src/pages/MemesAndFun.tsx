
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Telegram } from "lucide-react";
import { Link } from "react-router-dom";

const memes = [
  {
    id: 1,
    title: "When the model finally works",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    description: "That feeling when your neural network finally converges after days of debugging."
  },
  {
    id: 2,
    title: "Data cleaning reality",
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    description: "Expectations vs. reality of how much time you'll spend cleaning data."
  },
  {
    id: 3,
    title: "Python vs R debate",
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "The never-ending debate in the data science community."
  },
  {
    id: 4,
    title: "Trying to explain overfitting",
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    description: "When you try to explain overfitting to non-technical stakeholders."
  },
  {
    id: 5,
    title: "Feature engineering magic",
    url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    description: "Creating that one perfect feature that boosts model performance."
  },
  {
    id: 6,
    title: "Correlation vs Causation",
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "The classic mistake every data scientist must learn to avoid."
  },
  {
    id: 7,
    title: "Stack overflow dependency",
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    description: "When Stack Overflow is down and you actually have to solve problems yourself."
  },
  {
    id: 8,
    title: "The documentation doesn't exist",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    description: "Trying to use a new library with minimal documentation."
  }
];

const MemesAndFun = () => {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Memes & Fun</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Because learning data science doesn't have to be boring! Enjoy these memes and don't forget to share your own.
        </p>
        <Button className="gap-2">
          <Link to="/telegram" className="flex items-center gap-2">
            <Telegram className="h-4 w-4" />
            Share Your Memes on Telegram
          </Link>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {memes.map((meme) => (
          <Card key={meme.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-w-16 aspect-h-9 bg-muted">
              <img 
                src={meme.url} 
                alt={meme.title} 
                className="object-cover w-full h-48"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{meme.title}</h3>
              <p className="text-sm text-muted-foreground">{meme.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-funpath-soft-purple p-6 rounded-lg max-w-3xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-3">Got funny data science memes?</h2>
        <p className="mb-4">
          Join our Telegram community to share your memes, discuss data science topics, and connect with fellow learners!
        </p>
        <Button className="gap-2" asChild>
          <a href="https://t.me/Funpath970" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Telegram className="h-4 w-4" />
            Join Our Telegram Community
          </a>
        </Button>
      </div>
    </div>
  );
};

export default MemesAndFun;
