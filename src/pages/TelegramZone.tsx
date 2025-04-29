
import { Button } from "@/components/ui/button";
import { Telegram, MessageCircle, Trophy, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TelegramZone = () => {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Telegram Community Zone</h1>
        <p className="text-lg text-muted-foreground">
          Join our Telegram community for memes, discussions, and rankings!
        </p>
      </div>

      {/* Main CTA */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-funpath-purple to-funpath-blue rounded-2xl overflow-hidden shadow-xl mb-16">
        <div className="p-8 md:p-12 flex flex-col items-center text-white">
          <Telegram className="h-20 w-20 mb-6" />
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
            Connect with Data Science Enthusiasts
          </h2>
          <p className="text-lg mb-8 text-center max-w-xl">
            Join our Telegram community for memes, discussions, and rankings! Share your progress and learn from others.
          </p>
          <Button size="lg" variant="secondary" className="gap-2" asChild>
            <a href="https://t.me/Funpath970" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Telegram className="h-5 w-5" />
              Join FunPath Community
            </a>
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Card>
          <CardHeader>
            <MessageCircle className="h-10 w-10 text-funpath-purple mb-4" />
            <CardTitle>Engage in Discussions</CardTitle>
            <CardDescription>
              Ask questions, share insights, and participate in data science discussions with peers.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
            <Trophy className="h-10 w-10 text-funpath-purple mb-4" />
            <CardTitle>Weekly Challenges</CardTitle>
            <CardDescription>
              Participate in weekly data science challenges and climb up the leaderboard rankings.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
            <Share2 className="h-10 w-10 text-funpath-purple mb-4" />
            <CardTitle>Share Data Science Memes</CardTitle>
            <CardDescription>
              Lighten up your learning journey by sharing and enjoying data science humor.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Testimonials */}
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">What Our Community Says</h2>
        <div className="grid gap-6">
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <p className="italic">
                "The FunPath Telegram community has been an amazing resource for my data science journey. 
                The memes make complex topics more approachable, and I always get quick help when I'm stuck."
              </p>
              <p className="mt-4 font-semibold">- Alex K., Data Science Student</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <p className="italic">
                "I love how active this community is! Whether it's sharing the latest ML papers or just 
                having a laugh about data cleaning struggles, there's always something interesting happening."
              </p>
              <p className="mt-4 font-semibold">- Jamie T., ML Engineer</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center">
        <Button size="lg" className="gap-2" asChild>
          <a href="https://t.me/Funpath970" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Telegram className="h-5 w-5" />
            Join Now
          </a>
        </Button>
      </div>
    </div>
  );
};

export default TelegramZone;
