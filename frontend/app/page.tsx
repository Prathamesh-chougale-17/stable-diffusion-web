import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: "🎨",
    title: "AI-Powered Creation",
    description:
      "Generate unique images in seconds using state-of-the-art AI models.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description:
      "Optimized performance for quick results without compromising quality.",
  },
  {
    icon: "🎯",
    title: "Fine Control",
    description:
      "Precise adjustments and parameters for perfect results every time.",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] relative px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 pointer-events-none" />
        <div className="container max-w-6xl text-center space-y-8 relative">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 dark:from-foreground dark:to-foreground/60 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Transform Your Ideas Into Art
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Create stunning images with the power of AI. Fast, easy, and
            limitless possibilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-full transition-transform hover:scale-105"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-full transition-transform hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 flex items-center justify-center">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground dark:from-primary dark:to-primary/70">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border border-primary/10 bg-gradient-to-b from-muted/50 to-muted dark:from-muted/10 dark:to-muted/5 hover:border-primary/30 transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </span>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent dark:from-primary/10 pointer-events-none" />
        <div className="container max-w-4xl text-center relative">
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 dark:from-foreground dark:to-foreground/60">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of creators who are already using our platform.
          </p>
          <Button
            size="lg"
            className="text-lg px-10 py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
          >
            Try It Now
          </Button>
        </div>
      </section>
    </main>
  );
}
