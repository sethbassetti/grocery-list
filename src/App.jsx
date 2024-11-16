import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';

const initialCategories = {
  'Produce': [
    'Limes - 4 large + 4 med',
    'Romaine lettuce - 2 heads',
    'Cherry or grape tomatoes - 1 dry pint',
    'Roma or plum tomatoes - 1 ½ pounds',
    'Acorn squash - 1 med-large',
    'Red or green cabbage - ½ small',
    'Carrots - 4 med',
    'Red or yellow onion - 1 med',
    'Cilantro - 2 bunches',
    'Garlic - 1 head',
    'Shallots - 3 med-large',
    'Jalapeños - 2 to 3'
  ],
  'Pantry': [
    'Pure maple syrup - 3 ½ TBSP',
    'Extra virgin olive oil - ~⅔ cup',
    'Distilled white vinegar - ½ cup',
    'Long-grain white rice - 2 to 2 ½ cups',
    'Soy sauce (or tamari for GF) - 1 TBSP',
    'Creamy almond butter - ⅓ cup',
    'Nutritional yeast - 2 TBSP',
    'Hemp seeds - 1 cup',
    'Pepitas - ¾ cup',
    'Black beans - 3 cans'
  ],
  'Spices': [
    'Mexican oregano - 2 tsp',
    'Ground coriander - ½ tsp',
    'Ground cumin - ~1 TBSP',
    'Smoked paprika - 1 ½ tsp',
    'Red pepper flakes - 1 tsp',
    'Bay leaf - 1',
    'Chipotle chile flakes - 1 to 1 ¼ tsp'
  ],
  'Refrigerated': [
    'Taco-sized corn or flour tortillas - 12 to 15',
    'Extra-firm tofu - 1 block',
    'Toasted sesame oil - 1 TBSP + 2 tsp'
  ]
};

function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [checkedItems, setCheckedItems] = useState({});
  const [newCategory, setNewCategory] = useState('');
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);

  const handleCheck = (item) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories(prev => ({
        ...prev,
        [newCategory]: []
      }));
      setNewCategory('');
      setShowAddCategory(false);
    }
  };

  const handleAddItem = () => {
    if (newItem.trim() && selectedCategory) {
      setCategories(prev => ({
        ...prev,
        [selectedCategory]: [...prev[selectedCategory], newItem]
      }));
      setNewItem('');
      setSelectedCategory('');
      setShowAddItem(false);
    }
  };

  const handleDeleteItem = (category, itemIndex) => {
    setCategories(prev => ({
      ...prev,
      [category]: prev[category].filter((_, index) => index !== itemIndex)
    }));
  };

  const handleSaveList = () => {
    const listData = {
      categories,
      checkedItems
    };
    localStorage.setItem('groceryList', JSON.stringify(listData));
    alert('List saved successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Grocery List</h1>
        <div className="space-x-2">
          <button 
            onClick={() => setShowAddCategory(true)}
            className="bg-green-500 text-white px-3 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-green-600"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
          <button 
            onClick={handleSaveList}
            className="bg-blue-500 text-white px-3 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-blue-600"
          >
            <Save className="w-4 h-4" /> Save List
          </button>
        </div>
      </div>

      {showAddCategory && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category Name"
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex gap-2">
            <button 
              onClick={handleAddCategory}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Add
            </button>
            <button 
              onClick={() => setShowAddCategory(false)}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setShowAddItem(true)}
        className="bg-blue-500 text-white px-3 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-blue-600"
      >
        <Plus className="w-4 h-4" /> Add Item
      </button>

      {showAddItem && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="New Item"
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex gap-2">
            <button 
              onClick={handleAddItem}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Add
            </button>
            <button 
              onClick={() => setShowAddItem(false)}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {Object.entries(categories).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-semibold mb-3">{category}</h2>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={checkedItems[item] || false}
                    onChange={() => handleCheck(item)}
                    className="h-5 w-5 rounded border-gray-300"
                  />
                  <span className={checkedItems[item] ? 'line-through text-gray-500' : ''}>
                    {item}
                  </span>
                </div>
                <button 
                  onClick={() => handleDeleteItem(category, index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;