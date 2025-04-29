
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Image, FlashCard, Telegram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-funpath-purple" />,
      title: "Concept Explorer",
      description: "Interactive cards explaining data science concepts in a simple, clear way.",
      link: "/concepts"
    },
    {
      icon: <Image className="h-8 w-8 text-funpath-blue" />,
      title: "Memes & Fun",
      description: "Learn through humor with our collection of data science memes.",
      link: "/memes"
    },
    {
      icon: <FlashCard className="h-8 w-8 text-funpath-purple" />,
      title: "Flashcards",
      description: "Test your knowledge with interactive flashcards on key concepts.",
      link: "/flashcards"
    },
    {
      icon: <Telegram className="h-8 w-8 text-funpath-blue" />,
      title: "Telegram Community",
      description: "Join a community of learners to share tips and get help.",
      link: "/telegram"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-funpath-soft-purple via-white to-funpath-soft-blue opacity-70 z-0"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Learn Data Science <span className="bg-gradient-to-r from-funpath-purple to-funpath-blue bg-clip-text text-transparent">the Fun Way!</span>
            </h1>
            <p className="text-xl mb-8 text-gray-700">
              Master data science concepts through interactive learning, memes, and a supportive community. No boring lectures, just fun paths to knowledge!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Link to="/concepts" className="flex items-center gap-2">
                  Start Learning <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/telegram">Join Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How FunPath Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="border border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="ghost" asChild className="gap-1">
                    <Link to={feature.link}>
                      Explore <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-funpath-purple/10 to-funpath-blue/10">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to make data science fun?</h2>
          <p className="text-xl mb-8 text-gray-700">
            Join thousands of learners who have discovered the joy of mastering data science concepts through FunPath.
          </p>
          <Button size="lg" asChild>
            <Link to="/concepts">Get Started for Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
