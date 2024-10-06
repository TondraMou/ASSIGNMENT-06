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

      // Check if the fetch was successful
      if (data.status) {
        const pets = data.pets;
        const petsContainer = document.getElementById('pets-container');

        // Loop through each pet and create a card
        pets.forEach((pet) => {
          const petCard = document.createElement('div');
          petCard.classList.add('pet-card');

          petCard.innerHTML = `
            <div class="border rounded-lg border-slate-200">
            <img src="${pet.image}" alt="${pet.pet_name}" class="border rounded-lg">
            <div class="pet-details">
              <h3 class="pet-name">${pet.pet_name}</h3>
              <p class="pet-breed">Breed: ${pet.breed || 'Unknown'}</p>
              <p class="pet-gender">Gender: ${pet.gender}</p>
              <p class="pet-dob">Date of Birth: ${pet.date_of_birth || 'Not available'}</p>
              <p class="pet-price">Price: $${pet.price || 'Not available'}</p>
            </div>
            </div>
          `;

          // Append the pet card to the pets container
          petsContainer.append(petCard);
        });
      } else {
        console.log('Failed to fetch pet data');
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };
  loadPets()
  loadCategories()