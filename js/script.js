console.log("🚀 Script Loaded Successfully!");

// ✅ Check if LocalStorage is Working
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
console.log("🔹 Wishlist Loaded from LocalStorage:", wishlist);
//Wishlist

// ✅ Load Books & Wishlist on Page Load
document.addEventListener("DOMContentLoaded", () => {
  updateWishlistCount();
  console.log("🔹 Checking book_lists:", book_lists); // Debug log

  if (document.getElementById("book-display")) {
    if (typeof book_lists !== "undefined" && Array.isArray(book_lists) && book_lists.length > 0) {
      renderBookList(book_lists);
    } else {
      console.error("❌ Error: book_lists is undefined or empty!");
    }
  }

  if (document.getElementById("wishlist-container")) {
    updateWishlist();
  }
});

// ✅ Function to Render Books (Handles Wishlist & Add to Cart)
const renderBookList = (books) => {
  const booksContainer = document.getElementById("book-display");

  if (!booksContainer) {
    console.error("❌ Error: #book-display not found!");
    return;
  }

  booksContainer.innerHTML = books
    .map((book) => {
      return `
          <div class="book-item" data-genre="${book.genre}">
              <img src="images/${book.image}" alt="${book.title}" class="book-cover">
              <div class="book-info">
                  <h2>${book.title}</h2>
                  <p><strong>Author:</strong> ${book.author}</p>
                  <p><strong>Price:</strong> £${book.price.toFixed(2)}</p>
                  <p><strong>Genre:</strong> ${book.genre}</p>
                  <p><strong>Description:</strong> ${book.description}</p>
                  <button class="btn btn-primary add-to-cart" data-id="${book.id}" data-price="${book.price}" data-title="${book.title}">Add to Cart</button>
                  <button class="btn btn-outline-danger wishlist-btn" data-id="${book.id}">❤️ Wishlist</button>
              </div>
          </div>
          `;
    })
    .join("");

  console.log("✅ Books have been rendered."); // Debugging log

  setTimeout(() => {
    attachWishlistEvents(); // ✅ Ensures wishlist buttons work after rendering
  }, 500); // Short delay to ensure elements exist before attaching events
};

// ✅ Function to Handle Wishlist Click
const attachWishlistEvents = () => {
  console.log("✅ Running attachWishlistEvents...");

  let buttons = document.querySelectorAll(".wishlist-btn");

  console.log(`🔹 Found ${buttons.length} wishlist buttons.`);

  if (buttons.length === 0) {
    console.error("❌ No wishlist buttons found on the page!");
  }

  buttons.forEach(button => {
    console.log(`🔹 Wishlist button detected for book ID: ${button.getAttribute("data-id")}`);

    button.addEventListener("click", () => {
      let bookId = button.getAttribute("data-id");
      console.log(`✅ Wishlist button clicked for book ID: ${bookId}`);
      addToWishlist(bookId);
    });
  });
};

// ✅ Function to Add Book to Wishlist
const addToWishlist = (id) => {
  console.log("🔹 addToWishlist() called for ID:", id);

  if (typeof book_lists === "undefined" || !Array.isArray(book_lists) || book_lists.length === 0) {
    console.error("❌ Error: book_lists is undefined or empty!");
    return;
  }

  const book = book_lists.find((item) => item.id === parseInt(id));

  if (!book) {
    console.error(`❌ Error: Book with ID ${id} not found in book_lists!`);
    return;
  }

  // ✅ Prevent duplicate wishlist entries
  if (!wishlist.some((b) => b.id === book.id)) {
    wishlist.push(book);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    console.log(`✅ Book "${book.title}" added to Wishlist!`);
    alert(`❤️ "${book.title}" added to Wishlist!`);
    updateWishlist(); // Refresh wishlist
    updateWishlistCount();
  } else {
    alert("✅ This book is already in your Wishlist!");
  }

  console.log("🔹 Current Wishlist:", wishlist);
};

