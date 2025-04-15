import React, { useState, useRef } from 'react';
import { ChefHat, Plus, X, Loader2, RefreshCw, Clock, Utensils } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
}

const GEMINI_API_KEY = "AIzaSyBHMrXOl2a4lHQXnKR6Rdyo_MM4RiQFMv0"; // This is the API key provided
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";

const RecipeFinder = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const ingredientInputRef = useRef<HTMLInputElement>(null);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
      ingredientInputRef.current?.focus();
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const generateRecipe = async () => {
    if (ingredients.length < 2) {
      toast.error('Please add at least 2 ingredients');
      return;
    }

    setIsGenerating(true);
    setRecipe(null);

    try {
      console.log("Starting API request to Gemini...");
      console.log("Ingredients:", ingredients.join(', '));
      
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `Create a recipe using these ingredients: ${ingredients.join(', ')}. 
                Return the response in JSON format with the following structure:
                {
                  "title": "Recipe Title",
                  "ingredients": ["ingredient 1 - quantity", "ingredient 2 - quantity"],
                  "instructions": ["step 1", "step 2", "step 3"],
                  "cookingTime": "15 minutes",
                  "servings": 2
                }`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      };
      
      console.log("Request payload:", JSON.stringify(requestBody));
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log("API Response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Gemini API error:', response.status, errorData);
        throw new Error(`Failed to generate recipe: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response data:", JSON.stringify(data));
      
      // Extract the text content from the response
      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Look for JSON content within the text
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        try {
          const parsedRecipe = JSON.parse(jsonMatch[0]);
          console.log("Successfully parsed recipe:", parsedRecipe);
          setRecipe(parsedRecipe);
          toast.success('Recipe generated successfully!');
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          throw new Error('Failed to parse recipe from API response');
        }
      } else {
        console.error('No JSON found in response:', generatedText);
        throw new Error('No recipe data found in the API response');
      }
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast.error('Failed to generate recipe. Trying backup method...');
      
      // Use fallback recipe generation
      setTimeout(() => {
        const mockRecipe = {
          title: `${ingredients[0].charAt(0).toUpperCase() + ingredients[0].slice(1)} and ${ingredients[1]} Delight`,
          ingredients: [
            ...ingredients.map(ing => `${ing} - as needed`),
            'Salt - to taste',
            'Pepper - to taste',
            'Olive oil - 1 tbsp'
          ],
          instructions: [
            'Prepare all ingredients and wash them thoroughly.',
            `Heat a pan and add olive oil.`,
            `Cook ${ingredients[0]} until golden brown.`,
            `Add ${ingredients[1]} and stir for 2-3 minutes.`,
            'Season with salt and pepper to taste.',
            'Serve hot and enjoy your midnight snack!'
          ],
          cookingTime: '15 minutes',
          servings: 2
        };
        
        setRecipe(mockRecipe);
        console.log("Using fallback recipe:", mockRecipe);
        toast.success('Created a basic recipe from your ingredients!');
      }, 1000);
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerateRecipe = () => {
    generateRecipe();
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">AI Recipe Finder</h1>
        <p className="text-gray-300">
          Enter the ingredients you have on hand, and let our AI chef create a recipe for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
            <ChefHat className="mr-2 h-5 w-5 text-recipe-primary" />
            Your Ingredients
          </h2>

          <div className="mb-4">
            <div className="flex">
              <input
                ref={ingredientInputRef}
                type="text"
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter an ingredient..."
                className="flex-1 bg-recipe-darker border border-gray-700 rounded-l-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-recipe-primary"
              />
              <button
                onClick={addIngredient}
                className="bg-recipe-primary text-white px-4 py-2 rounded-r-md hover:bg-recipe-primary/90"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {ingredients.length > 0 ? (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-recipe-dark px-3 py-1 rounded-full flex items-center"
                  >
                    <span className="text-gray-200 mr-1">{ingredient}</span>
                    <button
                      onClick={() => removeIngredient(ingredient)}
                      className="text-gray-400 hover:text-gray-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-gray-400 mb-6 text-center py-4">
              No ingredients added yet. Add some to get started!
            </div>
          )}

          <button
            onClick={generateRecipe}
            disabled={ingredients.length < 2 || isGenerating}
            className={`btn-primary w-full ${
              ingredients.length < 2 || isGenerating
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Recipe'
            )}
          </button>
        </div>

        <div>
          {isGenerating ? (
            <div className="glass-panel rounded-lg p-8 h-full flex flex-col items-center justify-center text-center">
              <Loader2 className="h-12 w-12 text-recipe-primary animate-spin mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Cooking up something special...</h3>
              <p className="text-gray-400">Our AI chef is creating a recipe with your ingredients</p>
            </div>
          ) : recipe ? (
            <div className="glass-panel rounded-lg p-6 h-full">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">{recipe.title}</h2>
                <button 
                  onClick={regenerateRecipe} 
                  className="text-recipe-primary hover:text-recipe-primary/80"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex space-x-4 text-sm text-gray-400 mb-6">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {recipe.cookingTime}
                </div>
                <div className="flex items-center">
                  <Utensils className="h-4 w-4 mr-1" />
                  {recipe.servings} servings
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-2">Ingredients</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Instructions</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="pb-2">{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-lg p-8 h-full flex flex-col items-center justify-center text-center">
              <ChefHat className="h-16 w-16 text-gray-500 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No Recipe Generated Yet</h3>
              <p className="text-gray-400">
                Add your ingredients and click "Generate Recipe" to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeFinder;
