# 📌 similarity-search-kd-trees

This project is a **JavaScript-based KD-Tree visualization and similarity search tool** for 2D spatial data. It allows you to insert points, search for nearest neighbors using both **KD-Tree** and **Brute Force**, and visualize results interactively in a browser.

## 🧠 Overview

The goal of this project is to demonstrate **similarity search** concepts using KD-Trees, a classic spatial data structure. This can help you understand how nearest neighbor search scales with optimized data structures compared to brute-force methods.

## 🖼 Demo Preview

> Nearest Neighbor found using KD-Tree  
> Search Time: 0.1 ms to 0.4 ms with 10,000 points

---

## ✨ Features

- ✅ Insert custom 2D points
- 🔍 Node search by coordinates
- ⚡ Fast **nearest neighbor search** using KD-Tree
- 🐢 Slower **brute force** search for comparison
- 📈 Runtime metrics display (in ms)
- 🎲 Generate 10,000 random points
- 🖥 Canvas-based 2D visualization

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/sharmaketan14/similarity-search-kd-trees.git
cd similarity-search-kd-trees
```

### 2. Open in Browser

Open `visualise.html` in any browser:

```bash
open visualise.html
# or double-click the file
```

---

## 📁 File Structure

```
├── KDTree.js           # KD-Tree logic in JavaScript
├── visualise.html      # Main web visualization interface
├── README.md           # Project description
```

---

## 🧪 KD-Tree vs Brute Force Comparison

| Method         | Time Complexity | Visualization Support | Best For        |
|----------------|------------------|------------------------|-----------------|
| KD-Tree        | O(klog n) avg     | ✅                      | Large datasets  |
| Brute Force    | O(kn)             | ✅                      | Small datasets  |

---

## 🧠 Concepts Illustrated

- KD-Tree partitioning and recursive insertions
- Spatial search in 2D
- Real-time performance metrics
- Vector similarity visualization

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).