// ✅ Function to Load Wishlist and Display Books
const updateWishlist = () => {
  console.log("🔹 Updating Wishlist...");

  let wishlistContainer = document.getElementById("wishlist-container");
  updateWishlistCount();

  if (!wishlistContainer) {
    console.error("❌ Error: Wishlist container not found!");
    return;
  }

  wishlistContainer.innerHTML = ""; // Clear previous content

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = "<p>No books in wishlist.</p>";
  } else {
    wishlist.forEach(book => {
      let li = document.createElement("li");
      li.classList.add("wishlist-item"); // ✅ Apply styling to prevent overlap
      li.innerHTML = `
              📖 <strong>${book.title}</strong> by ${book.author} - £${book.price}
              <button type="button" class="btn btn-primary btn-sm" data-id="${book.id}">Remove</button>
          `;
      wishlistContainer.appendChild(li);
    });

    // ✅ Attach event listeners AFTER rendering the wishlist
    document.querySelectorAll(".btn.btn-primary.btn-sm").forEach(button => {
      button.addEventListener("click", function () {
        let bookId = this.getAttribute("data-id");
        console.log(`🔹 Remove button clicked for ID: ${bookId}`);
        removeFromWishlist(bookId);
      });
    });
  }

  updateWishlistCount(); // ✅ Ensure wishlist count updates after removal
  console.log("🔹 Wishlist Updated:", wishlist);
};

console.log("🔹 Wishlist Updated:", wishlist);


// ✅ Function to Remove a Book from Wishlist
const removeFromWishlist = (id) => {
  wishlist = wishlist.filter(book => book.id !== parseInt(id));
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlist(); // Refresh UI
  updateWishlistCount();
};
// ✅ Function to Update Wishlist Count
const updateWishlistCount = () => {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let wishlistCountElement = document.getElementById("wishlist-count");

  if (wishlistCountElement) {
    wishlistCountElement.textContent = wishlist.length;
    console.log(`🔹 Wishlist Count Updated: ${wishlist.length}`);
  } else {
    console.error("❌ Wishlist count element not found!");
  }
};

