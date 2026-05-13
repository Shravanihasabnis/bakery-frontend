import ProductCard from '../components/ProductCard';
import dynamic from 'next/dynamic';
import { apiUrl } from '../lib/api';

const MenuList = dynamic(() => import('./MenuList'), { ssr: false });

// Fetch the real items from your Node/Express database
async function getProducts() {
  try {
    const res = await fetch(apiUrl('/api/products'), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (error) {
    console.error("Database not connected yet:", error);
    return [];
  }
}

export default async function MenuPage() {
  const products = await getProducts();

  const fallback = {
    continental: [
      // Omelettes
      { name: 'Egg White Omelette', description: 'Served with white/brown bread.', price: 139, category: 'Continental', image: 'https://www.carriesexperimentalkitchen.com/wp-content/uploads/2019/05/Spinach.-Mushroom-Havarti-Egg-White-Omelette-2-500x375.jpg' },
      { name: 'Masala Omelette', description: 'Served with white/brown bread.', price: 139, category: 'Continental', image: 'https://i.guim.co.uk/img/media/352fcb591bc9fd92f97f51913724b0530bebe3e5/0_2429_3567_2139/master/3567.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=f5872b12dae2f74cdc36b74bcbb16db0' },
      { name: 'Mushroom Omelette', description: 'Served with white/brown bread.', price: 189, category: 'Continental', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSnWzbAcE9IKfr8QZyGhFI3bDeo0o1gcTY68H5AlABNknMX9D3D' },
      { name: 'Scrambled Eggs', description: 'Served with white/brown bread.', price: 189, category: 'Continental', image: 'https://www.simplyrecipes.com/thmb/SdZJwNuiS6Psj5Rs1ugYBpaMqV8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2018__06__Scrambled-Eggs-2-ee4ddb21d1654bc699f5f957df7fd363.jpg' },
      { name: 'Cheese Omelette', description: 'Served with white/brown bread.', price: 189, category: 'Continental', image: 'https://sweetysalado.com/wp-content/uploads/2019/03/Omelette-SyS3-1440x2160.jpg' },
      // Something Special in Pav
      { name: 'Butter Bhurji Pav', description: 'Classic buttery egg bhurji with pav.', price: 149, category: 'Continental', image: 'https://i.ytimg.com/vi/EcJ3JixXIYw/maxresdefault.jpg' },
      { name: 'Bhurji Pav', description: 'Spiced egg bhurji served with pav.', price: 139, category: 'Continental', image: 'https://i.ytimg.com/vi/EcJ3JixXIYw/maxresdefault.jpg' },
      { name: 'Paneer Bhurji Pav', description: 'Crumbled spiced paneer served with pav.', price: 129, category: 'Continental', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThAqMns5dOwZoRaEjgZtOQ45xlRa3SpCA91w&s' },
      { name: 'Bhuna Kheema Pav', description: 'Slow-cooked minced meat served with pav.', price: 189, category: 'Continental', image: 'https://www.yummefy.com/uploads/13366ec736.jpg' },
      { name: 'Kheema Masala Pav', description: 'Spicy minced meat masala with pav.', price: 209, category: 'Continental', image: 'https://www.yummefy.com/uploads/13297e67c2.jpg' },
      // Salads
      { name: 'Classic Caesar Salad', description: 'Roasted bell peppers, black olives, lettuce, tossed in caesar dressing & topped with croutons.', price: 319, category: 'Continental', image: 'https://www.allrecipes.com/thmb/mXZ0Tulwn3x9_YB_ZbkiTveDYFE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/229063-Classic-Restaurant-Caesar-Salad-ddmfs-4x3-231-89bafa5e54dd4a8c933cf2a5f9f12a6f.jpg' },
      { name: 'Classic Chicken Caesar Salad', description: 'Chicken, roasted bell peppers, black olives, lettuce, tossed in caesar dressing & topped with croutons.', price: 339, category: 'Continental', image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-327831_11-3524329.jpg' },
      { name: 'Healthy Fruit Bowl', description: 'Fresh seasonal fruits served chilled.', price: 199, category: 'Continental', image: 'https://www.refreshmyhealth.com/wp-content/uploads/2022/05/colorful-real-deal-raw-fruit-bowl-vegan-low-carb-dessert_122-main_img_9401.jpg' },
      { name: 'Greek Salad', description: 'Cucumber, red onions, bell peppers, cherry tomatoes, olives & lettuce tossed in Greek salad dressing.', price: 289, category: 'Continental', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd0L5RasJVwlGsdfqMuhbGcEiWqrxYXvVxPA&s' },
      { name: 'Roasted Chicken Salad', description: 'Slow roasted chicken tossed in homemade honey mustard dressing with lettuce, red onions, cherry tomatoes, bell peppers & black olives.', price: 349, category: 'Continental', image: 'https://www.crunchycreamysweet.com/wp-content/uploads/2018/06/easy-grilled-chicken-salad-1.jpg' },
    ],

    quickBites: [
      { name: 'Garlic Bread', description: 'Crispy toasted garlic bread.', price: 129, category: 'Quick Bites', image: 'https://www.foodnetwork.com/content/dam/images/food/fullset/2015/5/28/2/TM1A14F_Garlic-Bread_s4x3.jpg' },
      { name: 'Cheese Garlic Bread', description: 'Toasted garlic bread topped with melted cheese.', price: 149, category: 'Quick Bites', image: 'https://daenskitchen.com/wp-content/uploads/2023/05/Zuk6PuIC.jpeg' },
      { name: 'Corn Cheese Chilli Toast', description: 'Toasted bread loaded with corn, cheese and chilli.', price: 159, category: 'Quick Bites', image: 'https://www.oetker.in/assets/recipes/assets/eefae55e1446459b81ebebc439781840/1272x764/cheese-and-corn-toast.webp' },
      { name: 'Potato Wedges', description: 'Crispy seasoned potato wedges.', price: 169, category: 'Quick Bites', image: 'https://healthyfitnessmeals.com/wp-content/uploads/2025/06/parmesan-potato-wedges-01.jpg' },
      { name: 'Paneer Popcorn', description: 'Served with green chutney flavoured mayo dip.', price: 199, category: 'Quick Bites', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrorP91JX-NyyizaIb1uhXvzNoUqOgQzOYOQ&s' },
      { name: 'Peri Peri Fries', description: 'Crispy fries tossed in peri peri seasoning.', price: 179, category: 'Quick Bites', image: 'https://cdn.uengage.io/uploads/64261/image-591513-1754044989.jpeg' },
      { name: 'French Fries', description: 'Classic golden crispy fries.', price: 169, category: 'Quick Bites', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPMKc70LuDXkv6OvDOeN2dFy3P6cOpXAS47g&s' },
      { name: 'Chessy Fries', description: 'Fries loaded with melted cheese.', price: 199, category: 'Quick Bites', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop' },
      { name: 'Classic Nachos', description: 'Crunchy nachos served with dips.', price: 179, category: 'Quick Bites', image: 'https://img.taste.com.au/LatixaDk/taste/2017/01/classic-nachos_1980x1320-120196-1.jpg' },
      { name: 'Mexican Nachos Platter', description: 'Loaded nachos with toppings and dips.', price: 189, category: 'Quick Bites', image: 'https://png.pngtree.com/png-clipart/20250308/original/pngtree-mexican-nachos-platter-with-cheese-and-veggies-png-image_20603744.png' },
      { name: 'Chole Bhature Bomb', description: 'Spiced chickpea curry served with fluffy bhature.', price: 159, category: 'Quick Bites', image: 'https://media-cdn.tripadvisor.com/media/photo-s/11/1e/3e/b8/chole-bhature-bomb.jpg' },
      { name: 'Onion Rings', description: 'Crispy fried onion rings tossed in peri peri powder, served with green chutney flavoured mayo dip.', price: 159, category: 'Quick Bites', image: 'https://b2958125.smushcdn.com/2958125/wp-content/uploads/popcorn-chicken-recipe-baked-1.jpg?lossy=1&strip=1&webp=1' },
      { name: 'Veg Quesadillas', description: 'Toasted & stuffed with tasty cheese, peppers, capsicum, mushrooms & onions. Served with sour cream & tomato salsa.', price: 159, category: 'Quick Bites', image: 'https://field-fare.com/wp-content/uploads/2021/08/Jumbo_Fish_Finger_hero-1.jpg' },
      { name: 'Chicken Popcorn', description: 'Spicy chicken popcorn bites served with green chutney flavoured mayo dip.', price: 199, category: 'Quick Bites', image: 'https://eatwithclarity.com/wp-content/uploads/2022/01/air-fryer-buffalo-popcorn-chicken-4-1.jpg' },
      { name: 'Fish Fingers', description: 'Golden juicy fish fingers served with tangy tartar sauce.', price: 249, category: 'Quick Bites', image: 'https://static.toiimg.com/thumb/53667625.cms?imgsize=131089&width=800&height=800' },
      { name: 'Chicken Crispy', description: 'Crispy fried chicken bites.', price: 229, category: 'Quick Bites', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800&auto=format&fit=crop' },
      { name: 'Egg Toasti', description: 'Toasted bread with egg filling.', price: 149, category: 'Quick Bites', image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=800&auto=format&fit=crop' },
      { name: 'Egg Chaat', description: 'Tangy and spiced egg chaat.', price: 179, category: 'Quick Bites', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800&auto=format&fit=crop' },
      { name: 'Non-Veg Quesadillas', description: 'Toasted & stuffed with tasty chicken, cheese, peppers, capsicum, mushrooms & onions. Served with sour cream & tomato salsa.', price: 189, category: 'Quick Bites', image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?q=80&w=800&auto=format&fit=crop' },
    ],

    pizzas: [
      { name: 'Relish Own Special Pizza', description: 'Bell peppers, onions, mushrooms, cottage cheese & Italian seasoning. (8 inches)', price: 299, category: 'Pizzas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU7CP5opeqLGvMtAc5X2iAvQNwHUiuu-A7Sw&s' },
      { name: 'Desi Paneer Pizza', description: 'Indian spiced paneer with bell peppers, onions & green chillies. (8 inches)', price: 299, category: 'Pizzas', image: 'https://static.toiimg.com/thumb/54699659.cms?imgsize=2071173&width=800&height=800' },
      { name: 'Veg Supreme Pizza', description: 'Onions, bell peppers, mushrooms, olives, corn & jalapeños. (8 inches)', price: 309, category: 'Pizzas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaOd-yzw835koYdEr8v0ecT5lvreJgMrz76g&s' },
      { name: 'Margherita Pizza', description: 'Classic margherita with fresh mozzarella cheese, tomatoes & fresh basil. (8 inches)', price: 269, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop' },
      { name: 'Corn Magic Pizza', description: 'Pizza topped with golden American corn. (8 inches)', price: 259, category: 'Pizzas', image: 'https://bakesquare.in/wp-content/uploads/2023/04/5qgpBjIyHm4XLzDk1OHleamgDNKt6nbSm-nv73i4k7eDDyq5mh5DV0awva1cF6ptuA5lVCB96VnjN93xLE06qfEebGwnPHwKwpNh.jpg' },
      { name: 'Chilli Garlic Chicken Pizza', description: 'Spicy shredded chicken, bell peppers & onion. (8 inches)', price: 369, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop' },
      { name: 'Chicken Supreme Pizza', description: 'Chicken, onions, bell peppers, mushrooms, olives, corn & jalapeños. (8 inches)', price: 389, category: 'Pizzas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCqnY4J9r0-ud5AtWtyDveeJbfLgq0yTL3DA&s' },
      { name: 'BBQ Chicken Pizza', description: 'Classic BBQ chicken pizza. (8 inches)', price: 389, category: 'Pizzas', image: 'https://bluebowlrecipes.com/wp-content/uploads/2019/05/barbecue-chicken-pizza-0917.jpg' },
      { name: 'Chicken Tikka Pizza', description: 'Pizza topped with Indian spiced chicken tikka. (8 inches)', price: 349, category: 'Pizzas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqDWN7g1CINLfA9WKEbS8Q4HzDEmstMfjgw&s' },
    ],

    pastas: [
      { name: 'Relish Mixed Sauce Pasta', description: 'Mixed bell pepper & zucchini tossed in chef\'s special sauce.', price: 229, category: 'Pastas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvnTh-iYRKZZDF8v8iX52C9PRxC1gVGaPiRQ&s' },
      { name: 'Veg Arrabbiata', description: 'Bell pepper, zucchini in a spicy arrabbiata.', price: 209, category: 'Pastas', image: 'https://www.recipetineats.com/tachyon/2023/10/Penne-Arrabbiata-4.jpg' },
      { name: 'Veg Aglio E Olio Pasta', description: 'Spaghetti, bell peppers, olives, tossed with chilli garlic olive oil.', price: 239, category: 'Pastas', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800&auto=format&fit=crop' },
      { name: 'Alfredo Pasta', description: 'Zucchini, bell peppers, sautéed mushrooms tossed with creamy cheese sauce.', price: 209, category: 'Pastas', image: 'https://www.sharmispassions.com/wp-content/uploads/2015/12/alfredopasta2.jpg' },
      { name: 'Relish Chicken Pink Pasta', description: 'Chicken, bell peppers & zucchini tossed in chef\'s special sauce.', price: 299, category: 'Pastas', image: 'https://i.ytimg.com/vi/Uezy12Sw3Fc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA5X0RXKIo_DvG-AEXY-NZtCSO-XQ' },
      { name: 'Chicken Arrabbiata Pasta', description: 'Chicken, bell peppers, zucchini in a spicy arrabbiata.', price: 229, category: 'Pastas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzteRKUvnceGMRDfOo3PqQOW-rNcYOoijSnA&s' },
      { name: 'Chicken Aglio E Olio Pasta', description: 'Spaghetti, chicken, bell peppers, olives, tossed with chilli garlic olive oil.', price: 249, category: 'Pastas', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800&auto=format&fit=crop' },
      { name: 'Chicken Alfredo Pasta', description: 'Chicken, zucchini, bell peppers & sautéed mushrooms tossed with creamy cheese sauce.', price: 229, category: 'Pastas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5EuVYEm22v_-iy2vFQ-4niAT7Dk4uzs_CYA&sp' },
    ],

    burgers: [
      { name: 'BBQ Chicken Steak Burger', description: 'Burger filled with barbeque chicken steak.', price: 199, category: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop' },
      { name: 'Chicken Tikki Burger', description: 'Burger filled with spiced chicken minced patty.', price: 179, category: 'Burgers', image: 'https://c.ndtvimg.com/2023-04/kqvjhc_burger_625x300_02_April_23.jpg?im=FaceCrop,algorithm=dnn,width=384,height=384' },
      { name: 'Herb Chilli Chicken Burger', description: 'Burger filled with a deep-fried, herb-marinated chicken patty.', price: 169, category: 'Burgers', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBNm2kGAWMqKGcO-ZQf9dBeIfcCPixATQqYw&s' },
      { name: 'Spicy Chicken Grilled Burger', description: 'Burger stuffed with grilled spicy chicken patty.', price: 169, category: 'Burgers', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8ytB7Anmn0GM1gQwPBjZo6rJn-fL_JXLY8A&s' },
      { name: 'Veggie Burger', description: 'Burger stuffed with deep fried crispy veggie burger patty.', price: 129, category: 'Burgers', image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=800&auto=format&fit=crop' },
      { name: 'Peri Peri Paneer Burger', description: 'Flame-grilled paneer marinated in zesty peri peri sauce, topped with fresh lettuce, juicy tomatoes, and tangy mayo, served on a toasted sesame seed bun.', price: 169, category: 'Burgers', image: 'https://experteatshub.com/wp-content/uploads/2025/02/Peri-Peri-Paneer-Burger-1.jpg' },
      { name: 'Herb Chilli Potato Burger', description: 'Burger stuffed with deep fried chilli potato patty.', price: 139, category: 'Burgers', image: 'https://hyfunfoods.com/wp-content/uploads/2024/05/Kings-Patty-1.png' },
    ],

    rollsAndSandwiches: [
      { name: 'Veggie Sub', description: 'Sandwich with crispy veg patty, tomato, onion, cucumber mayo spread.', price: 249, category: 'Rolls & Sandwiches', image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=800&auto=format&fit=crop' },
      { name: 'Chowpatty Club Sandwich', description: 'Mumbai chowpatty classic double deck sandwich with coleslaw, cucumber, tomato & cheese.', price: 249, category: 'Rolls & Sandwiches', image: 'https://content.jdmagicbox.com/comp/def_content_category/quick-bites-outlets/545d7fe32b-quick-bites-outlets-2-t2esh.jpg' },
      { name: 'Paneer Pakoda Sandwich', description: 'Mumbai\'s famous Crawford Market sandwich made with chutney mayo & crispy fried paneer pakoda.', price: 229, category: 'Rolls & Sandwiches', image: 'https://www.mintsrecipes.com/wp-content/uploads/Paneer-Bread-Pakora-Pinterest.jpg' },
      { name: 'Paneer Tikka Sandwich', description: 'Sandwich stuffed with Indian spiced paneer tikka masala.', price: 249, category: 'Rolls & Sandwiches', image: 'https://i0.wp.com/kalimirchbysmita.com/wp-content/uploads/2018/10/Paneer-Tikka-Sandwich-Insta-02.jpg?resize=1537%2C1024' },
      { name: 'Spicy Paneer Roll', description: 'House-made spicy paneer in Indian rolled layers.', price: 199, category: 'Rolls & Sandwiches', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop' },
      { name: 'Veg Crispy Roll', description: 'Deep fried crispy roll stuffed with veggies.', price: 149, category: 'Rolls & Sandwiches', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs02wWsDBGofyVlNuRee0CcPAqgyj7ToZdJg&s' },
      { name: 'Paneer Tikka Roll', description: 'Roll stuffed with Indian spiced paneer & lachha onion.', price: 249, category: 'Rolls & Sandwiches', image: 'https://spicecravings.com/wp-content/uploads/2020/12/Paneer-kathi-Roll-Featured-1.jpg' },
      { name: 'Chilli Coriander Cheese', description: 'Cheese, tomato, onion, green chilli, onion & coriander stuffed grilled sandwich.', price: 249, category: 'Rolls & Sandwiches', image: 'https://www.spiceupthecurry.com/wp-content/uploads/2017/02/chilli-cheese-sandwich-recipe-7-500x375.jpg' },
      { name: 'Spicy Chicken Sub', description: 'Minced chicken patty sandwich served with tomato, onion, cucumber and mayo spread.', price: 289, category: 'Rolls & Sandwiches', image: 'https://www.chilipeppermadness.com/wp-content/uploads/2018/07/Grilled-Chicken-Sandwich-Recipe1.jpg' },
      { name: 'Chicken Junglee', description: 'Classic chicken sandwich with coriander, green chilli, onion & mayonnaise sauce.', price: 249, category: 'Rolls & Sandwiches', image: 'https://img-cdn.publive.online/fit-in/1200x675/sanjeev-kapoor/media/post_banners/8356d4a5be77cdf9c9b65ffe67ca812bc03e1bcd722675f3b6222181cc6eed6f.jpg' },
      { name: 'Chicken Tikka Sandwich', description: 'Sandwich stuffed with Indian spiced chicken tikka masala.', price: 229, category: 'Rolls & Sandwiches', image: 'https://theobroma.in/cdn/shop/files/HIGH-RES_Chicken_Tikka_Sandwich_-_Square_1.jpg?v=1710549168' },
      { name: 'Chicken Club House', description: 'Double decker sandwich with chicken slaw, cucumber, tomato & cheese.', price: 299, category: 'Rolls & Sandwiches', image: 'https://www.budgetbytes.com/wp-content/uploads/2025/02/Chicken-Club-V1.jpg' },
      { name: 'Egg Omelette Roll', description: 'Egg roll stuffed with vegetables & green chutney.', price: 139, category: 'Rolls & Sandwiches', image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mexican-egg-roll-7774590.jpg?quality=90&resize=440,400' },
      { name: 'Cheesy Omelette Roll', description: 'Egg roll stuffed with vegetables, green chutney & cheese.', price: 189, category: 'Rolls & Sandwiches', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhSPgCUKOhcwL4OqZ6T4YI-yMrIDUl6my_ZA&s' },
      { name: 'Chicken Tikka Roll', description: 'Roll stuffed with Indian spiced chicken & lachha onion.', price: 249, category: 'Rolls & Sandwiches', image: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_960,w_960//InstamartAssets/Receipes/chicken_tikka_roll.webp' },
      { name: 'Chicken Schezwan Roll', description: 'Roll stuffed with schezwan chicken.', price: 229, category: 'Rolls & Sandwiches', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Nbl0m74CK2zhiz5UUi3YFC6ZYtfb8a3Jng&s' },
      { name: 'Cafe Relish Special Non-Veg Roll', description: 'Double chicken & double omelette.', price: 279, category: 'Rolls & Sandwiches', image: 'https://b.zmtcdn.com/data/pictures/chains/2/19281582/cc89478a262167f898fad2aa3cc50f69.png?fit=around|960:500&crop=960:500;*,*' },
    ],

    chineseSizzler: [
      // Chinese Soups
      { name: 'Veg Manchow Soup', description: 'Classic veg manchow soup.', price: 109, category: 'Chinese & Sizzler', image: 'https://ranveerbrar.com/wp-content/uploads/2021/02/Manchow-soup_Fotor-scaled.jpg' },
      { name: 'Veg Sweet Corn Soup', description: 'Creamy sweet corn soup.', price: 109, category: 'Chinese & Sizzler', image: 'https://www.funfoodfrolic.com/wp-content/uploads/2020/12/Sweet-Corn-Soup-TThumbnail.jpg' },
      { name: 'Burnt Garlic Clear Soup', description: 'Aromatic burnt garlic clear soup.', price: 109, category: 'Chinese & Sizzler', image: 'https://shreedevimelange.com/wp-content/uploads/2023/12/Vegetable-Burnt-Garlic.webp' },
      { name: 'Chicken Manchow Soup', description: 'Classic chicken manchow soup.', price: 129, category: 'Chinese & Sizzler', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPb5WedU2b4uEfRvX3arg2n0CP6gySFjzjbA&s' },
      { name: 'Chicken Sweet Corn Soup', description: 'Chicken sweet corn soup.', price: 129, category: 'Chinese & Sizzler', image: 'https://www.maggi.lk/sites/default/files/srh_recipes/21f2b7c2ebc7628c987903ea4a638ee9.jpg' },
      { name: 'Chicken Burnt Garlic Soup', description: 'Chicken burnt garlic clear soup.', price: 129, category: 'Chinese & Sizzler', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwJnWyGnnF-7MCOusTnVQ50W55Htv1K0YoKA&s' },
      // Starters
      { name: 'Veg Manchurian Dry', description: 'Crispy veg manchurian in dry style.', price: 229, category: 'Chinese & Sizzler', image: 'https://vegecravings.com/wp-content/uploads/2017/03/veg-manchurian-dry-recipe-step-by-step-instructions-10.jpg' },
      { name: 'Paneer Chilli', description: 'Stir-fried paneer with peppers & chilli sauce.', price: 239, category: 'Chinese & Sizzler', image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/chilli-paneer-recipe.jpg' },
      { name: 'Veg Spring Roll', description: 'Crispy fried vegetable spring rolls.', price: 189, category: 'Chinese & Sizzler', image: 'https://www.kuchpakrahahai.in/wp-content/uploads/2023/08/Vegan-spring-rolls.jpg' },
      { name: 'Chicken Manchurian Dry', description: 'Crispy chicken manchurian in dry style.', price: 249, category: 'Chinese & Sizzler', image: 'https://i.ytimg.com/vi/6evWsbgvV_Y/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCQkwxY-IYSO6BwzPO2UZ2RWMzxMQ' },
      { name: 'Kung Pao Chicken', description: 'Stir-fried chicken with peanuts in kung pao sauce.', price: 259, category: 'Chinese & Sizzler', image: 'https://www.allrecipes.com/thmb/77x4rJvy5T1z_Iyc52NK7pDOkJE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-9027-kung-pao-chicken-ddmfs-4x3-hero-9a10c2277f65472a941d932313caab86.jpg' },
      { name: 'Chicken Spring Roll', description: 'Crispy fried chicken spring rolls.', price: 209, category: 'Chinese & Sizzler', image: 'https://i.ytimg.com/vi/hEQQGxS-ynY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDS9USsKg3YdT-6jJ3WNFNhl4-mWw' },
      { name: 'Chicken Chilli', description: 'Stir-fried chicken with peppers & chilli sauce.', price: 209, category: 'Chinese & Sizzler', image: 'https://images.slurrp.com/prod/recipe_images/transcribe/side%20dish/Chilli_Chicken.webp?impolicy=slurrp-20210601&width=1200&height=675' },
      { name: 'Chicken Lollipop', description: 'Fried chicken lollipops in spiced batter.', price: 199, category: 'Chinese & Sizzler', image: 'https://www.cafegoldenfeast.com/wp-content/uploads/2025/01/Chicken-Lollipop.jpg' },
      // Rice & Noodles
      { name: 'Chicken Fried Rice', description: 'Classic wok-tossed chicken fried rice.', price: 189, category: 'Chinese & Sizzler', image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=800&auto=format&fit=crop' },
      { name: 'Chicken Schezwan Rice', description: 'Spicy schezwan chicken fried rice.', price: 229, category: 'Chinese & Sizzler', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPqwpjytBXa0NkE9hKPfb9MHgsM4h8pnfoQQ&s' },
      { name: 'Chicken Hakka Noodles', description: 'Wok-tossed chicken hakka noodles.', price: 209, category: 'Chinese & Sizzler', image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/06/Spicy-Chicken-Hakka-Noodles-Recipe.jpg' },
      { name: 'Veg Hakka Noodles', description: 'Wok-tossed veg hakka noodles.', price: 179, category: 'Chinese & Sizzler', image: 'https://www.whiskaffair.com/wp-content/uploads/2020/10/Veg-Hakka-Noodles-2-3.jpg' },
      { name: 'Veg Fried Rice', description: 'Classic wok-tossed veg fried rice.', price: 179, category: 'Chinese & Sizzler', image: 'https://cookingfromheart.com/wp-content/uploads/2016/02/Veg-Fried-Rice-4.jpg' },
      // Sizzlers
      { name: 'Mix Veggie Steak Sizzler', description: 'Sizzling veggie steak with choice of sauce & fries.', price: 299, category: 'Chinese & Sizzler', image: 'https://nishitak.com/wp-content/uploads/2011/11/kobe_veg_sizzler.jpg' },
      { name: 'Cottage Cheese Steak Sizzler', description: 'Sizzling cottage cheese steak with choice of sauce & fries.', price: 329, category: 'Chinese & Sizzler', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7uxpoVmtUUBo3eu-7WLBBCOWbHEl-Q6skLw&s' },
      { name: 'Herb Garlic Chicken Sizzler', description: 'Sizzling herb garlic chicken with choice of sauce & fries.', price: 349, category: 'Chinese & Sizzler', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwqf218N-LHsYSIxNHZ1jgjKZw8waPPRxo6g&s' },
      { name: 'Blackened Spiced Chicken Sizzler', description: 'Sizzling blackened spiced chicken with choice of sauce & fries.', price: 349, category: 'Chinese & Sizzler', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUXtNT1RmHYgoNwGoliBd5UMC_4VzeohHihg&s' },
    ],

    hotBeverages: [
      { name: 'Cappuccino', description: 'Freshly ground espresso with velvety steamed milk.', price: 99, category: 'Hot Beverages', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop' },
      { name: 'Café Latte', description: 'Smooth espresso with steamed milk.', price: 109, category: 'Hot Beverages', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop' },
      { name: 'Flat White', description: 'Ristretto shot with silky steamed milk.', price: 119, category: 'Hot Beverages', image: 'https://methodicalcoffee.com/cdn/shop/articles/Flat_white_sitting_on_a_table_af78d6b5-75ea-4f88-bec7-6505412042f8.jpg?v=1761756646&width=1200' },
      { name: 'Americano', description: 'Espresso shot with hot water.', price: 99, category: 'Hot Beverages', image: 'https://www.folgerscoffee.com/folgers/recipes/_Hero%20Images/Detail%20Pages/6330/image-thumb__6330__responsive_1534_JPEG/CafeMocha-hero.90a0775f.jpg' },
      { name: 'Café Mocha', description: 'Espresso with chocolate and steamed milk.', price: 139, category: 'Hot Beverages', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW9PRnzPVTMn_L_JCYVEEVb6NjkrBYgnuDcA&s' },
      { name: 'Espresso', description: 'Short & strong coffee, served black.', price: 99, category: 'Hot Beverages', image: 'https://www.yummytummyaarthi.com/wp-content/uploads/2022/08/hot-chocolate-1.jpeg' },
      { name: 'Hot Chocolate', description: 'Rich and creamy hot chocolate — like a liquid Candy Bar.', price: 149, category: 'Hot Beverages', image: 'https://lh3.googleusercontent.com/-a7tGq79DY3E/UrdCg_ZAAsI/AAAAAAAEWKY/NpRIlvJY6ZM/s800/nutella-hot-chocolate-13.jpg' },
      { name: 'Nutella Hot Chocolate', description: 'Rich & smooth hot chocolate with almonds, melted Nutella & milk for a creamy textured drink.', price: 199, category: 'Hot Beverages', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7CRtzX58T81y0csG5rICMhEUkEvr887EzCA&s' },
      { name: 'Cafe Relish Special Tea', description: 'Signature house tea blend.', price: 99, category: 'Hot Beverages', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1l4sslcMp_vi6gr5JOG0ib_P3wlose0fbPw&s' },
      { name: 'English Breakfast Tea', description: 'High grown Assam tea leaves, Ceylon tea, Nepal and a dash of South Indian tea.', price: 119, category: 'Hot Beverages', image: 'https://www.ringtons.co.uk/cdn/shop/files/breakfasttea-new-banner-mob.jpg?v=1738751043&width=750' },
      { name: 'Punjabi Chai', description: 'Sweet spicy fruity flavour with black tea, citrus peel, rose petals, almonds, cloves, cardamom, vanilla & flavourings.', price: 119, category: 'Hot Beverages', image: 'https://myheartbeets.com/wp-content/uploads/2013/09/masala-chai1.jpg' },
      { name: 'Lemon Tea with Peel', description: 'Flavoured with lemon fragrance & intensified with dried lemon peel.', price: 119, category: 'Hot Beverages', image: 'https://assets.unileversolutions.com/v1/143930248.png' },
      { name: 'Lemongrass Ginger Tea', description: 'Fine leaf green tea, dried lemongrass leaves, stinging nettle, dried ginger pieces.', price: 119, category: 'Hot Beverages', image: 'https://www.throughthefibrofog.com/wp-content/uploads/2023/04/lemongrass-ginger-tea-6.jpg' },
    ],

    coldBeverages: [
      { name: 'Cold Coffee', description: 'Classic cold coffee — chilling, refreshing & has that perfect kick of coffee.', price: 149, category: 'Cold Beverages', image: 'https://instacuppastore.com/cdn/shop/articles/blog-instant-cold-coffee-frothy-cover_d8bc8e93-1b6e-41e3-adda-8721fe5fadca.jpg?v=1775497202&width=1100' },
      { name: 'Iced Cold Coffee', description: 'Refreshing iced cold coffee.', price: 99, category: 'Cold Beverages', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop' },
      { name: 'Caramel Biscotti Shake', description: 'Blend of nutty biscotties, caramel sauce, rich vanilla and milk for an indulgent season shake.', price: 219, category: 'Cold Beverages', image: 'https://gimmethatflavor.com/wp-content/uploads/2021/11/Biscoff-Milkshake-9.jpg' },
      { name: 'Virgin Mojito', description: 'Classic virgin mojito with fresh lime & mint.', price: 129, category: 'Cold Beverages', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop' },
      { name: 'Blue Lagoon Bliss', description: 'A refreshing non-alcoholic mocktail with tangy blue curaçao syrup & a splash of soda, topped with fresh lime & mint.', price: 149, category: 'Cold Beverages', image: 'https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_600,h_468/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2025/8/11/c22c2915-87c4-45bd-a7ed-54d80c63437e_image122bd6b3e47baa466bb5b217b820da6146.JPG' },
      { name: 'Virgin Sangria', description: 'Vibrant non-alcoholic sangria bursting with fresh fruits, blended with fruit juices & a hint of sparkling water.', price: 179, category: 'Cold Beverages', image: 'https://www.mysequinedlife.com/wp-content/uploads/2022/07/virgin-sangria-mocktail-1200-square-2.jpg' },
      { name: 'Homemade Lemonade', description: 'Fresh homemade lemonade.', price: 89, category: 'Cold Beverages', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=800&auto=format&fit=crop' },
      { name: 'Lemon Iced Tea', description: 'Chilled lemon iced tea.', price: 99, category: 'Cold Beverages', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop' },
      { name: 'Orange Juice', description: 'Freshly squeezed orange juice.', price: 119, category: 'Cold Beverages', image: 'https://sc0.blr1.cdn.digitaloceanspaces.com/article/210728-mdweesnxpu-1764590391.jpg' },
      { name: 'Watermelon Juice', description: 'Fresh watermelon juice.', price: 99, category: 'Cold Beverages', image: 'https://www.rebootwithjoe.com/wp-content/uploads/2012/05/watermelon-pineapple-juice.jpg' },
      { name: 'Pineapple Juice', description: 'Fresh pineapple juice.', price: 99, category: 'Cold Beverages', image: 'https://cookathomemom.com/wp-content/uploads/2022/12/Pineapple-Ginger-Juice.jpg' },
    ],

    bubbleTea: [
      { name: 'Nutty Taro Milk Tea', description: 'Creamy taro milk bubble tea with fruit bursting boba\'s.', price: 199, category: 'Pop\'n\'Sip', image: 'https://fullofplants.com/wp-content/uploads/2022/03/creamy-vegan-taro-milk-tea-with-boba-38-1400x2100.jpg' },
      { name: 'Green Melon Milk Tea', description: 'Green melon flavoured milk bubble tea with boba\'s.', price: 199, category: 'Pop\'n\'Sip', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ZRslEcmQOlLZ8u_QWMwmCtWoNxkW0h7UaA&s' },
      { name: 'Coffee Mocha Milk Tea', description: 'Coffee mocha flavoured milk bubble tea with boba\'s.', price: 199, category: 'Pop\'n\'Sip', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJZgkPgv8TjT1cClTslBMXqmqLYY1ljkjbiA&s' },
      { name: 'Thai Milk Tea', description: 'Classic Thai milk bubble tea with boba\'s.', price: 199, category: 'Pop\'n\'Sip', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNwDWDHpz5Uco5FcQuwb8m6EN2T2DnkXp2GQ&s' },
      { name: 'Mango & Peach Fruit Tea', description: 'Fruity mango & peach bubble tea with boba\'s.', price: 199, category: 'Pop\'n\'Sip', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeaubD3-kprSwNUF_C9l5uabbiVKqw2qFUew&s' },
      { name: 'Peach Passion Iced Tea', description: 'Peach passion iced tea with boba\'s.', price: 149, category: 'Pop\'n\'Sip', image: 'https://mocktail.net/wp-content/uploads/2022/03/Lychee-Bubble-Tea.jpg' },
      { name: 'Lychee Iced Tea', description: 'Lychee iced tea with boba\'s.', price: 149, category: 'Pop\'n\'Sip', image: 'https://www.nestleprofessional.ca/sites/default/files/srh_recipes/a470e04e1c535861255a05b93239878c.png' },
      { name: 'Grape Iced Tea', description: 'Grape iced tea with boba\'s.', price: 149, category: 'Pop\'n\'Sip', image: 'https://st1.photogallery.ind.sh/wp-content/uploads/indiacom/make-delicious-grape-iced-tea-at-home-in-minutes-202503-1742987738.jpg?impolicy=Medium_Widthonly&w=330' },
    ],
  };

  const allItems = products.length > 0
    ? products
    : [
        ...fallback.continental,
        ...fallback.quickBites,
        ...fallback.pizzas,
        ...fallback.pastas,
        ...fallback.burgers,
        ...fallback.rollsAndSandwiches,
        ...fallback.chineseSizzler,
        ...fallback.hotBeverages,
        ...fallback.coldBeverages,
        ...fallback.bubbleTea,
      ];

  return (
    <main className="min-h-screen bg-bakery-cream text-bakery-dark py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-bakery-dark mb-4">Our Full Menu</h1>
          <p className="text-bakery-brown">Freshly made with love — dine in, takeaway, or order online.</p>
        </div>

        <MenuList items={allItems} />

      </div>
    </main>
  );
}
