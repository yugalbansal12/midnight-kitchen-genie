
import React from 'react';
import { ArrowRight, ChefHat, Sparkles, UtensilsCrossed, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col lg:flex-row items-center bg-recipe-dark bg-hero-pattern bg-cover py-16 lg:py-32 px-6">
        <div className="container max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                <span className="text-recipe-primary">AI-Powered</span> Recipe Maker <br />
                for Midnight Cravings
              </h1>
              <p className="text-lg text-gray-300 max-w-xl">
                Transform your available ingredients into delicious recipes with our AI chef. 
                No more food waste, just creative cooking.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/recipe-finder" className="btn-primary flex items-center justify-center gap-2">
                Find Recipes Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/recipe-library" className="btn-secondary flex items-center justify-center">
                Browse Recipe Library
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-recipe-primary to-recipe-accent opacity-70 blur-lg"></div>
              <div className="relative glass-panel rounded-full p-1">
                <div className="bg-recipe-darker rounded-full p-8">
                  <ChefHat className="w-48 h-48 text-recipe-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6 bg-recipe-darker">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Cooking Made Intelligent
            </h2>
            <p className="text-gray-300">
              Our platform combines AI technology with culinary expertise to deliver
              personalized recipe recommendations based on what you have.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="h-10 w-10 text-recipe-primary" />,
                title: "AI Recipe Generator",
                description: "Enter your available ingredients and our AI will suggest perfect recipes tailored to what you have."
              },
              {
                icon: <UtensilsCrossed className="h-10 w-10 text-recipe-primary" />,
                title: "Curated Recipe Library",
                description: "Browse our collection of pre-made recipes with detailed tutorials and step-by-step guides."
              },
              {
                icon: <Clock className="h-10 w-10 text-recipe-primary" />,
                title: "Quick & Easy Cooking",
                description: "Get recipes that match your time constraints, from 15-minute meals to slow-cooked feasts."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-recipe-dark rounded-lg p-6 glass-panel">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-br from-recipe-dark to-recipe-darker border-t border-gray-800">
        <div className="container max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Cook Something Amazing?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Stop wondering what to make with your ingredients. 
            Let our AI chef inspire your next culinary masterpiece.
          </p>
          <Link to="/recipe-finder" className="btn-primary inline-flex items-center gap-2">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