// ✅ Book Details
const book_details = [
  {
    id: 0,
    title: "Atonement",
    price: 9.99,
    author: "Ian McEwan",
    genre: "Classic Literature",
    image: "atonement.jpg",
    description: "A profound exploration of love, guilt, and redemption spanning decades of secrets and tragedy.",
  },
  {
    id: 1,
    title: "The Road",
    price: 8.99,
    author: "Cormac McCarthy",
    genre: "Classic Literature",
    image: "the-road.jpg",
    description: "A harrowing tale of survival and the bond between father and son in a post-apocalyptic world.",
  },
  {
    id: 2,
    title: "Beloved",
    price: 10.99,
    author: "Toni Morrison",
    genre: "Classic Literature",
    image: "beloved.jpg",
    description: "A powerful exploration of slavery's legacy, centered on a mother haunted by her past.",
  },
  {
    id: 3,
    title: "The Silent Patient",
    price: 8.99,
    author: "Alex Michaelides",
    genre: "Mystery and Thriller",
    image: "the-silent-patient.jpg",
    description: "A psychological thriller about a woman who stops speaking after a violent act and the therapist determined to uncover the truth.",
  },
  {
    id: 4,
    title: "Gone Girl",
    price: 7.99,
    author: "Gillian Flynn",
    genre: "Mystery and Thriller",
    image: "gone-girl.jpg",
    description: "A gripping story of a marriage gone wrong, filled with twists and shocking revelations.",
  },
  {
    id: 5,
    title: "Big Little Lies",
    price: 8.49,
    author: "Liane Moriarty",
    genre: "Mystery and Thriller",
    image: "big-little-lies.jpg",
    description: "A tale of secrets, scandal, and murder in an affluent seaside town.",
  },
  {
    id: 6,
    title: "Project Hail Mary",
    price: 9.99,
    author: "Andy Weir",
    genre: "Science Fiction",
    image: "project-hail-mary.jpg",
    description: "A lone astronaut must save humanity from extinction in this thrilling space adventure.",
  },
  {
    id: 7,
    title: "Dune",
    price: 8.99,
    author: "Frank Herbert",
    genre: "Science Fiction",
    image: "dune.jpg",
    description: "An epic tale of politics, religion, and survival on the desert planet of Arrakis.",
  },
  {
    id: 8,
    title: "Dark Matter",
    price: 7.99,
    author: "Blake Crouch",
    genre: "Science Fiction",
    image: "dark-matter.jpg",
    description: "A mind-bending thriller about alternate realities and the choices that define our lives.",
  },
  {
    id: 9,
    title: "A Court of Thorns and Roses",
    price: 9.99,
    author: "Sarah J. Maas",
    genre: "Fantasy",
    image: "acotar.jpg",
    description: "A lush fantasy romance set in a world of faeries, betrayal, and forbidden love.",
  },
  {
    id: 10,
    title: "The Name of the Wind",
    price: 8.99,
    author: "Patrick Rothfuss",
    genre: "Fantasy",
    image: "name-of-the-wind.jpg",
    description: "The tale of a gifted young man’s rise to legendary fame and fortune.",
  },
  {
    id: 11,
    title: "The Priory of the Orange Tree",
    price: 10.99,
    author: "Samantha Shannon",
    genre: "Fantasy",
    image: "priory-of-the-orange-tree.jpg",
    description: "A sweeping fantasy epic of dragons, queens, and ancient magic.",
  },
  {
    id: 12,
    title: "It Ends with Us",
    price: 8.99,
    author: "Colleen Hoover",
    genre: "Romance",
    image: "it-ends-with-us.jpg",
    description: "An emotional romance about love, resilience, and difficult choices.",
  },
  {
    id: 13,
    title: "The Seven Husbands of Evelyn Hugo",
    price: 9.99,
    author: "Taylor Jenkins Reid",
    genre: "Romance",
    image: "the-seven-husbands-of-evelyn-hugo.jpg",
    description: "A glamorous Hollywood icon recounts her scandalous love life and career.",
  },
  {
    id: 14,
    title: "People We Meet on Vacation",
    price: 7.99,
    author: "Emily Henry",
    genre: "Romance",
    image: "people-we-meet-on-vacation.jpg",
    description: "A witty and heartfelt story of friendship and love over annual vacations.",
  },
  {
    id: 15,
    title: "The Nightingale",
    price: 8.99,
    author: "Kristin Hannah",
    genre: "Historical Fiction",
    image: "the-nightingale.jpg",
    description: "The story of two sisters in Nazi-occupied France who fight for survival and freedom.",
  },
  {
    id: 16,
    title: "All the Light We Cannot See",
    price: 9.99,
    author: "Anthony Doerr",
    genre: "Historical Fiction",
    image: "all-the-light-we-cannot-see.jpg",
    description: "A stunning tale of a blind girl and a German boy whose paths collide in occupied France.",
  },
  {
    id: 17,
    title: "The Paris Library",
    price: 8.49,
    author: "Janet Skeslien Charles",
    genre: "Historical Fiction",
    image: "the-paris-library.jpg",
    description: "A captivating novel about the heroic librarians of the American Library in Paris during WWII.",
  },
  {
    id: 18,
    title: "Mexican Gothic",
    price: 8.99,
    author: "Silvia Moreno-Garcia",
    genre: "Horror",
    image: "mexican-gothic.jpg",
    description: "A gothic horror tale set in a creepy mansion in 1950s Mexico.",
  },
  {
    id: 19,
    title: "The Haunting of Hill House",
    price: 7.99,
    author: "Shirley Jackson",
    genre: "Horror",
    image: "haunting-of-hill-house.jpg",
    description: "A chilling story of a group investigating a famously haunted mansion.",
  },
  {
    id: 20,
    title: "The Final Girl Support Group",
    price: 8.49,
    author: "Grady Hendrix",
    genre: "Horror",
    image: "final-girl-support-group.jpg",
    description: "A gripping and darkly funny tale about women who survived horror movie-like massacres.",
  },
  {
    id: 21,
    title: "The Hunger Games",
    price: 8.99,
    author: "Suzanne Collins",
    genre: "Adventure",
    image: "the-hunger-games.jpg",
    description: "A dystopian tale of survival where teens are forced to compete in a deadly televised game.",
  },
  {
    id: 22,
    title: "Circe",
    price: 9.49,
    author: "Madeline Miller",
    genre: "Adventure",
    image: "circe.jpg",
    description: "A reimagining of Greek mythology, following the life of the powerful witch Circe.",
  },
  {
    id: 23,
    title: "Into the Wild",
    price: 7.99,
    author: "Jon Krakauer",
    genre: "Adventure",
    image: "into-the-wild.jpg",
    description: "The true story of a young man who left society to explore the wilderness of Alaska.",
  },
  {
    id: 24,
    title: "Becoming",
    price: 10.99,
    author: "Michelle Obama",
    genre: "Biography and Memoir",
    image: "becoming.jpg",
    description: "An intimate memoir by the former First Lady, sharing her inspiring journey.",
  },
  {
    id: 25,
    title: "Educated",
    price: 9.49,
    author: "Tara Westover",
    genre: "Biography and Memoir",
    image: "educated.jpg",
    description: "A memoir about breaking free from a strict, uneducated upbringing to pursue knowledge.",
  },
  {
    id: 26,
    title: "The Glass Castle",
    price: 8.99,
    author: "Jeannette Walls",
    genre: "Biography and Memoir",
    image: "the-glass-castle.jpg",
    description: "A compelling memoir of resilience and family dysfunction, told with raw honesty.",
  },
  {
    id: 27,
    title: "The Sun and Her Flowers",
    price: 7.49,
    author: "Rupi Kaur",
    genre: "Poetry",
    image: "the-sun-and-her-flowers.jpg",
    description: "A beautiful poetry collection about growth, healing, and self-love.",
  },
  {
    id: 28,
    title: "Milk and Honey",
    price: 6.99,
    author: "Rupi Kaur",
    genre: "Poetry",
    image: "milk-and-honey.jpg",
    description: "A poignant collection of poetry on love, loss, trauma, and healing.",
  },
  {
    id: 29,
    title: "Leaves of Grass",
    price: 8.99,
    author: "Walt Whitman",
    genre: "Poetry",
    image: "leaves-of-grass.jpg",
    description: "A timeless collection celebrating nature, humanity, and the American spirit.",
  },
  {
    id: 30,
    title: "Meditations",
    price: 6.99,
    author: "Marcus Aurelius",
    genre: "Philosophy",
    image: "meditations.jpg",
    description: "Reflections on life and virtue by a Roman emperor, offering timeless wisdom.",
  },
  {
    id: 31,
    title: "The Republic",
    price: 8.99,
    author: "Plato",
    genre: "Philosophy",
    image: "the-republic.jpg",
    description: "A foundational philosophical work exploring justice, politics, and human nature.",
  },
  {
    id: 32,
    title: "Beyond Good and Evil",
    price: 7.49,
    author: "Friedrich Nietzsche",
    genre: "Philosophy",
    image: "beyond-good-and-evil.jpg",
    description: "A thought-provoking exploration of morality and the nature of truth.",
  },
];
// 📌 19th-century Books Details
const nineteen_century_books = [
  {
    id: 33,
    title: "Pride and Prejudice",
    price: 9.99,
    author: "Jane Austen",
    genre: "Classic Literature",
    image: "pride_and_prejudice.jpg",
    description: "A beloved tale of love, class, and social misunderstandings in Regency-era England.",
  },
  {
    id: 34,
    title: "Moby-Dick",
    price: 11.99,
    author: "Herman Melville",
    genre: "Classic Literature",
    image: "moby_dick.jpg",
    description: "An epic sea adventure about obsession and the quest for a great white whale.",
  },
  {
    id: 35,
    title: "Jane Eyre",
    price: 8.99,
    author: "Charlotte Brontë",
    genre: "Classic Literature",
    image: "jane_eyre.jpg",
    description: "The story of an independent woman navigating love and social constraints in Victorian England.",
  },
  {
    id: 36,
    title: "The Woman in White",
    price: 10.99,
    author: "Wilkie Collins",
    genre: "Mystery and Thriller",
    image: "the_woman_in_white.jpg",
    description: "A classic mystery novel filled with suspense, deception, and shocking twists.",
  },
  {
    id: 37,
    title: "The Moonstone",
    price: 9.99,
    author: "Wilkie Collins",
    genre: "Mystery and Thriller",
    image: "the_moonstone.jpg",
    description: "Often considered the first detective novel, it tells the story of a stolen gem.",
  },
  {
    id: 38,
    title: "The Hound of the Baskervilles",
    price: 8.99,
    author: "Sir Arthur Conan Doyle",
    genre: "Mystery and Thriller",
    image: "The_Hound_of _the_Baskervilles.jpg",
    description: "A Sherlock Holmes classic involving a deadly legend on the moors.",
  },
  {
    id: 39,
    title: "Frankenstein",
    price: 10.99,
    author: "Mary Shelley",
    genre: "Science Fiction",
    image: "frankenstein.jpg",
    description: "The tale of a scientist who creates life, leading to tragic consequences.",
  },
  {
    id: 40,
    title: "The Time Machine",
    price: 9.99,
    author: "H.G. Wells",
    genre: "Science Fiction",
    image: "the_time_machine.jpg",
    description: "A pioneering work of science fiction exploring time travel and dystopian futures.",
  },
  {
    id: 41,
    title: "The Island of Doctor Moreau",
    price: 8.99,
    author: "H.G. Wells",
    genre: "Science Fiction",
    image: "the_island_of_doctor_moreau.jpg",
    description: "A chilling story of genetic experiments on a remote island.",
  },
  {
    id: 42,
    title: "Alice's Adventures in Wonderland",
    price: 9.99,
    author: "Lewis Carroll",
    genre: "Fantasy",
    image: "alice_in_wonderland.jpg",
    description: "A whimsical and imaginative tale of a girl's journey through a magical world.",
  },
  {
    id: 43,
    title: "Through the Looking-Glass",
    price: 9.99,
    author: "Lewis Carroll",
    genre: "Fantasy",
    image: "through_the_looking_glass.jpg",
    description: "The sequel to Alice's adventures, exploring a curious mirror world.",
  },
  {
    id: 44,
    title: "Phantastes",
    price: 10.99,
    author: "George MacDonald",
    genre: "Fantasy",
    image: "phantastes.jpg",
    description: "A Victorian fantasy novel exploring mystical lands and self-discovery.",
  },
  {
    id: 45,
    title: "Sense and Sensibility",
    price: 9.99,
    author: "Jane Austen",
    genre: "Romance",
    image: "sense_and_sensibility.jpg",
    description: "A story of two sisters navigating love and financial struggles in Georgian England.",
  },
  {
    id: 46,
    title: "Emma",
    price: 9.99,
    author: "Jane Austen",
    genre: "Romance",
    image: "emma.jpg",
    description: "A lighthearted novel about matchmaking and romantic misunderstandings.",
  },
  {
    id: 47,
    title: "North and South",
    price: 10.99,
    author: "Elizabeth Gaskell",
    genre: "Romance",
    image: "north_and_south.jpg",
    description: "A tale of love, class conflict, and industrial change in Victorian England.",
  },
  {
    id: 48,
    title: "War and Peace",
    price: 15.99,
    author: "Leo Tolstoy",
    genre: "Historical Fiction",
    image: "war_and_peace.jpg",
    description: "A monumental novel exploring love, war, and humanity in Napoleonic-era Russia.",
  },
  {
    id: 49,
    title: "A Tale of Two Cities",
    price: 10.99,
    author: "Charles Dickens",
    genre: "Historical Fiction",
    image: "a_tale_of_two_cities.jpg",
    description: "A story of sacrifice, revolution, and love during the French Revolution.",
  },
  {
    id: 50,
    title: "The Scarlet Letter",
    price: 9.99,
    author: "Nathaniel Hawthorne",
    genre: "Historical Fiction",
    image: "the_scarlet_letter.jpg",
    description: "An exploration of sin, guilt, and redemption in Puritan New England.",
  },
  {
    id: 51,
    title: "Dracula",
    price: 10.99,
    author: "Bram Stoker",
    genre: "Horror",
    image: "dracula.jpg",
    description: "The classic Gothic tale of the infamous vampire Count Dracula.",
  },
  {
    id: 52,
    title: "The Strange Case of Dr. Jekyll and Mr. Hyde",
    price: 8.99,
    author: "Robert Louis Stevenson",
    genre: "Horror",
    image: "The Strange Case of Dr. Jekyll and Mr. Hyde.jpg",
    description: "A chilling novella about duality and the battle between good and evil.",
  },
  {
    id: 53,
    title: "Carmilla",
    price: 9.99,
    author: "Sheridan Le Fanu",
    genre: "Horror",
    image: "carmilla.jpg",
    description: "One of the earliest vampire tales, exploring themes of seduction and horror.",
  },
  {
    id: 54,
    title: "Treasure Island",
    price: 10.99,
    author: "Robert Louis Stevenson",
    genre: "Adventure",
    image: "treasure_island.jpg",
    description: "A swashbuckling tale of pirates and hidden treasure.",
  },
  {
    id: 55,
    title: "The Adventures of Huckleberry Finn",
    price: 9.99,
    author: "Mark Twain",
    genre: "Adventure",
    image: "huckleberry_finn.jpg",
    description: "A young boy’s journey down the Mississippi River, exploring themes of race and freedom.",
  },
  {
    id: 56,
    title: "King Solomon's Mines",
    price: 11.99,
    author: "H. Rider Haggard",
    genre: "Adventure",
    image: "king_solomons_mines.jpg",
    description: "An action-packed quest for a lost treasure in Africa.",
  },
  {
    id: 57,
    title: "Narrative of the Life of Frederick Douglass",
    price: 12.99,
    author: "Frederick Douglass",
    genre: "Biography and Memoir",
    image: "narrative_of_frederick_douglass.jpg",
    description: "The autobiography of a former slave turned abolitionist and orator.",
  },
  {
    id: 58,
    title: "Up from Slavery",
    price: 11.99,
    author: "Booker T. Washington",
    genre: "Biography and Memoir",
    image: "up_from_slavery.jpg",
    description: "An inspiring memoir of overcoming adversity and becoming a prominent educator.",
  },
  {
    id: 59,
    title: "Autobiography",
    price: 9.99,
    author: "John Stuart Mill",
    genre: "Biography and Memoir",
    image: "autobiography_john_stuart_mill.jpg",
    description: "The reflections of one of the most influential thinkers of his time.",
  },
  {
    id: 60,
    title: "Leaves of Grass",
    price: 9.99,
    author: "Walt Whitman",
    genre: "Poetry",
    image: "leaves_of_grass.jpg",
    description: "A celebration of individuality and the natural world in this poetic masterpiece.",
  },
  {
    id: 61,
    title: "The Raven and Other Poems",
    price: 8.99,
    author: "Edgar Allan Poe",
    genre: "Poetry",
    image: "the_raven.jpg",
    description: "A haunting collection of poetry by the master of the macabre.",
  },
  {
    id: 62,
    title: "Songs of Innocence and of Experience",
    price: 10.99,
    author: "William Blake",
    genre: "Poetry",
    image: "songs_of_innocence.jpg",
    description: "A duality of poetry exploring innocence and the darker aspects of life.",
  },
  {
    id: 63,
    title: "Thus Spoke Zarathustra",
    price: 13.99,
    author: "Friedrich Nietzsche",
    genre: "Philosophy",
    image: "thus_spoke_zarathustra.jpg",
    description: "A philosophical work addressing morality, religion, and the concept of the 'Übermensch.'",
  },
  {
    id: 64,
    title: "On Liberty",
    price: 10.99,
    author: "John Stuart Mill",
    genre: "Philosophy",
    image: "on_liberty.jpg",
    description: "A foundational text on individual freedom and its limits within society.",
  },
  {
    id: 65,
    title: "The Subjection of Women",
    price: 9.99,
    author: "John Stuart Mill",
    genre: "Philosophy",
    image: "the_subjection_of_women.jpg",
    description: "A groundbreaking work advocating for gender equality and women's rights.",
  },
];

