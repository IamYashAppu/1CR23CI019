import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';

import dosaImage from './assets/Karnataka-Style-Masala-Dosa.jpg';
import akkiRotiImage from './assets/Karnataka_Special_Akki_Roti.webp';
import bisiBeleBathImage from './assets/bisi_bele_bath.webp';
import goliImage from './assets/goli.jpg';
import karaBathImage from './assets/kara bath.jpg';
import mysorePakImage from './assets/mysore pak.png';

const sampleRecipes = [
  {
    id: '1',
    title: 'Karnataka Style Masala Dosa',
    image: dosaImage,
    prepTime: '30 mins',
    difficulty: 'Medium',
    ingredients: ['Rice', 'Urad Dal', 'Potatoes', 'Onions', 'Spices'],
    instructions: '1. Soak rice and urad dal separately for 4-6 hours. 2. Grind to make batter and ferment overnight. 3. Prepare potato masala filling. 4. Spread batter on hot pan and cook until crispy. 5. Add filling and fold.'
  },
  {
    id: '2',
    title: 'Akki Roti',
    image: akkiRotiImage,
    prepTime: '25 mins',
    difficulty: 'Easy',
    ingredients: ['Rice flour', 'Vegetables', 'Onions', 'Spices', 'Coconut'],
    instructions: '1. Mix rice flour with hot water to make dough. 2. Add chopped vegetables and spices. 3. Roll into roti shape. 4. Cook on griddle until golden brown.'
  },
  {
    id: '3',
    title: 'Bisi Bele Bath',
    image: bisiBeleBathImage,
    prepTime: '40 mins',
    difficulty: 'Hard',
    ingredients: ['Rice', 'Toor dal', 'Vegetables', 'Spices', 'Ghee'],
    instructions: '1. Cook rice and toor dal separately. 2. Prepare spice powder with dried red chilies, coriander seeds, etc. 3. Cook vegetables with spices. 4. Combine all ingredients and simmer.'
  },
  {
    id: '4',
    title: 'Goli Bhajji',
    image: goliImage,
    prepTime: '20 mins',
    difficulty: 'Easy',
    ingredients: ['Maida (All-purpose flour)', 'Yogurt', 'Green chili', 'Ginger', 'Cumin', 'Baking soda'],
    instructions: '1. Mix maida, yogurt, finely chopped chili, ginger, cumin, and salt to form a smooth, thick batter. 2. Let the batter rest for 2-3 hours. 3. Add a pinch of baking soda just before frying. 4. Drop small portions of the batter into hot oil and deep-fry until golden brown and crispy.'
  },
  {
    id: '5',
    title: 'Kara Bath',
    image: karaBathImage,
    prepTime: '15 mins',
    difficulty: 'Easy',
    ingredients: ['Bombay Rava (Semolina)', 'Mixed Vegetables', 'Mustard seeds', 'Urad dal', 'Curry leaves', 'Turmeric'],
    instructions: '1. Dry roast the rava and set aside. 2. Temper oil with mustard seeds, urad dal, and curry leaves. Add chopped onions and vegetables. 3. Add water, salt, and turmeric, and bring to a boil. 4. Slowly add the roasted rava, stirring continuously to avoid lumps. 5. Cover and cook on a low flame until all water is absorbed. Garnish with coriander.'
  },
  {
    id: '6',
    title: 'Mysore Pak',
    image: mysorePakImage,
    prepTime: '35 mins',
    difficulty: 'Medium',
    ingredients: ['Besan', 'Sugar', 'Ghee', 'Water', 'Cardamom'],
    instructions: '1. Heat ghee in a pan and roast besan until aromatic. 2. Make sugar syrup with water. 3. Slowly add sugar syrup to besan. 4. Add cardamom and mix until thick. 5. Pour into greased tray and cut when warm.'
  }
];

