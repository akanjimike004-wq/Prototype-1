import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("properties.db");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS properties (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    price REAL NOT NULL,
    location TEXT NOT NULL,
    beds INTEGER NOT NULL,
    baths INTEGER NOT NULL,
    sqft INTEGER NOT NULL,
    type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Sale',
    image TEXT NOT NULL,
    images TEXT,
    description TEXT NOT NULL,
    features TEXT NOT NULL
  )
`);

// Migrations
try {
  db.prepare("SELECT status FROM properties LIMIT 1").get();
} catch (e) {
  db.exec("ALTER TABLE properties ADD COLUMN status TEXT NOT NULL DEFAULT 'Sale'");
}

try {
  db.prepare("SELECT images FROM properties LIMIT 1").get();
} catch (e) {
  db.exec("ALTER TABLE properties ADD COLUMN images TEXT");
  // Migrate existing data: set images to [image]
  const properties = db.prepare("SELECT id, image FROM properties").all() as any[];
  for (const p of properties) {
    db.prepare("UPDATE properties SET images = ? WHERE id = ?").run(JSON.stringify([p.image]), p.id);
  }
}

// Seed initial data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM properties").get() as { count: number };
if (count.count === 0) {
  const initialProperties = [
    {
      id: "1",
      title: "The Glass Pavilion",
      price: 450000000,
      location: "Banana Island, Lagos",
      beds: 4,
      baths: 5,
      sqft: 5200,
      type: "Villa",
      status: "Sale",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687940-47a072299783?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
      ]),
      description: "A stunning architectural masterpiece with floor-to-ceiling glass walls offering panoramic ocean views.",
      features: JSON.stringify(["Ocean View", "Infinity Pool", "Smart Home", "Wine Cellar"])
    },
    {
      id: "2",
      title: "Skyline Penthouse",
      price: 280000000,
      location: "Eko Atlantic, Lagos",
      beds: 3,
      baths: 3,
      sqft: 3100,
      type: "Penthouse",
      status: "Sale",
      image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1513584684032-43f5260d1124?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
      ]),
      description: "Luxury living in the heart of the city with a private terrace overlooking the Atlantic Ocean.",
      features: JSON.stringify(["Private Terrace", "Concierge", "Gym", "Floor-to-ceiling Windows"])
    },
    {
      id: "3",
      title: "Oakwood Estate",
      price: 125000000,
      location: "Maitama, Abuja",
      beds: 5,
      baths: 4,
      sqft: 4500,
      type: "House",
      status: "Rent",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753124-34305886618e?auto=format&fit=crop&w=1200&q=80"
      ]),
      description: "A modern farmhouse blend with high-end finishes and a spacious backyard for entertaining.",
      features: JSON.stringify(["Gourmet Kitchen", "Outdoor Kitchen", "Fireplace", "Home Office"])
    }
  ];

  const insert = db.prepare(`
    INSERT INTO properties (id, title, price, location, beds, baths, sqft, type, status, image, images, description, features)
    VALUES (@id, @title, @price, @location, @beds, @baths, @sqft, @type, @status, @image, @images, @description, @features)
  `);

  for (const p of initialProperties) {
    insert.run(p);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use("/uploads", express.static(uploadsDir));

  // API Routes
  app.get("/api/properties", (req, res) => {
    const properties = db.prepare("SELECT * FROM properties").all().map((p: any) => ({
      ...p,
      features: JSON.parse(p.features),
      images: p.images ? JSON.parse(p.images) : [p.image]
    }));
    res.json(properties);
  });

  app.post("/api/upload", upload.array("images", 10), (req, res) => {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }
    const urls = files.map((file) => `/uploads/${file.filename}`);
    res.json({ urls });
  });

  app.post("/api/properties", (req, res) => {
    const { title, price, location, beds, baths, sqft, type, status, image, images, description, features } = req.body;
    const id = Math.random().toString(36).substring(2, 11);
    
    try {
      db.prepare(`
        INSERT INTO properties (id, title, price, location, beds, baths, sqft, type, status, image, images, description, features)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id, 
        title, 
        price, 
        location, 
        beds, 
        baths, 
        sqft, 
        type, 
        status || 'Sale', 
        image || (images && images[0]) || '', 
        JSON.stringify(images || []),
        description, 
        JSON.stringify(features || [])
      );
      
      res.status(201).json({ id, title, price, location, beds, baths, sqft, type, status, image, images, description, features });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create property" });
    }
  });

  app.put("/api/properties/:id", (req, res) => {
    const { id } = req.params;
    const { title, price, location, beds, baths, sqft, type, status, image, images, description, features } = req.body;
    
    try {
      db.prepare(`
        UPDATE properties 
        SET title = ?, price = ?, location = ?, beds = ?, baths = ?, sqft = ?, type = ?, status = ?, image = ?, images = ?, description = ?, features = ?
        WHERE id = ?
      `).run(
        title, 
        price, 
        location, 
        beds, 
        baths, 
        sqft, 
        type, 
        status, 
        image || (images && images[0]) || '', 
        JSON.stringify(images || []),
        description, 
        JSON.stringify(features || []), 
        id
      );
      
      res.json({ id, title, price, location, beds, baths, sqft, type, status, image, images, description, features });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update property" });
    }
  });

  app.delete("/api/properties/:id", (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM properties WHERE id = ?").run(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete property" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