// 📌 Selectors
const booksContainerDisplay = document.getElementById("book-display");
const cartItemsElement = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const cartCountElement = document.getElementById("cart-count");

// 📌 Shipping Selectors
const regionSelectElement = document.getElementById("region"); // Dropdown
const shippingFeeElement = document.getElementById("shipping-fee"); // Display text
const grandTotalElement = document.getElementById("grand-total"); // Display text

// 📌 Update Shipping Fee & Grand Total
const updateShippingAndGrandTotal = () => {
  if (!regionSelectElement || !shippingFeeElement || !grandTotalElement) {
    console.error("One or more shipping elements are missing.");
    return;
  }

  const selectedOption = regionSelectElement.options[regionSelectElement.selectedIndex]?.text || "";
  const shippingFeeMatch = selectedOption.match(/£(\d+)/); // Extracts number from "Europe (£10)"

  const shippingFee = shippingFeeMatch ? parseFloat(shippingFeeMatch[1]) : 0;
  const total = parseFloat(localStorage.getItem("totalprice")) || 0;
  const grandTotal = total + shippingFee;

  // Update UI
  shippingFeeElement.textContent = `Shipping Fee: £${shippingFee.toFixed(2)}`;
  grandTotalElement.textContent = `Grand Total: £${grandTotal.toFixed(2)}`;
};

