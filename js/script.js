//fetch, load category
  const loadCategories = () => {
    // Fetch the data
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("Categories Data: ", data); // Debugging
        displayCategories(data.categories);
      })
      .catch((error) => console.log(error));
  };

  // Display categories
  const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
  
    categories.forEach((item) => {
      const buttonContainer = document.createElement("div");
      buttonContainer.innerHTML = `
        
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="category-btn abc">
        <img src="${item.category_icon}" alt="${item.category}" class="w-[30px]" />
        <span>${item.category}</span>
        </button>
      `;
      categoryContainer.append(buttonContainer);
    });
  };


  loadCategories()