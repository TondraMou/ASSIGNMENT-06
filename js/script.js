// Load categories from API
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => {
      console.log("Categories Data: ", data);
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
      <button id="btn-${item.category}" onclick="handleCategoryClick('${item.category}')" class="category-btn abc">
        <img src="${item.category_icon}" alt="${item.category}" class="w-[30px]" />
        <span>${item.category}</span>
      </button>
    `;
    categoryContainer.append(buttonContainer);
  });
};

let allPets = [];
let currentCategory = null;

// Function to load pets (all pets initially, or filtered by category)
const loadPets = async (categoryName = null) => {
  currentCategory = categoryName;
  const loadingSpinner = document.getElementById('loadingSpinner');
  loadingSpinner.classList.remove('hidden');

  try {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();

    const timeoutPromise = new Promise(resolve => setTimeout(resolve, 2000));
    await timeoutPromise;

    const petsContainer = document.getElementById('pets-container');
    petsContainer.innerHTML = '';

    if (data.status) {
      allPets = data.pets;
      
      let pets = allPets;

      if (categoryName) {
        pets = pets.filter((pet) => pet.category === categoryName);
      }

      displayPets(pets);
      loadingSpinner.classList.add('hidden');
      
    } else {
      console.log('Failed to fetch pet data');
    }
  } catch (error) {
    console.error('Error fetching pets:', error);
  }
};

const handleCategoryClick = (categoryName) => {
  loadPets(categoryName);

  // Remove active class from all buttons
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach((btn) => btn.classList.remove('active'));

  // Add active class to the clicked button
  const activeButton = document.getElementById(`btn-${categoryName}`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
};

// Function to display pets (reusable for both loading and sorting)
const displayPets = (pets) => {
  const petsContainer = document.getElementById('pets-container');
  petsContainer.innerHTML = '';

  if (pets.length === 0) {
    petsContainer.classList.remove("grid");
    petsContainer.innerHTML = `
      <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="images/error.webp">
        <h2 class="text-center font-bold text-2xl">No Information Available</h2>
        <p class="text-center text-gray-400">"Currently, there are no pets available in this category. Please explore other options."</p>
      </div>
    `;
    return;
  } else {
    petsContainer.classList.add("grid");
  }

  pets.forEach((pet) => {
    const petCard = document.createElement('div');
    petCard.classList.add('pet-card');

    petCard.innerHTML = `
      <div class="border rounded-lg border-slate-200">
        <div class="h-[160px]"> 
          <img src="${pet.image}" alt="${pet.pet_name}" class="border rounded-lg w-full h-full object-cover">
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
            <button class="p-2 border rounded-lg border-[#0E7A8126]" onclick="addToList('${pet.image}')">
              <i class="ri-thumb-up-line"></i>
            </button>
            <button class="p-2 border rounded-lg border-[#0E7A8126] text-[#0E7A81] font-semibold" onclick="adoptPet(this)">Adopt</button>
            <button class="p-2 border rounded-lg border-[#0E7A8126] text-[#0E7A81] font-semibold" onclick="showPetDetails(${pet.petId})">Details</button>
          </div>
        </div>
      </div>
    `;
    petsContainer.append(petCard);
  });
};

// Function to sort pets by price (descending)
const sortPetsByPrice = () => {
  let petsToSort = allPets;

  if (currentCategory) {
    petsToSort = petsToSort.filter((pet) => pet.category === currentCategory);
  }
  const sortedPets = [...petsToSort].sort((a, b) => (b.price || 0) - (a.price || 0));
  displayPets(sortedPets);
};

document.getElementById('sort-price-btn').addEventListener('click', sortPetsByPrice);

// Function to add a pet image to the list
function addToList(imageUrl) {
  const listContainer = document.getElementById('add-to-list');
  const newImageContainer = document.createElement('div');
  newImageContainer.innerHTML = `
    <div class="border rounded-lg border-slate-200">
      <div class="p-2 h-[160px]">
        <img src="${imageUrl}" alt="" class="border rounded-lg h-full w-full object-cover">
      </div>
    </div>
  `;
  listContainer.appendChild(newImageContainer);
}

const showPetDetails = async (petId) => {
  try {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await response.json();
    console.log(data);

    if (data.status) {
      const pet = data.petData;
      const modalContent = `
        <img src="${pet.image}" alt="${pet.pet_name}" class="w-full h-auto aspect-video mb-2">
        <h3 class="font-semibold text-xl">${pet.pet_name}</h3>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-2 mt-2 mb-2">
        <div class="flex gap-2">
        <i class="ri-function-line text-gray-400"></i>
        <p class="text-gray-400">Breed:${pet.breed || 'Unknown'}</p>
        </div>
        <div class="flex gap-2">
        <i class="ri-calendar-schedule-line text-gray-400"></i>
        <p class="text-gray-400">Date of Birth: ${pet.date_of_birth || 'Not available'}</p>
        </div>
        <div class="flex gap-2">
        <i class="ri-women-line text-gray-400"></i>
        <p class="text-gray-400">Gender: ${pet.gender}</p>
        </div>
        <div class="flex gap-2">
        <i class="ri-money-dollar-circle-fill text-gray-400"></i>
        <p class="text-gray-400">Price: $${pet.price || 'Not available'}</p>
        </div>
        <div class="flex gap-2">
        <i class="ri-syringe-line text-gray-400"></i>
        <p class="text-gray-400">Vaccination Status: ${pet.vaccinated_status || 'Not available'}</p>
        </div>
        </div>
        <hr class="mb-2">
        <p class="text-gray-400"><strong class="text-black">Details Information</strong> <br> ${pet.pet_details || 'Not available'}</p>
      `;
      document.getElementById('modal-content').innerHTML = modalContent;
      const modal = document.getElementById('customModal');
      modal.showModal();
    } else {
      console.log('Failed to fetch pet details');
    }
  } catch (error) {
    console.error('Error fetching pet details:', error);
  }
};

function adoptPet(button) {
  const modal = document.getElementById('adoptionModal');
  const countdownElement = document.getElementById('countdown');
  let countdown = 3;
  modal.classList.remove('hidden');
  modal.showModal();
  countdownElement.innerText = countdown;

  const interval = setInterval(() => {
    countdown -= 1;
    countdownElement.innerText = countdown;

    if (countdown <= 0) {
      clearInterval(interval);
      modal.close();
      button.disabled = true;
      button.innerText = "Adopted";
      button.classList.add('bg-slate-200');
      modal.classList.add('hidden');
    }
  }, 1000);
}
 
loadPets();
loadCategories();