// 📌 Attach Event Listener for Region Selection
regionSelectElement?.addEventListener("change", updateShippingAndGrandTotal);

// 📌 Determine Current Page
const currentPage = window.location.pathname.split("/").pop().replace(".html", "");

// 📌 Select Book List Based on Page
const book_lists = currentPage === "19th-century" ? nineteen_century_books : book_details;

// 📌 Render Books to the Page (Handles Wishlist & Add to Cart)
const renderBooks = (filteredBooks) => {
  const booksContainer = document.getElementById("book-display");

  if (!booksContainer) {
    console.error("Error: #book-display not found!");
    return;
  }

  booksContainer.innerHTML = filteredBooks
    .map((book) => {
      return `
          <div class="book-item" data-genre="${book.genre}">
              <img src="images/${book.image}" alt="${book.title}" class="book-cover">
              <div class="book-info">
                  <h2>${book.title}</h2>
                  <p><strong>Author:</strong> ${book.author}</p>
                  <p><strong>Price:</strong> £${book.price.toFixed(2)}</p>
                  <p><strong>Genre:</strong> ${book.genre}</p>
                  <p><strong>Description:</strong> ${book.description}</p>
                  <button class="btn btn-primary add-to-cart" data-id="${book.id}" data-price="${book.price}" data-title="${book.title}">Add to Cart</button>
                  <button class="btn btn-outline-danger wishlist-btn" data-id="${book.id}">❤️ Wishlist</button>
              </div>
          </div>
          `;
    })
    .join("");

  attachEventListeners(); // Ensures event listeners are attached
  attachWishlistEvents(); // Ensures wishlist buttons work
};


