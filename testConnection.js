require('dotenv').config(); // Pastikan package dotenv terinstall
const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('🔄 Mencoba menghubungkan ke MongoDB...');
    
    // Gunakan langsung connection string dari .env
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('✅ Berhasil terhubung ke MongoDB!');
    console.log(`📁 Database: ${mongoose.connection.name}`);
    
    // Tes query sederhana
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📂 Koleksi yang tersedia:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('🛑 Koneksi ditutup');
  } catch (error) {
    console.error('❌ Gagal terhubung:', error.message);
    process.exit(1);
  }
}

testConnection();