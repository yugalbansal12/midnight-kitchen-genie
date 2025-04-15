
import React, { useState } from 'react';
import { Search, Clock, UtensilsCrossed, ChevronDown, ChevronUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Sample recipe data
const recipeData = [
  {
    id: 1,
    title: "Midnight Pasta Carbonara",
    imageUrl: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    cookingTime: "20 minutes",
    servings: 2,
    difficulty: "Easy",
    category: "Pasta",
    ingredients: [
      "200g spaghetti",
      "100g pancetta or bacon, diced",
      "2 large eggs",
      "50g Parmesan cheese, grated",
      "2 cloves garlic, minced",
      "Salt and black pepper to taste",
      "1 tbsp olive oil",
      "Fresh parsley, chopped (optional)"
    ],
    instructions: [
      "Bring a large pot of salted water to a boil. Add the spaghetti and cook according to package instructions until al dente.",
      "While the pasta is cooking, heat olive oil in a large skillet over medium heat. Add the diced pancetta or bacon and cook until crispy, about 5-6 minutes.",
      "Add minced garlic to the skillet and cook for another 30 seconds until fragrant. Remove from heat.",
      "In a bowl, whisk together eggs, grated Parmesan, and a generous amount of black pepper.",
      "When the pasta is done, reserve 1/2 cup of pasta water, then drain.",
      "Working quickly, add the hot pasta to the skillet with the pancetta. Toss to combine.",
      "Pour the egg and cheese mixture over the hot pasta, stirring continuously. The heat from the pasta will cook the eggs, creating a creamy sauce. If the sauce is too thick, add a splash of reserved pasta water.",
      "Season with salt if needed and more black pepper.",
      "Serve immediately, garnished with additional Parmesan and chopped parsley if desired."
    ]
  },
  {
    id: 2,
    title: "Quick Midnight Nachos",
    imageUrl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    cookingTime: "15 minutes",
    servings: 4,
    difficulty: "Easy",
    category: "Snacks",
    ingredients: [
      "1 bag tortilla chips",
      "1 cup shredded cheddar cheese",
      "1 cup shredded Monterey Jack cheese",
      "1 can black beans, drained and rinsed",
      "1/2 cup pickled jalapeños",
      "1 avocado, diced",
      "1/4 cup sour cream",
      "1/4 cup salsa",
      "2 green onions, sliced",
      "Fresh cilantro, chopped"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Spread tortilla chips evenly on a large, oven-safe platter or baking sheet.",
      "Sprinkle both types of cheese over the chips.",
      "Scatter black beans and jalapeños over the cheese.",
      "Bake for 5-7 minutes, until cheese is melted and bubbly.",
      "Remove from oven and top with diced avocado, dollops of sour cream, salsa, green onions, and cilantro.",
      "Serve immediately while still hot."
    ]
  },
  {
    id: 3,
    title: "Midnight Chocolate Mug Cake",
    imageUrl: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    cookingTime: "5 minutes",
    servings: 1,
    difficulty: "Easy",
    category: "Desserts",
    ingredients: [
      "4 tbsp all-purpose flour",
      "2 tbsp unsweetened cocoa powder",
      "2 tbsp granulated sugar",
      "1/4 tsp baking powder",
      "Pinch of salt",
      "5 tbsp milk",
      "2 tbsp vegetable oil",
      "1/4 tsp vanilla extract",
      "2 tbsp chocolate chips (optional)",
      "1 scoop vanilla ice cream (for serving, optional)"
    ],
    instructions: [
      "In a microwave-safe mug, whisk together flour, cocoa powder, sugar, baking powder, and salt.",
      "Add milk, vegetable oil, and vanilla extract. Stir until smooth with no lumps.",
      "Fold in chocolate chips if using.",
      "Microwave on high for 70-90 seconds. The cake will rise and then set. Be careful not to overcook or it will become dry.",
      "Let it cool for 1 minute, then top with a scoop of vanilla ice cream if desired.",
      "Enjoy straight from the mug!"
    ]
  },
  {
    id: 4,
    title: "Midnight Grilled Cheese",
    imageUrl: "https://images.unsplash.com/photo-1528736235302-52922df5c122?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    cookingTime: "10 minutes",
    servings: 1,
    difficulty: "Easy",
    category: "Sandwiches",
    ingredients: [
      "2 slices bread (white, sourdough, or your preference)",
      "2 tbsp butter, softened",
      "1/4 cup shredded cheddar cheese",
      "1/4 cup shredded mozzarella cheese",
      "2 slices American cheese",
      "1 tsp garlic powder (optional)",
      "1 tsp dried herbs like oregano or Italian seasoning (optional)"
    ],
    instructions: [
      "Butter one side of each slice of bread.",
      "Mix the shredded cheeses together. If using garlic powder and dried herbs, mix them into the shredded cheese.",
      "Place one slice of bread, butter-side down, in a cold skillet.",
      "Layer the cheeses on the bread, starting with one slice of American cheese, then the shredded cheese mixture, and finally the second slice of American cheese.",
      "Top with the second slice of bread, butter-side up.",
      "Turn the heat to medium-low and cook until the bottom bread is golden brown, about 3-4 minutes.",
      "Carefully flip the sandwich and cook until the other side is golden brown and the cheese is fully melted, about 2-3 more minutes.",
      "Remove from heat, let cool for a minute, then slice and enjoy!"
    ]
  },
  {
    id: 5,
    title: "Midnight Avocado Toast",
    imageUrl: "https://images.unsplash.com/photo-1603046891744-1f176feb61e3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    cookingTime: "5 minutes",
    servings: 1,
    difficulty: "Easy",
    category: "Breakfast",
    ingredients: [
      "1 slice bread (sourdough or whole grain recommended)",
      "1/2 ripe avocado",
      "1 tsp lemon juice",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
      "1 egg (optional)",
      "Microgreens or sprouts (optional)"
    ],
    instructions: [
      "Toast the bread to your desired level of crispness.",
      "In a small bowl, mash the avocado with a fork. Add lemon juice, salt, and pepper.",
      "Spread the avocado mixture onto the toasted bread.",
      "If using, top with a fried or poached egg.",
      "Sprinkle with red pepper flakes and top with microgreens if desired.",
      "Enjoy immediately!"
    ]
  }
];

const RecipeLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const filteredRecipes = recipeData.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.ingredients.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === 'All' || recipe.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['All', ...Array.from(new Set(recipeData.map(recipe => recipe.category)))];

  const openRecipeDialog = (recipe: any) => {
    setSelectedRecipe(recipe);
    setIsDialogOpen(true);
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">Recipe Library</h1>
        <p className="text-gray-300">
          Browse our collection of delicious midnight recipes
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes or ingredients..."
            className="w-full bg-recipe-dark border border-gray-700 rounded-md pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-recipe-primary"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            className="w-full md:w-auto flex items-center justify-between bg-recipe-dark border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-recipe-primary"
          >
            <span>Category: {filter}</span>
            {isFilterDropdownOpen ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </button>

          {isFilterDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-recipe-dark border border-gray-700 rounded-md shadow-lg">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setFilter(category);
                    setIsFilterDropdownOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-recipe-darker ${
                    filter === category ? 'text-recipe-primary' : 'text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="recipe-card cursor-pointer"
              onClick={() => openRecipeDialog(recipe)}
            >
              <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{recipe.title}</h3>
              <div className="flex space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {recipe.cookingTime}
                </div>
                <div className="flex items-center">
                  <UtensilsCrossed className="h-4 w-4 mr-1" />
                  {recipe.servings} {recipe.servings === 1 ? 'serving' : 'servings'}
                </div>
              </div>
              <div className="mt-2">
                <span className="inline-block bg-recipe-primary/20 text-recipe-primary px-2 py-0.5 rounded-full text-xs">
                  {recipe.category}
                </span>
                <span className="ml-2 inline-block bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full text-xs">
                  {recipe.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4 text-gray-500">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No recipes found</h3>
          <p className="text-gray-400">
            Try adjusting your search or filter to find what you're looking for
          </p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-recipe-dark border-gray-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedRecipe.title}</DialogTitle>
              </DialogHeader>
              
              <div className="mt-2">
                <div className="mb-4 h-64 overflow-hidden rounded-lg">
                  <img 
                    src={selectedRecipe.imageUrl}
                    alt={selectedRecipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-recipe-primary" />
                    <span>{selectedRecipe.cookingTime}</span>
                  </div>
                  <div className="flex items-center">
                    <UtensilsCrossed className="h-4 w-4 mr-1 text-recipe-primary" />
                    <span>{selectedRecipe.servings} {selectedRecipe.servings === 1 ? 'serving' : 'servings'}</span>
                  </div>
                  <span className="inline-block bg-recipe-primary/20 text-recipe-primary px-2 py-0.5 rounded-full">
                    {selectedRecipe.category}
                  </span>
                  <span className="inline-block bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                    {selectedRecipe.difficulty}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <h3 className="text-lg font-medium mb-3 text-recipe-primary">Ingredients</h3>
                    <ul className="space-y-2">
                      {selectedRecipe.ingredients.map((ingredient: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-recipe-primary mt-1.5 mr-2"></div>
                          <span className="text-gray-300">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium mb-3 text-recipe-primary">Instructions</h3>
                    <ol className="space-y-4">
                      {selectedRecipe.instructions.map((instruction: string, index: number) => (
                        <li key={index} className="flex">
                          <span className="flex-shrink-0 bg-recipe-primary text-white h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-gray-300">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipeLibrary;