// 📌 Dropdown Filtering by Genre
document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior

    const genre = event.target.getAttribute("data-genre");
    console.log("Selected Genre:", genre); // Debugging

    const filteredBooks = genre === "all" ? book_lists : book_lists.filter((book) => book.genre === genre);

    renderBooks(filteredBooks);

    // 🔥 Ensure "Add to Cart" buttons remain small and event listeners reattach
    setTimeout(() => {
      reapplySmallBtn();
      attachEventListeners();
    }, 100);
  });
});

// ✅ Function to reapply small button styling after filtering
const reapplySmallBtn = () => {
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.classList.add("small-btn"); // Ensure all buttons stay small
  });
};

// ✅ Function to reattach event listeners to "Add to Cart" buttons
const attachEventListeners = () => {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.removeEventListener("click", addToCartHandler); // Remove old event listener (prevents duplication)
    button.addEventListener("click", addToCartHandler); // Attach a fresh event listener
  });
};

// ✅ Separate function to handle adding books to cart
const addToCartHandler = (event) => {
  const bookId = event.target.getAttribute("data-id");
  addToCart(bookId);
};

// 📌 Ensure small buttons and event listeners are applied on page load
document.addEventListener("DOMContentLoaded", () => {
  reapplySmallBtn();
  attachEventListeners();
});

