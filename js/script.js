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

  const loadPets = async () => {
    try {
      const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
      const data = await response.json();
  
      if (data.status) {
        const pets = data.pets;
        const petsContainer = document.getElementById('pets-container');
  
        // Loop through each pet and create a card
        pets.forEach((pet) => {
          const petCard = document.createElement('div');
          petCard.classList.add('pet-card');
  
          petCard.innerHTML = `
            <div class="border rounded-lg border-slate-200">
              <div class="h-[160px]"> 
                <img src="${pet.image}" alt="${pet.pet_name}" class="border rounded-lg w-full h-full">
              </div>
              <div class="pet-details">
                <h3 class="font-semibold text-xl">${pet.pet_name}</h3>
                <div class="flex gap-2">
                  <i class="ri-function-line text-gray-400"></i>
                  <p class="text-gray-400">Breed: ${pet.breed || 'Unknown'}</p>
                </div>
                <div class="flex gap-2">
                  <i class="ri-calendar-schedule-line text-gray-400"></i>
                  <p class="text-gray-400">Birth: ${pet.date_of_birth || 'Not available'}</p>
                </div>
                <div class="flex gap-2">
                  <i class="ri-women-line text-gray-400"></i>
                  <p class="text-gray-400">Gender: ${pet.gender}</p>
                </div>
                <div class="flex gap-2">
                  <i class="ri-money-dollar-circle-fill text-gray-400"></i>
                  <p class="text-gray-400">Price: $${pet.price || 'Not available'}</p>
                </div>
                <hr class="mt-2 mb-2">
                <div class="flex justify-between p-1">
                  <!-- Add to List Button with pet image passed -->
                  <button class="p-2 border rounded-lg border-[#0E7A8126]" onclick="addToList('${pet.image}')">
                    <i class="ri-thumb-up-line"></i>
                  </button>
                  <button class="p-2 border rounded-lg border-[#0E7A8126] text-[#0E7A81] font-semibold">Adopt</button>
                  <button class="p-2 border rounded-lg border-[#0E7A8126] text-[#0E7A81] font-semibold">Details</button>
                </div>
              </div>
            </div>
          `;
          petsContainer.append(petCard);
        });
      } else {
        console.log('Failed to fetch pet data');
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };
  

  function addToList(imageUrl) {
    const listContainer = document.getElementById('add-to-list');
    const newImageContainer = document.createElement('div');
    newImageContainer.innerHTML = `
      <div class="border rounded-lg border-slate-200">
      <div class="p-2 h-[160px]">
        <img src="${imageUrl}" alt="" class="border rounded-lg h-full w-full">
      </div>
      </div>
    `;
    listContainer.appendChild(newImageContainer);
  }  

  loadPets()
  loadCategories()