export default function App() {
  const [recipes] = useState(sampleRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState(sampleRecipes);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState('browse');

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredRecipes(filtered);
    }
  }, [searchQuery, recipes]);

  const saveRecipe = (recipeId) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe && !savedRecipes.some(r => r.id === recipeId)) {
      setSavedRecipes([...savedRecipes, recipe]);
    }
  };

  const removeSavedRecipe = (recipeId) => {
    setSavedRecipes(savedRecipes.filter(recipe => recipe.id !== recipeId));
  };

  const isRecipeSaved = (recipeId) => {
    return savedRecipes.some(recipe => recipe.id === recipeId);
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity style={styles.recipeCard} onPress={() => setSelectedRecipe(item)}>
      <Image source={item.image} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeDetailText}>⏱ {item.prepTime}</Text>
          <Text style={styles.recipeDetailText}>📊 {item.difficulty}</Text>
        </View>
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={(e) => {
            e.stopPropagation();
            isRecipeSaved(item.id) ? removeSavedRecipe(item.id) : saveRecipe(item.id);
          }}
        >
          <Text style={styles.saveButtonText}>
            {isRecipeSaved(item.id) ? 'Saved ✓' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderRecipeDetails = () => {
    const instructionSteps = selectedRecipe.instructions.split(/\d+\. /).filter(Boolean);

    return (
      <ScrollView style={styles.detailsContainer}>
        <TouchableOpacity onPress={() => setSelectedRecipe(null)} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <Image source={selectedRecipe.image} style={styles.detailImage} />
        <Text style={styles.detailTitle}>{selectedRecipe.title}</Text>
        
        <View style={styles.detailInfo}>
          <Text style={styles.detailText}>⏱ Preparation Time: {selectedRecipe.prepTime}</Text>
          <Text style={styles.detailText}>📊 Difficulty: {selectedRecipe.difficulty}</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.ingredientsContainer}>
          {selectedRecipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredientItem}>• {ingredient}</Text>
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Instructions ({instructionSteps.length} Steps)</Text>
        {instructionSteps.map((step, index) => (
          <Text key={index} style={styles.instructionsText}>
            {index + 1}. {step.trim()}
          </Text>
        ))}
        
        <TouchableOpacity 
          style={[styles.saveButton, styles.detailSaveButton]} 
          onPress={() => isRecipeSaved(selectedRecipe.id) ? removeSavedRecipe(selectedRecipe.id) : saveRecipe(selectedRecipe.id)}
        >
          <Text style={styles.saveButtonText}>
            {isRecipeSaved(selectedRecipe.id) ? 'Remove from Saved' : 'Save Recipe'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderMainContent = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recipe App</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes or ingredients..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'browse' && styles.activeTab]}
          onPress={() => setActiveTab('browse')}
        >
          <Text style={[styles.tabText, activeTab === 'browse' && styles.activeTabText]}>Browse</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
          onPress={() => setActiveTab('saved')}
        >
          <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>Saved ({savedRecipes.length})</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'browse' ? (
        <FlatList
          data={filteredRecipes}
          renderItem={renderRecipeItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.recipeList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={savedRecipes}
          renderItem={renderRecipeItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.recipeList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No saved recipes yet</Text>
              <Text style={styles.emptySubtext}>Browse and save your favorite recipes!</Text>
            </View>
          }
        />
      )}

      <StatusBar style="auto" />
    </View>
  );

  return (
    <View style={styles.container}>
      {selectedRecipe ? renderRecipeDetails() : renderMainContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ff6b6b',
    padding: 20,
    alignItems: 'center',
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ff6b6b',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
  recipeList: {
    padding: 10,
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  recipeImage: {
    height: 150,
    width: '100%',
  },
  recipeInfo: {
    padding: 15,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeDetails: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  recipeDetailText: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
  },
  saveButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
  detailImage: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    marginBottom: 15,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailInfo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
    marginRight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  ingredientsContainer: {
    marginBottom: 20,
  },
  ingredientItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  instructionsText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 10,
  },
  detailSaveButton: {
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 50,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});