// 📌 Shopping Cart Logic
let cart = [];
// 📌 Add Book to Cart
const addToCart = (id) => {
  const book = book_lists.find((item) => item.id === parseInt(id));
  if (book) {
    cart.push(book);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }
};
// 📌 Remove Book from Cart
const removeFromCart = (index) => {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }
};

// 📌 Ensure Grand Total Updates When Cart Updates
const updateCart = () => {
  let total = 0;
  if (cartItemsElement) {
    if (cart.length === 0) {
      cartItemsElement.innerHTML = "<p>Your cart is empty.</p>";
      totalPriceElement.textContent = "Total: £0.00";
    } else {
      cartItemsElement.innerHTML = cart
        .map((item, index) => {
          total += item.price;
          return `
            <div class='cart-item'>
              <img class='rowimg' src="images/${item.image}" alt="${item.title}">
              <p>${item.title}</p>
              <h2>£${item.price.toFixed(2)}</h2>
              <button data-index="${index}" class="remove-from-cart">Remove</button>
            </div>
          `;
        })
        .join("");

      totalPriceElement.textContent = `Total: £${total.toFixed(2)}`;

      document.querySelectorAll(".remove-from-cart").forEach((button) => {
        button.addEventListener("click", (event) => {
          const index = parseInt(event.target.getAttribute("data-index"), 10);
          removeFromCart(index);
        });
      });
    }
  }

  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }

  localStorage.setItem("totalprice", total);
  updateShippingAndGrandTotal();
};

