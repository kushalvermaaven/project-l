import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { initDatabase, getDb } from './config/database.js';

async function seed() {
  console.log('🌱 Seeding ARTVRKZ database...\n');

  await initDatabase();
  const db = getDb();

  // Clear existing data
  console.log('  Clearing existing data...');
  const tables = ['payments', 'notifications', 'reviews', 'favorites', 'messages', 'conversations', 'custom_requests', 'orders', 'artworks', 'artist_profiles', 'categories', 'users'];
  tables.forEach(t => db.run(`DELETE FROM ${t}`));

  // Hash passwords
  const buyerPass = await bcrypt.hash('buyer123', 10);
  const artistPass = await bcrypt.hash('artist123', 10);
  const adminPass = await bcrypt.hash('admin123', 10);

  // ============ ADMIN ============
  console.log('  Creating admin...');
  const adminId = uuidv4();
  db.prepare('INSERT INTO users (id, email, password, name, role, avatar) VALUES (?, ?, ?, ?, ?, ?)')
    .run(adminId, 'admin@artvrkz.com', adminPass, 'Admin', 'admin', 'https://ui-avatars.com/api/?name=Admin&background=7c3aed&color=fff&size=200');

  // ============ BUYERS ============
  console.log('  Creating buyers...');
  const buyers = [
    { id: uuidv4(), email: 'rahul@example.com', name: 'Rahul Gupta', location: 'Mumbai, India' },
    { id: uuidv4(), email: 'sneha@example.com', name: 'Sneha Reddy', location: 'Hyderabad, India' },
    { id: uuidv4(), email: 'vikram@example.com', name: 'Vikram Singh', location: 'Delhi, India' }
  ];
  buyers.forEach(b => {
    db.prepare('INSERT INTO users (id, email, password, name, role, avatar, location, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
      .run(b.id, b.email, buyerPass, b.name, 'buyer', `https://ui-avatars.com/api/?name=${encodeURIComponent(b.name)}&background=06b6d4&color=fff&size=200`, b.location, 'Art enthusiast and collector');
  });

  // ============ ARTISTS ============
  console.log('  Creating artists...');
  const artists = [
    { id: uuidv4(), email: 'priya@artvrkz.com', name: 'Priya Sharma', bio: 'Digital artist specializing in vibrant illustrations and concept art. Inspired by Indian mythology and futuristic themes.', location: 'Mumbai, India', style: 'Digital Art', specialties: 'Illustrations, Concept Art, Character Design', followers: 1240, sales: 45, earnings: 185000, rating: 4.8, reviews: 23 },
    { id: uuidv4(), email: 'arjun@artvrkz.com', name: 'Arjun Patel', bio: 'Contemporary abstract artist exploring the boundaries of color and form. Each piece tells a story of emotion and movement.', location: 'Bangalore, India', style: 'Abstract', specialties: 'Abstract Paintings, Contemporary, Mixed Media', followers: 890, sales: 32, earnings: 245000, rating: 4.6, reviews: 18 },
    { id: uuidv4(), email: 'zara@artvrkz.com', name: 'Zara Khan', bio: 'Photographer and minimalist artist. I find beauty in simplicity and capture moments that speak volumes in silence.', location: 'Delhi, India', style: 'Photography', specialties: 'Photography, Minimalist, Black & White', followers: 2100, sales: 67, earnings: 312000, rating: 4.9, reviews: 35 },
    { id: uuidv4(), email: 'rohan@artvrkz.com', name: 'Rohan Mehta', bio: 'Traditional artist preserving the rich heritage of Indian art forms. Specializing in miniature paintings and cultural motifs.', location: 'Jaipur, India', style: 'Traditional', specialties: 'Traditional Art, Miniature Paintings, Cultural', followers: 560, sales: 28, earnings: 156000, rating: 4.7, reviews: 14 },
    { id: uuidv4(), email: 'aisha@artvrkz.com', name: 'Aisha Verma', bio: 'Portrait artist with a passion for capturing the human soul. Realistic and hyper-realistic portraits that bring faces to life.', location: 'Pune, India', style: 'Realism', specialties: 'Portraits, Realism, Oil Painting', followers: 750, sales: 38, earnings: 220000, rating: 4.8, reviews: 20 },
    { id: uuidv4(), email: 'kian@artvrkz.com', name: 'Kian Desai', bio: 'Pop art and poster designer bringing vibrant energy to modern spaces. Bold colors, strong lines, and cultural references.', location: 'Ahmedabad, India', style: 'Pop Art', specialties: 'Posters, Pop Art, Graphic Design', followers: 1680, sales: 85, earnings: 178000, rating: 4.5, reviews: 42 }
  ];

  artists.forEach(a => {
    db.prepare('INSERT INTO users (id, email, password, name, role, avatar, bio, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
      .run(a.id, a.email, artistPass, a.name, 'artist', `https://ui-avatars.com/api/?name=${encodeURIComponent(a.name)}&background=8b5cf6&color=fff&size=200`, a.bio, a.location);

    db.prepare('INSERT INTO artist_profiles (id, user_id, cover_image, art_style, specialties, social_links, followers_count, total_sales, total_earnings, rating, review_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .run(uuidv4(), a.id, `https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=400&fit=crop`, a.style, a.specialties, JSON.stringify({ instagram: '#', twitter: '#' }), a.followers, a.sales, a.earnings, a.rating, a.reviews);
  });

  // ============ CATEGORIES ============
  console.log('  Creating categories...');
  const categories = [
    { name: 'Digital Art', slug: 'digital-art', desc: 'Art created using digital tools and software', count: 45 },
    { name: 'Paintings', slug: 'paintings', desc: 'Traditional and modern painting techniques', count: 38 },
    { name: 'Illustrations', slug: 'illustrations', desc: 'Hand-drawn and digital illustrations', count: 32 },
    { name: 'Photography', slug: 'photography', desc: 'Fine art and creative photography', count: 28 },
    { name: 'Abstract', slug: 'abstract', desc: 'Abstract and non-representational art', count: 25 },
    { name: 'Portraits', slug: 'portraits', desc: 'Portrait art in various styles', count: 20 },
    { name: 'Minimalist', slug: 'minimalist', desc: 'Clean, minimal artistic expressions', count: 18 },
    { name: 'Traditional Art', slug: 'traditional-art', desc: 'Heritage and traditional art forms', count: 22 },
    { name: 'Custom Art', slug: 'custom-art', desc: 'Personalized artwork made to order', count: 15 },
    { name: 'Posters & Prints', slug: 'posters-prints', desc: 'Posters, prints, and graphic art', count: 35 }
  ];
  categories.forEach(c => {
    db.prepare('INSERT INTO categories (id, name, slug, image, description, artwork_count) VALUES (?, ?, ?, ?, ?, ?)')
      .run(uuidv4(), c.name, c.slug, `https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop`, c.desc, c.count);
  });

  // ============ ARTWORKS ============
  console.log('  Creating artworks...');
  const artworkData = [
    { title: 'Cosmic Dreams', desc: 'A vibrant digital painting exploring the mysteries of the cosmos. Deep purples and electric blues create a dreamlike atmosphere.', price: 8500, cat: 'Digital Art', medium: 'Digital', dims: '3000 x 2000 px', orient: 'Landscape', img: '1579783902614-a3fb3927b6a5', artistIdx: 0, custom: 1, featured: 1, tags: 'cosmic,space,digital,vibrant' },
    { title: 'Urban Fragments', desc: 'Abstract interpretation of city life through bold geometric shapes and contrasting colors. Each fragment represents a different urban experience.', price: 15000, cat: 'Abstract', medium: 'Acrylic on Canvas', dims: '90 x 60 cm', orient: 'Landscape', img: '1541961017774-22349e4a1262', artistIdx: 1, custom: 0, featured: 1, tags: 'abstract,urban,geometric,bold' },
    { title: 'Golden Hour', desc: 'A stunning capture of light during the magical golden hour. The warm tones and soft shadows create an ethereal quality.', price: 4500, cat: 'Photography', medium: 'Photography', dims: '4000 x 3000 px', orient: 'Landscape', img: '1547891654-e66ed7ebb968', artistIdx: 2, custom: 0, featured: 1, tags: 'photography,golden,light,warm' },
    { title: 'Whispers of Heritage', desc: 'A traditional miniature painting depicting scenes from Indian mythology with intricate details and rich pigments.', price: 25000, cat: 'Traditional Art', medium: 'Watercolor on Handmade Paper', dims: '30 x 40 cm', orient: 'Portrait', img: '1549490349-8643362247b5', artistIdx: 3, custom: 1, featured: 0, tags: 'traditional,miniature,heritage,indian' },
    { title: 'Soul Window', desc: 'A hyper-realistic portrait capturing the depth and emotion in human eyes. Oil painting with extraordinary detail.', price: 35000, cat: 'Portraits', medium: 'Oil on Canvas', dims: '60 x 80 cm', orient: 'Portrait', img: '1578926078693-4eb3d4499e43', artistIdx: 4, custom: 1, featured: 1, tags: 'portrait,realism,oil,emotional' },
    { title: 'Neon Pulse', desc: 'Vibrant pop art poster combining retro aesthetics with modern neon color palettes. Perfect for contemporary spaces.', price: 2500, cat: 'Posters & Prints', medium: 'Digital Print', dims: '50 x 70 cm', orient: 'Portrait', img: '1579783928621-7a13d66a62d1', artistIdx: 5, custom: 0, featured: 1, tags: 'pop-art,neon,poster,retro' },
    { title: 'Serene Valley', desc: 'A peaceful landscape painting capturing the beauty of misty valleys at dawn. Soft watercolors create a calming effect.', price: 12000, cat: 'Paintings', medium: 'Watercolor', dims: '70 x 50 cm', orient: 'Landscape', img: '1482160549825-59d1b23cb208', artistIdx: 1, custom: 1, featured: 0, tags: 'landscape,peaceful,watercolor,nature' },
    { title: 'Silence Speaks', desc: 'Minimalist black and white photograph exploring the beauty of empty spaces and architectural lines.', price: 3500, cat: 'Minimalist', medium: 'Photography', dims: '3000 x 3000 px', orient: 'Square', img: '1544967082-d9d25d867d66', artistIdx: 2, custom: 0, featured: 0, tags: 'minimalist,black-white,architecture,silence' },
    { title: 'Digital Flora', desc: 'Intricate digital illustration of fantastical flowers and plants from an imaginary botanical garden.', price: 6500, cat: 'Illustrations', medium: 'Digital', dims: '2500 x 3500 px', orient: 'Portrait', img: '1558618666-fcd25c85f7aa', artistIdx: 0, custom: 1, featured: 1, tags: 'illustration,flora,botanical,fantasy' },
    { title: 'The Storyteller', desc: 'An illustration depicting an ancient storyteller surrounded by the characters of their tales. Rich in symbolism.', price: 9000, cat: 'Illustrations', medium: 'Digital + Ink', dims: '2000 x 2800 px', orient: 'Portrait', img: '1561839561-b13bcfe0f6b5', artistIdx: 0, custom: 0, featured: 0, tags: 'illustration,storyteller,narrative,ink' },
    { title: 'Rhythm of Colors', desc: 'An expressive abstract piece where colors dance across the canvas in rhythmic patterns inspired by Indian classical music.', price: 18500, cat: 'Abstract', medium: 'Mixed Media', dims: '100 x 80 cm', orient: 'Landscape', img: '1551913902-c92207136dcd', artistIdx: 1, custom: 0, featured: 1, tags: 'abstract,colors,rhythm,expressive' },
    { title: 'Retro Wave', desc: 'A bold poster design celebrating the retro-futuristic aesthetic with synthwave colors and geometric patterns.', price: 1800, cat: 'Posters & Prints', medium: 'Digital Print', dims: '40 x 60 cm', orient: 'Portrait', img: '1569172122301-bc5008bc09c5', artistIdx: 5, custom: 0, featured: 0, tags: 'poster,retro,synthwave,geometric' }
  ];

  const artworkIds = [];
  artworkData.forEach((a, idx) => {
    const artId = uuidv4();
    artworkIds.push(artId);
    db.prepare('INSERT INTO artworks (id, artist_id, title, description, price, category, medium, dimensions, orientation, tags, images, is_customizable, availability, views, likes_count, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .run(artId, artists[a.artistIdx].id, a.title, a.desc, a.price, a.cat, a.medium, a.dims, a.orient, a.tags, JSON.stringify([`https://images.unsplash.com/photo-${a.img}?w=800&h=600&fit=crop`]), a.custom, 'available', Math.floor(Math.random() * 500) + 50, Math.floor(Math.random() * 100) + 10, a.featured);
  });

  // ============ ORDERS ============
  console.log('  Creating orders...');
  const orderStatuses = ['pending', 'confirmed', 'in_progress', 'shipped', 'completed'];
  const orders = [
    { buyerIdx: 0, artIdx: 0, status: 'completed' },
    { buyerIdx: 1, artIdx: 4, status: 'shipped' },
    { buyerIdx: 0, artIdx: 5, status: 'confirmed' },
    { buyerIdx: 2, artIdx: 1, status: 'pending' },
    { buyerIdx: 1, artIdx: 8, status: 'in_progress' }
  ];
  const orderIds = [];
  orders.forEach(o => {
    const orderId = uuidv4();
    orderIds.push(orderId);
    const artwork = artworkData[o.artIdx];
    const commission = artwork.price * 0.12;
    db.prepare('INSERT INTO orders (id, buyer_id, artwork_id, artist_id, total_price, commission_rate, commission_amount, artist_earnings, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .run(orderId, buyers[o.buyerIdx].id, artworkIds[o.artIdx], artists[artwork.artistIdx].id, artwork.price, 0.12, commission, artwork.price - commission, o.status);
  });

  // ============ CUSTOM REQUESTS ============
  console.log('  Creating custom requests...');
  const customRequests = [
    { buyerIdx: 0, artistIdx: 0, desc: 'I would like a custom digital portrait of my family in a fantasy art style, similar to Studio Ghibli aesthetic.', style: 'Digital Art', colors: 'Warm tones, pastels', size: 'Large (60x80 cm)', budgetMin: 8000, budgetMax: 15000, purpose: 'Gift', status: 'accepted' },
    { buyerIdx: 1, artistIdx: 1, desc: 'Looking for an abstract painting for my living room that incorporates shades of teal and gold.', style: 'Abstract', colors: 'Teal, Gold, White', size: 'Medium (50x70 cm)', budgetMin: 12000, budgetMax: 20000, purpose: 'Home Décor', status: 'pending' },
    { buyerIdx: 2, artistIdx: 4, desc: 'Need a realistic charcoal portrait of my grandmother from an old photograph. Very important to me.', style: 'Realism', colors: 'Black and White', size: 'Medium (40x50 cm)', budgetMin: 5000, budgetMax: 10000, purpose: 'Personal Collection', status: 'in_progress' }
  ];
  customRequests.forEach(cr => {
    db.prepare('INSERT INTO custom_requests (id, buyer_id, artist_id, description, style, colors, size, budget_min, budget_max, purpose, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .run(uuidv4(), buyers[cr.buyerIdx].id, artists[cr.artistIdx].id, cr.desc, cr.style, cr.colors, cr.size, cr.budgetMin, cr.budgetMax, cr.purpose, cr.status);
  });

  // ============ CONVERSATIONS & MESSAGES ============
  console.log('  Creating conversations and messages...');
  const conversations = [
    { buyerIdx: 0, artistIdx: 0, messages: [
      { fromBuyer: true, content: 'Hi Priya! I love your Cosmic Dreams piece. Is it available for purchase?' },
      { fromBuyer: false, content: 'Hi Rahul! Thank you so much! Yes, Cosmic Dreams is available. Would you like to know more about it?' },
      { fromBuyer: true, content: 'Yes! Can you tell me about the dimensions and if you can do a custom version with more blue tones?' },
      { fromBuyer: false, content: 'Absolutely! The original is 3000x2000px digital. I can definitely create a custom version with more blue tones. The custom version would be ₹12,000. Would you like to proceed?' }
    ]},
    { buyerIdx: 1, artistIdx: 4, messages: [
      { fromBuyer: true, content: 'Hello Aisha, I am interested in commissioning a portrait. Do you accept custom orders?' },
      { fromBuyer: false, content: 'Hello Sneha! Yes, I do accept commissions. I would love to hear more about what you have in mind.' },
      { fromBuyer: true, content: 'I would like a realistic oil portrait of my parents for their 30th anniversary. Is that something you can do?' },
      { fromBuyer: false, content: 'What a wonderful gift idea! I would be honored to paint that for you. Can you send me some reference photos?' }
    ]},
    { buyerIdx: 2, artistIdx: 1, messages: [
      { fromBuyer: true, content: 'Hey Arjun, your abstract work is incredible! Do you ship internationally?' },
      { fromBuyer: false, content: 'Thank you Vikram! Yes, I do ship internationally. Shipping charges vary by location. Where would you like it shipped?' }
    ]},
    { buyerIdx: 0, artistIdx: 5, messages: [
      { fromBuyer: true, content: 'Kian, love the Neon Pulse poster! Can I get it in a larger size?' },
      { fromBuyer: false, content: 'Thanks Rahul! I can definitely print it in larger sizes. A0 size would be ₹4,500. Let me know!' }
    ]}
  ];

  conversations.forEach(conv => {
    const convId = uuidv4();
    const lastMsg = conv.messages[conv.messages.length - 1];
    db.prepare('INSERT INTO conversations (id, buyer_id, artist_id, last_message, last_message_at) VALUES (?, ?, ?, ?, ?)')
      .run(convId, buyers[conv.buyerIdx].id, artists[conv.artistIdx].id, lastMsg.content, new Date().toISOString());

    conv.messages.forEach((msg, idx) => {
      const senderId = msg.fromBuyer ? buyers[conv.buyerIdx].id : artists[conv.artistIdx].id;
      const createdAt = new Date(Date.now() - (conv.messages.length - idx) * 3600000).toISOString();
      db.prepare('INSERT INTO messages (id, conversation_id, sender_id, content, is_read) VALUES (?, ?, ?, ?, ?)')
        .run(uuidv4(), convId, senderId, msg.content, 1);
    });
  });

  // ============ REVIEWS ============
  console.log('  Creating reviews...');
  const reviews = [
    { reviewerIdx: 0, artistIdx: 0, rating: 5, comment: 'Priya is an amazing artist! The digital painting exceeded my expectations. The colors are even more vibrant in person. Highly recommend!' },
    { reviewerIdx: 1, artistIdx: 4, rating: 5, comment: 'Aisha captured every detail perfectly in the portrait. It was like looking at a photograph. My family loved it!' },
    { reviewerIdx: 2, artistIdx: 1, rating: 4, comment: 'Beautiful abstract piece. Arjun was great to work with and very responsive. The only reason for 4 stars is shipping took a bit longer than expected.' },
    { reviewerIdx: 0, artistIdx: 5, rating: 5, comment: 'The poster quality is fantastic! Kian is super talented and the design looks amazing in my room.' },
    { reviewerIdx: 1, artistIdx: 2, rating: 5, comment: 'Zara\'s photography is breathtaking. The minimalist composition is perfect for our office space.' }
  ];
  reviews.forEach(r => {
    db.prepare('INSERT INTO reviews (id, reviewer_id, artist_id, order_id, rating, comment) VALUES (?, ?, ?, ?, ?, ?)')
      .run(uuidv4(), buyers[r.reviewerIdx].id, artists[r.artistIdx].id, orderIds[0], r.rating, r.comment);
  });

  // ============ FAVORITES ============
  console.log('  Creating favorites...');
  db.prepare('INSERT INTO favorites (id, user_id, artwork_id) VALUES (?, ?, ?)').run(uuidv4(), buyers[0].id, artworkIds[0]);
  db.prepare('INSERT INTO favorites (id, user_id, artwork_id) VALUES (?, ?, ?)').run(uuidv4(), buyers[0].id, artworkIds[4]);
  db.prepare('INSERT INTO favorites (id, user_id, artwork_id) VALUES (?, ?, ?)').run(uuidv4(), buyers[0].id, artworkIds[8]);
  db.prepare('INSERT INTO favorites (id, user_id, artwork_id) VALUES (?, ?, ?)').run(uuidv4(), buyers[1].id, artworkIds[1]);
  db.prepare('INSERT INTO favorites (id, user_id, artwork_id) VALUES (?, ?, ?)').run(uuidv4(), buyers[1].id, artworkIds[5]);
  db.prepare('INSERT INTO favorites (id, user_id, artwork_id) VALUES (?, ?, ?)').run(uuidv4(), buyers[2].id, artworkIds[3]);

  // ============ NOTIFICATIONS ============
  console.log('  Creating notifications...');
  const notifications = [
    { userId: buyers[0].id, type: 'order_update', title: 'Order Completed', message: 'Your order for "Cosmic Dreams" has been completed!' },
    { userId: buyers[0].id, type: 'message', title: 'New Message', message: 'Priya Sharma sent you a message.' },
    { userId: artists[0].id, type: 'new_order', title: 'New Order!', message: 'You received a new order for "Cosmic Dreams".' },
    { userId: artists[0].id, type: 'custom_request', title: 'Custom Request', message: 'Rahul Gupta sent you a custom art request.' },
    { userId: buyers[1].id, type: 'order_update', title: 'Order Shipped', message: 'Your order for "Soul Window" has been shipped!' },
    { userId: artists[4].id, type: 'review', title: 'New Review', message: 'Sneha Reddy left you a 5-star review!' }
  ];
  notifications.forEach(n => {
    db.prepare('INSERT INTO notifications (id, user_id, type, title, message) VALUES (?, ?, ?, ?, ?)')
      .run(uuidv4(), n.userId, n.type, n.title, n.message);
  });

  // ============ PAYMENTS ============
  console.log('  Creating payments...');
  db.prepare('INSERT INTO payments (id, order_id, amount, status, method, transaction_id) VALUES (?, ?, ?, ?, ?, ?)')
    .run(uuidv4(), orderIds[0], 8500, 'completed', 'UPI', 'TXN_' + uuidv4().slice(0, 8));
  db.prepare('INSERT INTO payments (id, order_id, amount, status, method, transaction_id) VALUES (?, ?, ?, ?, ?, ?)')
    .run(uuidv4(), orderIds[1], 35000, 'completed', 'Card', 'TXN_' + uuidv4().slice(0, 8));
  db.prepare('INSERT INTO payments (id, order_id, amount, status, method, transaction_id) VALUES (?, ?, ?, ?, ?, ?)')
    .run(uuidv4(), orderIds[2], 2500, 'pending', 'UPI', 'TXN_' + uuidv4().slice(0, 8));

  console.log('\n✅ Database seeded successfully!');
  console.log('\n📋 Demo Accounts:');
  console.log('   Admin:  admin@artvrkz.com / admin123');
  console.log('   Artist: priya@artvrkz.com / artist123');
  console.log('   Artist: arjun@artvrkz.com / artist123');
  console.log('   Buyer:  rahul@example.com / buyer123');
  console.log('   Buyer:  sneha@example.com / buyer123');
  console.log(`\n📊 Created: ${artists.length} artists, ${buyers.length} buyers, ${artworkData.length} artworks, ${orders.length} orders, ${conversations.length} conversations\n`);
}

seed().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