// 📌 Load Cart from LocalStorage
document.addEventListener("DOMContentLoaded", () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
  updateCart();
});

// 📌 Checkout Function
const proceedToCheckout = () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before proceeding to checkout.");
    return;
  }
  // 📌 Shipping Information
  const selectedRegion = regionSelectElement?.options[regionSelectElement.selectedIndex]?.text || "Not Selected";
  const paymentMethod = document.getElementById("payment-method")?.value || "Not Selected";
  const bookNames = cart.map(book => book.title).join(", ") || "No books selected";

  // Get Grand Total from the UI
  const grandTotalText = grandTotalElement?.textContent || "Grand Total: £0.00";
  const grandTotal = grandTotalText.replace("Grand Total: £", ""); // Extract numeric value

  alert(`Order placed successfully!\n\nShipping to: ${selectedRegion}\nPayment Method: ${paymentMethod}\nBooks Ordered: ${bookNames}\nGrand Total: £${grandTotal}`);

  cart = [];
  localStorage.removeItem("cart");
  updateCart();
};

document.getElementById("checkoutBtn")?.addEventListener("click", proceedToCheckout);


// 📌 Contact Form Handling
document.getElementById("contactForm")?.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = {
    title: document.getElementById("title").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    query: document.getElementById("query").value,
    message: document.getElementById("message").value,
  };

  localStorage.setItem("contactFormData", JSON.stringify(formData));

  alert(`Message sent successfully!\n\nName: ${formData.title} ${formData.name}\nEmail: ${formData.email}\nQuery: ${formData.query}\nMessage: ${formData.message}`);

  document.getElementById("contactForm").reset();
});

// 📌 Search Functionality
const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
const searchResultsContainer = document.getElementById("searchResults"); // Use this to display results

if (searchBar && searchBtn && searchResultsContainer) {
  searchBtn.addEventListener("click", () => {
    const query = searchBar.value.toLowerCase().trim();

    // Ensure both book lists are included in the search
    const allBooks = [...book_details, ...nineteen_century_books]; // Combine both lists

    // Debugging: Check if book lists exist
    if (!Array.isArray(allBooks) || allBooks.length === 0) {
      console.error("Error: No books available for search!");
      return;
    }

    // Filter books based on title, author, or genre
    const filteredBooks = allBooks.filter((book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query)
    );
    // 📌 Display Search Results
    if (filteredBooks.length > 0) {
      searchResultsContainer.innerHTML = `
        <h3><strong>Books Found:</strong></h3>
        <ul style="list-style: none; padding: 0;">
          ${filteredBooks
          .map(
            (book) => `
              <li>
                <a href="#" style="text-decoration: none; font-weight: bold; color: #007bff;">
                  ${book.title}
                </a> 
                by ${book.author} - <strong>Genre:</strong> ${book.genre}
              </li>
            `
          )
          .join("")}
        </ul>
      `;
    } else {
      searchResultsContainer.innerHTML = `<p style="text-align:center; font-size:18px; color:red;">No results found for "${searchBar.value}".</p>`;
    }
  });
// 📌 Press Enter to Search
  searchBar.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchBtn.click();
    }
  });
}

// 📌 Initialize the Book List
renderBooks(book_lists);





